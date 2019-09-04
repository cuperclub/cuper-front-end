import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare const Pusher: any;

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;
  channel: any;

  constructor(channelName: string) {
    this.pusher = new Pusher(environment.pusher_key, {
      cluster: environment.pusher_cluster,
      encrypted: true
    });
    this.channel = this.pusher.subscribe(channelName);
  }
}
