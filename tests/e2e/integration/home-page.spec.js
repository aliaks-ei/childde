describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/');

        cy.get('#userImage').click();
        cy.get('#accountDropdown').should('be.visible');
    })
});
