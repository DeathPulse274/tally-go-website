// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  getUsers: 'https://zp1fuzpqhg.execute-api.ap-south-1.amazonaws.com/tallyUser/dummy',
  loginMockup: 'https://zp1fuzpqhg.execute-api.ap-south-1.amazonaws.com/tallyUser/loginmockup',
  restartLaptop: 'https://zp1fuzpqhg.execute-api.ap-south-1.amazonaws.com/tallyUser/restartlaptop',
  restartComputer: 'https://zp1fuzpqhg.execute-api.ap-south-1.amazonaws.com/tallyUser/restartcomputer',
  login: 'https://authapi.tryonaws.in/login',
  computerStatus: 'https://zp1fuzpqhg.execute-api.ap-south-1.amazonaws.com/tallyUser/userstatus',
  manageUser: 'https://zp1fuzpqhg.execute-api.ap-south-1.amazonaws.com/tallyUser/manageusers',
  activateUser: 'https://zp1fuzpqhg.execute-api.ap-south-1.amazonaws.com/tallyUser/activateuser',
  deactivateUser: 'https://zp1fuzpqhg.execute-api.ap-south-1.amazonaws.com/tallyUser/deactivateuser',
  stopMachhine: 'https://zp1fuzpqhg.execute-api.ap-south-1.amazonaws.com/tallyUser/stopvm',
  listUsers: 'https://zp1fuzpqhg.execute-api.ap-south-1.amazonaws.com/tallyUser/listusers',
  addUsers: 'https://zp1fuzpqhg.execute-api.ap-south-1.amazonaws.com/tallyUser/adduser'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
