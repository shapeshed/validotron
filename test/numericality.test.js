var assert = require('assert'),
    validotron = require('../lib/validotron'),
    test_helper = require('./support/test_helper');


describe('When passing a validations object', function(done){
  describe('and numericality is true', function(done){
    describe('and data is not a number', function(done){
      it('should populate the errors object', function(done){
        var validation = new validotron({ 
          name: { 
            data: undefined, 
            numericality: true, 
          }
        });
        assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"is not a number\"]}");
        done();
      })
    })
    describe('and data is not a number with a custom error message', function(done){
      it('should populate the errors object', function(done){
        var validation = new validotron({ 
          name: { 
            data: undefined, 
            numericality: {
              message: "you want my number?"
            }
          }
        });
        assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"you want my number?\"]}");
        done();
      })
    })
    describe('and data is a number', function(done){
      it('should not populate the errors object', function(done){
        var validation = new validotron({ 
          name: { 
            data: "12", 
            numericality: true, 
          }
        });
        assert.strictEqual(test_helper.isEmpty(validation.errors), true);
        done();
      })
    })
  })
})

