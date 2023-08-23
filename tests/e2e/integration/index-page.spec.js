describe("Account widget", () => {
  it("successfully opens account widget", () => {
    cy.visit("/");

    cy.get("#userImage").click();
    cy.get("#accountDropdown").should("be.visible");
  });
});

describe("Question modal", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it('successfully opens question modal by clicking on "Frage stellen" button in left navigation menu ', () => {
    cy.get(".base-btn.left-nav-menu__button").click({ force: true });

    cy.get("#qModal").should("be.visible");
  });

  it('successfully opens question modal by clicking on "Enter question" block', () => {
    cy.get(".enter-question-wrapper__container").click({ force: true });

    cy.get("#qModal").should("be.visible");
  });
});

describe("Answer modal", () => {
  it('successfully opens answer modal by clicking on "Antworten" button in question card', () => {
    cy.visit("/");

    cy.get(".question-card.question-card--default").within(() => {
      cy.get('[data-target="answerModal"]').click({ force: true });
    });

    cy.get("#answerModal").should("be.visible");
  });
});
