import {
  Component,
  Input,
  OnInit,
  Output,
  ElementRef,
  EventEmitter } from '@angular/core';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { environment } from '../../../environments/environment';

interface Coordinate {
  lat: number;
  long: number;
}

@Component({
  selector: 'cuper-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() coordinate: Coordinate;
  @Input() zoom: number;
  @Output() onChangePosition = new EventEmitter<number[]>();

  myMap: any;
  myMarker: any;

  constructor(
    private elRef: ElementRef
    ) { }

  ngOnInit() {
    mapboxgl.accessToken = environment.mapboxAuth;
    const myCoordinate = this.coordinate ? [this.coordinate.long, this.coordinate.lat] : undefined;
    const optionsMap = {
      container: this.elRef.nativeElement.querySelector('div'),
      style: 'mapbox://styles/mapbox/streets-v9',
      center: myCoordinate || [-79.2042200, -3.9931300],
      zoom: this.zoom || 13,
      scrollZoom: true
    };

    this.myMap = new mapboxgl.Map(optionsMap);
    if(myCoordinate){
      this.myMarker = new mapboxgl.Marker({ draggable: true })
        .setLngLat(myCoordinate)
        .addTo(this.myMap)
        .on('dragend', this.populateMyPosition);
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
      //save marker instance
      this.myMarker = new mapboxgl.Marker({ draggable: true })
                      .setLngLat(point)
                      .addTo(this.myMap)
                      .on('dragend', this.populateMyPosition);
    }
    this.populateMyPosition();
  }

  populateMyPosition = () => {
    const position = this.myMarker.getLngLat();
    if(this.onChangePosition) this.onChangePosition.emit(position);
  }

}
