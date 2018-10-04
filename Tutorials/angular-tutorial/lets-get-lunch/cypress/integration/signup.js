describe('Signup', () => {
  before(() => {
    Cypress.config('baseUrl', 'http://localhost:4200');
  });
  beforeEach(() => {
    cy.request('DELETE', 'http://localhost:8080/api/test');
  });
  it('should navigate to the dashboard with valid credentials', () => {
    cy
      .visit('/signup')
      .url().should('include', '/signup')
      .get('#username').type('user')
      .get('#password').type('password')
      .get('form').submit()
      .url().should('include', '/dashboard');
  });
  it('should navigate to the dashboard with valid credentials ' +
    'and diet preferences', () => {
    cy
      .visit('/signup')
      .url().should('include',  '/signup')
      .get('#username').type('user')
      .get('#password').type('password')
      .get('#BBQ').click()
      .get('form').submit()
      .url().should('include', '/dashboard');
  });

  it('should display an error with invalid credentials', () => {
    cy
      .visit('/signup')
      .url().should('include', '/signup')
      .get('#username').type('user')
      .get('#password').type('123')
      .get('form').submit()
      .get('.alert')
  });
});
