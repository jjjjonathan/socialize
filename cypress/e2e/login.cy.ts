describe('Log in page', () => {
  context('Navigation', () => {
    it('User is redirected here from root if not logged in', () => {
      cy.visit('/');
      cy.location('pathname').should('equal', '/login');
    });
  });

  context('Functionality', () => {
    it('successfully logs in using the UI with valid credentials');
    it('successfully logs in as example user when pressing the button');
    it('log in fails with non-existent user');
    it('log in fails with incorrect password');
    it("shows error message if password doesn't meet requirements");
    it('shows error message if username is omitted');
    it('shows error message if password is omitted');
  });
});
