describe('Roster Builder Page', () => {
  beforeEach(() => {
    // Start on the home page and navigate to roster builder
    cy.visit('/');
    cy.contains('button', 'Build Your Team').click();
    cy.url().should('include', '/roster');
  });

  it('should display the title', () => {
    cy.contains('Build Your Team').should('be.visible');
  });

  it('should display the progress bar', () => {
    cy.get('.progress-bar').should('be.visible');
  });

  it('should display the event card', () => {
    cy.get('.card-western').should('be.visible');
  });

  it('should be able to select a contestant', () => {
    // Find the first contestant button and click it
    cy.get('.card-western button').first().click();
    
    // Verify the next button is now enabled
    cy.contains('button', 'Next Event')
      .should('not.be.disabled');
    
    // Click next to go to the next event
    cy.contains('button', 'Next Event').click();
    
    // Select a contestant in the second event
    cy.get('.card-western button').first().click();
    
    // Verify the next button is enabled
    cy.contains('button', 'Next Event')
      .should('not.be.disabled');
    
    // Continue until the last event
    for (let i = 0; i < 5; i++) {
      cy.contains('button', 'Next Event').click();
      cy.get('.card-western button').first().click();
    }
    
    // After the last event, we should see "Review Team" instead of "Next Event"
    cy.contains('button', 'Review Team')
      .should('be.visible')
      .should('not.be.disabled')
      .click();
    
    // We should now be on the summary page
    cy.url().should('include', '/summary');
  });

  it('should show the selected contestants', () => {
    // Select the first contestant
    cy.get('.card-western button').first().click();
    
    // Check if the selection is shown in the "Your Selections" section
    cy.contains('Your Selections').should('be.visible');
    cy.get('.glass-card').last().find('.bg-white\\/10').should('be.visible');
  });

  it('should be able to go back to previous event', () => {
    // Select a contestant and go to next event
    cy.get('.card-western button').first().click();
    cy.contains('button', 'Next Event').click();
    
    // Now go back
    cy.contains('button', 'Back').click();
    
    // We should be back at the first event with selection preserved
    cy.get('.card-western button.border-red-600').should('be.visible');
  });
}); 