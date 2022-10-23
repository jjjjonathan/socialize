/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3333',
    video: false,
    screenshotOnRunFailure: false,
    env: {
      name: 'Cypress Tester',
      username: 'cypresstester',
      email: 'example@example.com',
      password: 'password',
    },
  },
});
