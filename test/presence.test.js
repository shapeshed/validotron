var assert = require('assert'),
    validotron = require('../lib/validotron'),
    test_helper = require('./support/test_helper');


describe('acceptance', function(done){
  it('should pass validation', function(done){
    var validation = new validotron({ 
      name: { 
        data: "foo", 
        presence: true, 
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  })
  it('should populate the errors object when validation fails', function(done){
    var validation = new validotron({ 
      name: { 
        data: undefined, 
        presence: true, 
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"can't be blank\"]}");
    done();
  })
  it('should set a custom failure message correctly', function(done){
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

