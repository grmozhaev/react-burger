describe('service is available', () => {
  it('should be available on localhost:3000', () => {
    cy.visit('http://localhost:3000');
  });

  it('should drag and drop ingredient', () => {
    cy.get('[data-testid="ingredient-1"]').trigger('dragstart');
    cy.get('.constructor').trigger('drop');
    cy.get('[data-testid="totalAmount"]').contains('1976');
    cy.get('[data-testid="ingredient-3"]').trigger('dragstart');
    cy.get('.constructor').trigger('drop');
    cy.get('[data-testid="totalAmount"]').contains('3313');
  });

  it('should delete ingredient', () => {
    cy.get('[data-testid="item-1"]').click();
    cy.get('[data-testid="totalAmount"]').contains('1976');
  });
});
