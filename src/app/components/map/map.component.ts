import {
  Component,
  Input,
  OnInit,
  Output,
  ElementRef,
  EventEmitter } from '@angular/core';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

@Component({
  selector: 'cuper-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() coordinates: number[];
  @Input() zoom: number;
  @Output() onChangePosition = new EventEmitter<number[]>();

  myMap: any;
  myMarker: any;

  constructor(
    private elRef: ElementRef
    ) { }

  ngOnInit() {
    //TO DO: Environment
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFvc2djIiwiYSI6ImNqa2VnbW9ldTNiYWUzcG1rdmoyZ29jcnkifQ.LhnLZHX-gNhQefUN2iihPg';

    const optionsMap = {
      container: this.elRef.nativeElement.querySelector('div'),
      style: 'mapbox://styles/mapbox/streets-v9',
      center: this.coordinates || [-79.2042200, -3.9931300],
      zoom: this.zoom || 13,
      scrollZoom: true
    };

    this.myMap = new mapboxgl.Map(optionsMap);

    if(this.coordinates){
      new mapboxgl.Marker()
        .setLngLat(this.coordinates)
        .addTo(this.myMap);
    }

    // Add geolocate control to the map.
    let geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    this.myMap.addControl(geolocate);

    //Add marker in my ubication
    geolocate.on('geolocate', (ev) => {
      const myPosition = new mapboxgl.LngLat(ev.coords.longitude, ev.coords.latitude);
      this.changePosition(myPosition);
    });

    // Add click event on the map.
    this.myMap.on('click',(ev) => {
      const point = ev.lngLat;
      if(this.onChangePosition) this.changePosition(point);
    });
  }

  changePosition = (point) => {
    if(this.myMarker) {
      this.myMarker.setLngLat(point);
    }else {
      const markerOpts = { draggable: true };
      const newMarker = new mapboxgl.Marker(markerOpts)
                  .setLngLat(point)
                  .addTo(this.myMap);
      newMarker.on('dragend', this.populateMyPosition);
      //save marker instance
      this.myMarker = newMarker;
    }
    this.populateMyPosition();
  }

  populateMyPosition = () => {
    const position = this.myMarker.getLngLat();
    if(this.onChangePosition) this.onChangePosition.emit(position);
  }

}
