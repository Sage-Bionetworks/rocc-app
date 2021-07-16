const { writeFile } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();

// load environment variables
const isProduction = argv.prod || false;
const SERVER_PROTOCOL = process.env.SERVER_PROTOCOL || undefined;
const SERVER_DOMAIN = process.env.SERVER_DOMAIN || undefined;
const SERVER_PORT = process.env.SERVER_PORT || 80;
const SERVER_BASE_PATH = process.env.SERVER_BASE_PATH || undefined;

// check whether app is running for prod; check package.json
const targetPath = isProduction
  ? './src/environments/environment.prod.ts'
  : './src/environments/environment.ts';

// define setting based on env variable for environment.ts/environment.prod.ts
const envConfigFile = `
  export const environment = {
      production: ${isProduction},
      apiBasePath: '${SERVER_PROTOCOL}${SERVER_DOMAIN}:${SERVER_PORT}${SERVER_BASE_PATH}',
      appVersion: '0.1.0',
      seedDatabase: !${isProduction}
  };
`;

// overwrite environment.ts/environment.prod.ts
writeFile(targetPath, envConfigFile, (err:any) => {
  if (err) { 
    console.log(err);
  }
})