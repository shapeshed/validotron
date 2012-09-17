var assert = require('assert'),
    validotron = require('../lib/validotron');

function isEmpty(obj){
  return (Object.getOwnPropertyNames(obj).length === 0);
}

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
        assert.strictEqual(isEmpty(validation.errors), true);
        done();
      })
    })
  })
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
          assert.strictEqual(isEmpty(validation.errors), true);
          done();
        })
      })
    })
  })
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
        assert.strictEqual(isEmpty(validation.errors), true);
        done();
      })
    })
  })
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
        assert.strictEqual(isEmpty(validation.errors), true);
        done();
      })
    })
  })
  describe('and acceptance and format are true', function(done){
    describe('and both conditions fail', function(done){
      it('should populate the errors object', function(done){
        var validation = new validotron({ 
          name: { 
            data: undefined, 
            numericality: true, 
            format: {
              with: "[A-Z]"
            } 
          }
        });
        assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"is not a number\",\"is invalid\"]}");
        done();
      })
    })
    describe('and both conditions pass', function(done){
      it('should not populate the errors object', function(done){
        var validation = new validotron({ 
          name: { 
            data: "123", 
            numericality: true, 
            format: {
              with: "[1-9]"
            } 
          }
        });
        assert.strictEqual(isEmpty(validation.errors), true);
        done();
      })
    })
  })
  describe('with multiple data points and conditions', function(done){
    describe('and all conditions fail', function(done){
      it('should populate the errors object', function(done){
        var validation = new validotron({ 
          name: { 
            data: undefined, 
            numericality: true, 
            format: {
              with: "[A-Z]"
            } 
          },
          description: { 
            data: undefined, 
            presence: true, 
          }
        });
        assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"is not a number\",\"is invalid\"],\"description\":[\"can't be blank\"]}");
        done();
      })
    })
    describe('and all conditions pass', function(done){
      it('should not populate the errors object', function(done){
        var validation = new validotron({ 
          name: { 
            data: 123, 
            numericality: true, 
            format: {
              with: "[1-9]"
            } 
          },
          description: { 
            data: 'foo', 
            presence: true, 
          }
        });
        assert.strictEqual(isEmpty(validation.errors), true);
        done();
      })
    })
  })
})

