import * as dotenv from 'dotenv';
import * as path from 'path';

// Determine the environment and load the corresponding .env file
const environment = process.env.NODE_ENV || 'staging';
dotenv.config({
  path: path.resolve(__dirname, `../.env.${environment}`),
});

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://preview.owasp-juice.shop/#/',
  HEROKU_ALERTS_URL: process.env.HEROKU_ALERTS_URL || 'https://the-internet.herokuapp.com/javascript_alerts',
};
