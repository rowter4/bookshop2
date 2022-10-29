module.exports = [
    
    {
      context: [ '/book-summary/**' ],
      target: 'http://localhost:8080',
      secure: false
    },
    {
      context: [ '/**' ], //match these request
      target: 'http://localhost:8080', //SpringBoot!
      secure: false
    }
  ]