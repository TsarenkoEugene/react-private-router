context('Routing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/tab-page/static-child');
  });

  describe('Static child', () => {
    it('Static child exists on tab page', () => {
      cy.get('#tab-page').should('have.text', 'Tab page');
      cy.get('#static-child').should('have.text', 'Static-child');
    });
  });
});
