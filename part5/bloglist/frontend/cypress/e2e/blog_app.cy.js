describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Lucas Liu',
      username: 'lucas',
      password: 'monday'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('5.17: Login form is shown', function () {
    cy.contains('Login to application')
    cy.get('#username')
    cy.get('#password')
  })

  describe('5.18: Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('lucas')
      cy.get('#password').type('monday')
      cy.get('#login-button').click()
      cy.contains('Lucas Liu logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password').and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'lucas', password: 'monday' })
    })

    it('5.19: A blog can be created', function () {
      cy.contains('new note').click()
      cy.get('#title').type('blog 1')
      cy.get('#author').type('author 1')
      cy.get('#url').type('url 1')
      cy.get('#submit-button').click()

      cy.contains('blog 1 - author 1')
    })

    describe('after blog created', function () {
      beforeEach(function () {
        cy.contains('new note').click()
        cy.get('#title').type('blog 1')
        cy.get('#author').type('author 1')
        cy.get('#url').type('url 1')
        cy.get('#submit-button').click()
        cy.contains('blog 1 - author 1').parent().contains('show').click()
      })

      it('5.20: confirms users can like a blog', function () {
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('5.21: user who created a blog can delete it', function () {
        cy.contains('delete').click()
        cy.contains('blog 1 - author 1').should('not.exist')
      })
    })

    describe('create two blogs', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'blog1', author: 'author1', url: 'url1' })
        cy.createBlog({ title: 'blog2', author: 'author2', url: 'url2' })
      })

      it('5.22: blogs are ordered according to likes with the blog with the most likes being first', function () {
        // like blog2
        cy.contains('blog2 - author2').parent().contains('show').click().parent().contains('like').click()
        // revisit the page and blog 2 should be the first blog
        cy.visit('http://localhost:3000')
        cy.get('.blog').eq(0).should('contain', 'blog2')
        cy.get('.blog').eq(1).should('contain', 'blog1')
      })
    })

  })

})