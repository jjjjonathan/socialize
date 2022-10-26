describe('Log in page', () => {
  context('Navigation', () => {
    it('User is redirected here from root if not logged in', () => {
      cy.visit('/');
      cy.location('pathname').should('equal', '/login');
    });
  });

  context('Functionality', () => {
    before(() => {
      cy.exec('npm run seed');
    });

    beforeEach(() => {
      cy.visit('/login');
    });

    // it('successfully logs in using the UI with valid credentials', () => {
    //   Cypress.Cookies.debug(true);

    //   cy.get('[name=username]').type(Cypress.env('loginUsername'));
    //   cy.get('[name=password]').type(Cypress.env('password'));
    //   cy.contains('button', 'Log in').click();

    //   // cy.clearCookies();
    //   cy.getCookie('next-auth.session-token').then((cookie) => {
    //     cy.log(JSON.stringify(cookie));

    //     if (cookie) {
    //       cy.setCookie(cookie.name, cookie.value, {
    //         domain: cookie.domain,
    //         expiry: cookie.expiry,
    //         httpOnly: cookie.httpOnly,
    //         path: cookie.path,
    //         secure: cookie.secure,
    //       });
    //     }

    //     //   Cypress.Cookies.defaults({
    //     //     preserve: cookieName,
    //     //   });
    //   });

    //   // cy.location('pathname').should('equal', '/');
    //   // cy.contains('New Users').should('exist');

    //   // remove the two lines below if you need to stay logged in
    //   // for your remaining tests
    //   // cy.visit('/api/auth/signout');
    //   // cy.get('form').submit();
    // });

    // it('sends user to callback url after successful log in');

    // it('successfully logs in as example user when pressing the button', () => {
    //   cy.contains('button', 'Log in as Example User').click();
    // });

    it('log in fails with non-existent user');
    it('log in fails with incorrect password');
    it("shows error message if password doesn't meet requirements");
    it('shows error message if username is omitted');
    it('shows error message if password is omitted');
  });
});
