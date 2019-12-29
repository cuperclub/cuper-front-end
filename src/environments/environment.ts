// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBase: 'http://localhost:3000',
  mapboxAuth: 'pk.eyJ1IjoiZGFvc2djIiwiYSI6ImNqa2VnbW9ldTNiYWUzcG1rdmoyZ29jcnkifQ.LhnLZHX-gNhQefUN2iihPg',
  pusher_key: '85e46b162288859d70a0',
  pusher_cluster: 'us3',
  success_state: 'http://localhost:3000/home/dashboard'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
