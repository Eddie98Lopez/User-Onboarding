describe('Form Test', ()=>{

    beforeEach(() => cy.visit('http://localhost:3000'))

    it('Should fill out the inputs and submit',()=>{

        cy.get('input[name="name"]').type('Eddie Rogers').should('have.value','Eddie Rogers')
        cy.get('input[name="email"]').type('ed98lopez@gmail.com')
        cy.get('input[name="password"]').type('boopbeep')
        cy.get('input[name="terms"]').check()
        cy.get('button').click()
    })


    it('Should not fill out form correctly and have a disabled button',()=>{
        cy.get('input[name="email"]').type('ed98lopez@gmail.com')
        cy.get('input[name="password"]').type('boopbeep')
        cy.get('input[name="terms"]').check()

        cy.get('button').should('be.disabled')

    })


})

