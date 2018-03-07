const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);

describe('Recipes', function() {

      before(function() {
            return runServer();
      });


      after(function() {
          return closeServer();
      });

      it('should list recipes on GET', function() {
            return chai.request(app)
            .get('/recipes')
            .then(function(res) {

                expect(res).to.have.status(200);
                expect(res).to.be.json;
  
            });


      });

      it('should add recipes on POST', function() {
            const newRecipe = { name: 'foo', ingredients: ['buzz', 'fizz']};            
            return chai.request(app)
            .post('/recipes')
            .send(newRecipe)
            .then(function(res) {

                expect(res).to.have.status(201);
                expect(res).to.be.json;
  
            });
            


      }); 

       it('should update recipes on PUT', function() {
            const updateItem = {
                        name: 'foo',
                        ingredients: ['bizz', 'bang']
              };

            return chai.request(app)
            .get('/recipes')
            .then(function(res) {

                  updateItem.id = res.body[0].id;
                  return chai.request(app)
                  .put(`/recipes/${updateItem.id}`)
                  .send(updateItem);

            })
            .then(function(res) {

                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.deep.equal(updateItem);


            });


      }); 



});