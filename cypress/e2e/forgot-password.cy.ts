describe('Forgot password page', () => {
  context('Navigation', () => {
    it('is navigable via link on login page', () => {
      cy.visit('/login');
      cy.contains('Forgot your password?').click();
      cy.location('pathname').should('equal', '/change-password/forgot');
    });
  });

  context('Functionality', () => {
    it('UI works with valid email');
    it('displays error message for invalid email');
    it('displays error message if no user exists with email');
  });
});
