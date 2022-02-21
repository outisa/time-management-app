describe('Registration', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000/register')
    cy.get('#username').clear()
    cy.get('#email').clear()
    cy.get('#password').clear()
  })
  it('A user can registrate with valid input', function() {
    cy.contains('Username')
    cy.get('#username').type('myusername')
    cy.get('#email').type('myemail@example.com')
    cy.get('#password').type('myverysecretpassword')
    cy.get('#register').click()
    cy.contains('Your are successfully registered myusername')
  })

  it('A user cannot registrate with unvalid input', function() {
    cy.contains('Username')
    cy.get('#username').type('myu')
    cy.get('#email').type('myemail.com')
    cy.get('#password').type('myvery')
    cy.get('#register').click()
    cy.contains('Username should be minimum of 4 charackters long')
    cy.contains('Enter a valid email')
    cy.contains('Password should be minimum of 10 charackters long')
    cy.get('#username').clear()
    cy.get('#email').clear()
    cy.get('#password').clear()
    cy.get('#username').type('myusernameeeeeeeeeeeee')
    cy.get('#password').type('myverwefwefwefwefwefwefwefyeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
    cy.get('#register').click()
    cy.contains('Username should be maximum of 20 charackters long')
    cy.contains('Email is required')
    cy.contains('Password should be maximum of 100 charackters long')
  })
  // Needs tests for unique values when notifications added
})
describe('Login', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'TestUser',
      email: 'testuser@example.com',
      password: 'sosecretsosecret'
    }
    cy.request('POST', 'http://localhost:3001/api/user/register', user)
    cy.visit('http://localhost:3000/login')
  })
  it('A valid user can login in', function() {
    cy.contains('Username')
    cy.contains('Password')
    cy.get('#login-username').type('TestUser')
    cy.get('#login-password').type('sosecretsosecret')
    cy.get('#login').click()
    cy.contains('Welcome TestUser!')
  })
  it('A user can not login in if username or password are missifg', function() {
    cy.contains('Username')
    cy.contains('Password')
    cy.get('#login-username').type('TestUser')
    cy.get('#login').click()
    cy.contains('Password is required')
    cy.contains('Username')
    cy.contains('Password')
    cy.get('#login-username').clear()
    cy.get('#login-password').type('sosecretsosecret')
    cy.get('#login').click()
    cy.contains('Username is required')
  })
  it('An invalid user cannot login in', function() {
    cy.contains('Username')
    cy.contains('Password')
    cy.get('#login-username').type('TestUdser')
    cy.get('#login-password').type('sosecretsosecret')
    cy.get('#login').click()
    cy.contains('Invalid username or password')
  })
})