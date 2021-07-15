const { writeFile } = require('fs');
require('dotenv').config();

// const environment = process.env.ENVIRONMENT;
let SM = process.env.SM;
// if (environment === 'production') {
//   apiURL = process.env.PRODUCTION_API_ENDPOINT;
// } else if (environment === 'test') {
//  apiURL = process.env.TEST_API_ENDPOINT;
// }

const targetPath = `./src/environments/environment.ts`;
const envConfigFile = `
  export const environment = {
      production: false,
      apiBasePath: 'https://localhost:8080/api/vi',
      appVersion: '0.1.0',
      seedDatabase: true,
      SM: '${SM}'
  };`

writeFile(targetPath, envConfigFile, function (err:any) {
  if (err) { 
    console.log(err);
  }
})