import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert/alert-service';
import { EmailValidator } from 'src/app/shared/validators/email-validator';
import { RequiredValidator } from 'src/app/shared/validators/required-validator';
import GlobalFunctions from 'src/app/_helpers/GlobalFunctions';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', RequiredValidator.required],
      email: ['', EmailValidator.validateEmail],
      phone: [''],
      subject: ['', RequiredValidator.required],
      message: ['', RequiredValidator.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.emailService.sendEmail(this.contactForm.value).subscribe(
        res => {
          this.contactForm.reset();
          // mat-form-field does not remove mat-form-field-invalid class on FormGroup reset #4190 https://github.com/angular/components/issues/4190
          this.formDirective.resetForm();

          this.alertService.showAlert(res as string, 'success');
        },
        err => this.alertService.showAlert(err.error, 'error')
      );
    } else {
      GlobalFunctions.validateAllFormFields(this.contactForm);
    }
  }
 
}
