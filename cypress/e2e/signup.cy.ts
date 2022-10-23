describe('Sign up page', () => {
  it('is navigable by home page link', () => {
    cy.visit('/');
    cy.location('pathname').should('equal', '/login');

    cy.contains('Sign up').click();
    cy.location('pathname').should('equal', '/signup');
  });

  it.skip('UI works with valid info', () => {
    cy.visit('/signup');

    // Fill username and password fields and click login button
    cy.get('[name=name]').type(Cypress.env('name'));
    cy.get('[name=username]').type(Cypress.env('username'));
    cy.get('[name=email]').type(Cypress.env('email'));
    cy.get('[name=password]').type(Cypress.env('password'));
    cy.get('[name=passwordConf]').type(Cypress.env('password'));
    cy.contains('button', 'Sign up').click();

    // Should display confirmation email screen
    cy.location('pathname').should('equal', '/verify-email');
    // TODO add visual confirmation

    // Ping verify email test API route

    // Login
  });

  it('is currently unimplemented');
});
