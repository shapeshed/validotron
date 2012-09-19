var assert = require('assert'),
    validotron = require('../lib/validotron'),
    test_helper = require('./support/test_helper');


describe('When passing a validations object', function(done){
  describe('and format is true', function(done){
    describe('and the regex does not match', function(done){
      it('should populate the errors object', function(done){
        var validation = new validotron({ 
          name: { 
            data: "^%$#", 
            format: {
              with: "[A-Z]"
            } 
          }
        });
        assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"is invalid\"]}");
        done();
      })
    })
    describe('and the regex does not match with a custom message', function(done){
      it('should populate the errors object', function(done){
        var validation = new validotron({ 
          name: { 
            data: "^%$#", 
            format: {
              with: "[A-Z]",
              message: "the regex did not match"
            } 
          }
        });
        assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"the regex did not match\"]}");
        done();
      })
    })
    describe('and format is true and the regex matches', function(done){
      describe('and the regex matches', function(done){
        it('should not populate the errors object', function(done){
          var validation = new validotron({ 
            name: { 
              data: "ABC", 
              format: {
                with: "[A-Z]"
              } 
            }
          });
          assert.strictEqual(test_helper.isEmpty(validation.errors), true);
          done();
        })
      })
    })
  })
})

