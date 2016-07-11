/* globals describe it before */
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('http://localhost:3000');

describe('GET /candies', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done);
  })
  it('should return an array', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.be.an('array')
      done()
    })
  })
  it('should return all the records in the database', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.have.length(4)
      done()
    })
  })
})

describe('GET /candies/:id', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done);
  })
  it('should return an object that has a field called "name" and "color"', (done) => {
    api.get('/candies/1')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.have.property('name')
      expect(response.body).to.have.property('color')
      done()
    })
  })
})

describe('POST /candies', () => {
  before((done) => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      'id': 5,
      'name': 'Lollipop',
      'color': 'Red',
    }).end(done)
  })

  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done);
  })

  it('should add a candy object to the collection and return it', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body[response.body.length - 1].name).to.equal('Lollipop')
      done()
    })
  })

  it('should return a 422 response if the color field is wrong', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .send({
      'id': 6,
      'name': 'Smartie',
      'color': 'Fat',
    })
    .end( (error, response) => {
      expect(422)
      expect(response.body.message).to.equal('Candy 6 not valid and not created.')
      done()
    })
  })

}) // end POST

describe('PUT /candies/:id', () => {
  before((done) => {
    api.put('/candies/5')
    .set('Accept', 'application/json')
    .send({
      'id': 5,
      'name': 'Lollipop',
      'color': 'Black',
    }).end(done)
  })

  it('should return a 200 response', (done) => {
    api.get('/candies/:id')
    .set('Accept', 'application/json')
    .expect(200, done);
  })

  it('should update a candy', (done) => {
    api.get('/candies/')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body[response.body.length - 1].color).to.equal('Black')
      done()
    })
  })

}) // end PUT

// DELETE
describe('DELETE /candies/:id', () => {
  it('should delete a candy', (done) => {
    api.delete('/candies/5')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body.message).to.equal('Candy 5 deleted')
      done()
    })
  })
}) // end DELETE
