import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare const Pusher: any;

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;
  channel: any;

  constructor() {
    this.pusher = new Pusher(environment.pusher_key, {
      cluster: environment.pusher_cluster,
      encrypted: true
    });
    const channelName = 'usernotifications.general'
    this.channel = this.pusher.subscribe(channelName);
  }
}
