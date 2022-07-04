import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './components/contact/contact.component';
import { ContactRoutingModule } from './contact-rounting.module';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { MapModule } from '../shared/map/map.module';


@NgModule({
  declarations: [ContactComponent, ContactFormComponent, ContactInfoComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    MatCardModule,
    MapModule
  ]
})
export class ContactModule { }
