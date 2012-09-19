var assert = require('assert'),
    validotron = require('../lib/validotron'),
    test_helper = require('./support/test_helper');


describe('When passing a validations object', function(done){
  describe('and presence is true', function(done){
    describe('and data is undefined', function(done){
      it('should populate the errors object', function(done){
        var validation = new validotron({ 
          name: { 
            data: undefined, 
            presence: true, 
          }
        });
        assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"can't be blank\"]}");
        done();
      })
    })
    describe('and data is undefined with a custom error message', function(done){
      it('should populate the errors object', function(done){
        var validation = new validotron({ 
          name: { 
            data: undefined, 
            presence: {
              message: "you need it punk!"
            }
          }
        });
        assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"you need it punk!\"]}");
        done();
      })
    })
    describe('and data is defined', function(done){
      it('should not populate the errors object', function(done){
        var validation = new validotron({ 
          name: { 
            data: "foo", 
            presence: true, 
          }
        });
        assert.strictEqual(test_helper.isEmpty(validation.errors), true);
        done();
      })
    })
  })
})

