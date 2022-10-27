describe('Sign up page', () => {
  context('Navigation', () => {
    it('is navigable via home page link', () => {
      cy.visit('/');
      cy.location('pathname').should('equal', '/login');

      cy.contains('Sign up').click();
      cy.location('pathname').should('equal', '/signup');
    });
  });

  context('Functionality', () => {
    beforeEach(() => {
      cy.visit('/signup');
    });

    it('UI works with valid info', () => {
      cy.exec('npm run seed');

      // Fill username and password fields and click login button
      cy.get('[name=name]').type(Cypress.env('signupName'));
      cy.get('[name=username]').type(Cypress.env('signupUsername'));
      cy.get('[name=email]').type(Cypress.env('signupEmail'));
      cy.get('[name=password]').type(Cypress.env('password'));
      cy.get('[name=passwordConf]').type(Cypress.env('password'));
      cy.contains('button', 'Sign up').click();

      cy.location('pathname').should('equal', '/verify-email');
    });

    it('displays error message if email is invalid', () => {
      // Fill with invalid email address
      cy.get('[name=name]').type(Cypress.env('signupName'));
      cy.get('[name=username]').type(Cypress.env('signupUsername'));
      cy.get('[name=email]').type('bademail@.');
      cy.get('[name=password]').type(Cypress.env('password'));
      cy.get('[name=passwordConf]').type(Cypress.env('password'));
      cy.contains('button', 'Sign up').click();

      cy.contains('Email address must be a valid email').should('exist');
    });

    it('displays error message if email is already in use', () => {
      cy.exec('npm run seed');

      // Fill with existing email address
      cy.get('[name=name]').type(Cypress.env('signupName'));
      cy.get('[name=username]').type(Cypress.env('signupUsername'));
      cy.get('[name=email]').type('example@example.com');
      cy.get('[name=password]').type(Cypress.env('password'));
      cy.get('[name=passwordConf]').type(Cypress.env('password'));
      cy.contains('button', 'Sign up').click();

      cy.contains('User already exists with email address').should('exist');
    });

    it('displays error message if username is already in use', () => {
      cy.exec('npm run seed');

      // Fill with existing username
      cy.get('[name=name]').type(Cypress.env('signupName'));
      cy.get('[name=username]').type('jonathanseed');
      cy.get('[name=email]').type(Cypress.env('signupEmail'));
      cy.get('[name=password]').type(Cypress.env('password'));
      cy.get('[name=passwordConf]').type(Cypress.env('password'));
      cy.contains('button', 'Sign up').click();

      cy.contains('Username jonathanseed is already in use').should('exist');
    });

    it("displays error message if password doesn't meet requirements", () => {
      // Fill with password that's too short
      cy.get('[name=name]').type(Cypress.env('signupName'));
      cy.get('[name=username]').type(Cypress.env('signupUsername'));
      cy.get('[name=email]').type(Cypress.env('signupEmail'));
      cy.get('[name=password]').type('123');
      cy.get('[name=passwordConf]').type('123');
      cy.contains('button', 'Sign up').click();

      cy.contains('Password must be at least 8 characters').should('exist');
    });

    it("displays error message if passwords don't match", () => {
      // Fill with unmatching passwords
      cy.get('[name=name]').type(Cypress.env('signupName'));
      cy.get('[name=username]').type(Cypress.env('signupUsername'));
      cy.get('[name=email]').type(Cypress.env('signupEmail'));
      cy.get('[name=password]').type('12345678');
      cy.get('[name=passwordConf]').type('password');
      cy.contains('button', 'Sign up').click();

      cy.contains('Passwords must match').should('exist');
    });
  });
});
