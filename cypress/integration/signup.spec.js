describe('Sign up', () => {
  it('is navigable by home page link', () => {
    cy.visit('/');
    cy.location('pathname').should('equal', '/login');

    cy.contains('Sign up').click();
    cy.location('pathname').should('equal', '/signup');
  });

  beforeEach(() => {
    cy.visit('/signup');
  });

  it('works in UI with valid info', () => {
    // TODO fill this in
  });
});
