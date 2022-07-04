import { Component, OnInit } from '@angular/core';
import { LatLngLiteral } from 'src/app/shared/map/models/lat-lng-literal.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  location: LatLngLiteral = {
    lat: 50.06961126201242,
    lng: 19.944011457670374,
  };
  zoom = 15;

  constructor() { }

  ngOnInit(): void {
  }

}
