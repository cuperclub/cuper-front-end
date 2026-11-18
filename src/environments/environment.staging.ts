import { mapboxAuth } from './environment.generated';

export const environment = {
  production: false,
  apiBase: 'https://cuper-backend.herokuapp.com',
  mapboxAuth,
  pusher_key: 'b5429473c9fd39c946b1',
  pusher_cluster: 'us3',
  success_state: 'http://cuper-backend.herokuapp.com/home/dashboard'
};
