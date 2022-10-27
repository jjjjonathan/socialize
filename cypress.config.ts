/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3333',
    video: false,
    screenshotOnRunFailure: false,
    chromeWebSecurity: false,
    env: {
      signupName: 'Cypress Tester',
      signupUsername: 'cypresstester',
      signupEmail: 'cypress@example.com',
      loginUsername: 'jonathanseed',
      password: 'password',
    },
  },
});
