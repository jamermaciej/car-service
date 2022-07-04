import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';
import { LatLngLiteral } from 'src/app/shared/map/models/lat-lng-literal.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  private map: google.maps.Map;

  @Input() location: LatLngLiteral;
  @Input() zoom: number;

  constructor() { }

  ngOnInit(): void {
    this.setupMap();
  }

  setupMap() {
    let loader = new Loader({
      apiKey: environment.google.apiKey
    });

    loader.load().then(() => {
      console.log('laoded maps');

      // give location latitude and longtitude
      const location = this.location;


      this.map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: this.zoom
      });

      // marker
      const marker = new google.maps.Marker({
        position: location,
        map: this.map
      });
    });
  }

}
