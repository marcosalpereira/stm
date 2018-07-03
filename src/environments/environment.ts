// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAWKHU_vo0v0BuWM5ei8HLvT3K2hHNrWf8',
    authDomain: 'tenis-score-match.firebaseapp.com',
    databaseURL: 'https://tenis-score-match.firebaseio.com',
    projectId: 'tenis-score-match',
    storageBucket: 'tenis-score-match.appspot.com',
    messagingSenderId: '368564429662'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
