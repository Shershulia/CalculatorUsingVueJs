describe('app', () => {
  it('Form submited successfully ', () => {
    cy.intercept('POST','https://my-json-server.typicode.com/Shershulia/CalculatorUsingVueJs/comments').as("call");
    cy.visit('http://localhost:8080/kontaktskjema');
    cy.get('[data-test="test-cat"]').select("bag");
    cy.get('[data-test="test-name"]').type("Ivan");
    cy.get('[data-test="test-email"]').type("example@mail.ru");
    cy.get('[data-test="test-desc"]').type("There is a bag in the corner");
    cy.get('#submit_button').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Success');
    });

    cy.wait('@call').its('response.statusCode').should('eq', 201);

  })
})