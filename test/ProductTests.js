require('dotenv').config({ path: './.env' });
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const Item = require('../backend/models/item');
let should = chai.should();

chai.use(chaiHttp);



  describe('/GET All Products', () => {
      it('it should GET all the products', (done) => {
        chai.request(server)
            .get('/products')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
            });
      });
  });

  describe('/GET Product from ID', () => {
    it('it should GET the product with the given id', (done) => {
      chai.request(server)
          .get('/product/10')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            done();
          });
    });
});


