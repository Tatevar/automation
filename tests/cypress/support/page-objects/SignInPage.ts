const SignInElements = {
    email: '#email',
    password: '#password',
    signInBtn: 'button[type=submit]',
}
class SignInPage {
    navigate() {
        cy.visit('/')
    }
    signIn(email: string, password: string) {
        cy.get(SignInElements.email).type(email)
        cy.get(SignInElements.password).type(password)
        cy.get(SignInElements.signInBtn).click()
    }
    clickSignInBtn() {
        cy.get(SignInElements.signInBtn).click()
    }
}
export default SignInPage
