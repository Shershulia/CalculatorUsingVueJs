describe('app', () => {
  it('Form submited unsuccessfully ', () => {
    cy.visit('http://localhost:8080/kontaktskjema');
    //cy.get('[data-test="test-cat"]').select("bag");
    cy.get('[data-test="test-name"]').type("Ivan666");
    cy.get('[data-test="test-email"]').type("Not Valid mail");
    cy.get('[data-test="test-desc"]').type("12");
    cy.get('#submit_button').click();
    cy.get('#submit_button').should("be.disabled")
  })
})