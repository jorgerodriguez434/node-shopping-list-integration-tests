const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const {app} = require('../server');

chai.use(chaiHttp);

describe('Recipes', function() {

      it('should list recipes on GET', function() {
            return chai.request(app)
            .get('recipes')
            .then(function(res) {

                expect(res).to.have.status(200);
                expect(res).to.have.json();
  

            });


      }); 


});