/// <reference types="cypress" />
describe("My First Test", function() {
  it("Does not do much!", function() {
    expect(true).to.equal(true);
  });
});
describe("survey", function() {
  it("home", function() {
    cy.visit("/");
  });
});
export {};
