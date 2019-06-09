import { Component, OnInit, ElementRef } from '@angular/core';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

@Component({
  selector: 'cuper-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(
    private elRef: ElementRef
    ) { }

  ngOnInit() {
    //TO DO: Environment
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFvc2djIiwiYSI6ImNqa2VnbW9ldTNiYWUzcG1rdmoyZ29jcnkifQ.LhnLZHX-gNhQefUN2iihPg';

    const optionsMap = {
      container: this.elRef.nativeElement.querySelector('div'),
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-79.2042200, -3.9931300],
      zoom: 13,
      scrollZoom: false
    };

    const myMap = new mapboxgl.Map(optionsMap);

  }

}
