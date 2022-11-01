module.exports = [
    
    {
      context: [ '/book-summary/**' ],
      target: 'http://localhost:8080',
      secure: false
    },
    {
      context: [ '/submit-order/**' ],
      target: 'http://localhost:8080',
      secure: false
    },
    {
      context: [ '/name/**' ],
      target: 'http://localhost:8080',
      secure: false
    },
    {
      context: [ '/upload/**' ],
      target: 'http://localhost:8080',
      secure: false
    },
    {
      context: [ '/**' ], //match these request
      target: 'http://localhost:8080', //SpringBoot!
      secure: false
    }
  ]