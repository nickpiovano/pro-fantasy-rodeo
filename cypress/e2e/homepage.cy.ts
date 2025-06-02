describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the title', () => {
    cy.contains('Pro Fantasy Rodeo').should('be.visible');
  });

  it('should display the prize information', () => {
    cy.contains('Win a 2024 Ram 1500').should('be.visible');
    cy.contains('$60K in prizes').should('be.visible');
  });

  it('should display the countdown timer', () => {
    cy.contains('Contest Closes In').should('be.visible');
    cy.get('.grid-cols-4').should('be.visible');
  });

  it('should have a working "Build Your Team" button', () => {
    cy.contains('button', 'Build Your Team').click();
    cy.url().should('include', '/roster');
  });

  it('should display "How It Works" section', () => {
    cy.contains('How It Works').should('be.visible');
  });

  it('should display entry fee information', () => {
    cy.contains('Entry Fee').should('be.visible');
    cy.contains('$19.95').should('be.visible');
  });

  it('should have a working bottom navigation', () => {
    cy.get('.mobile-nav-bar').should('be.visible');
    
    // Test each navigation item
    cy.contains('Home').should('be.visible');
    cy.contains('Build Team').should('be.visible');
    cy.contains('Standings').should('be.visible');
    cy.contains('Prizes').should('be.visible');
    cy.contains('Account').should('be.visible');
    
    // Navigate to prizes page
    cy.contains('Prizes').click();
    cy.url().should('include', '/prizes');
    
    // Navigate back to home
    cy.contains('Home').click();
    cy.url().should('include', '/');
  });
}); 