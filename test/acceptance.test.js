var assert = require('assert'),
    validotron = require('../lib/validotron'),
    test_helper = require('./support/test_helper');

describe('When passing a validations object', function(done){
  describe('and acceptance is set to true', function(done){
    describe('and data is false', function(done){
      it('should populate the errors object', function(done){
        var validation = new validotron({ 
          name: { 
            data: false, 
            acceptance: true, 
          }
        });
        assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"must be accepted\"]}");
        done();
      })
    })
    describe('and data is false with a custom message', function(done){
      it('should populate the errors object', function(done){
        var validation = new validotron({ 
          name: { 
            data: false, 
            acceptance: {
              message: "you need a name punk!"
            } 
          }
        });
        assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"you need a name punk!\"]}");
        done();
      })
    })
    describe('and data is true', function(done){
      it('should not populate the errors object', function(done){
        var validation = new validotron({ 
          name: { 
            data: true, 
            acceptance: true, 
          }
        });
        assert.strictEqual(test_helper.isEmpty(validation.errors), true);
        done();
      })
    })
  })
})

