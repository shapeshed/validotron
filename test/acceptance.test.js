var assert = require('assert'),
validotron = require('../lib/validotron'),
test_helper = require('./support/test_helper');

describe('acceptance', function(done){
  it('should pass validation', function(done){
    var validation = new validotron({ 
      name: { 
        data: true, 
        acceptance: true, 
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  })
  it('should populate the errors object when validation fails', function(done){
    var validation = new validotron({ 
      name: { 
        data: false, 
        acceptance: true, 
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"must be accepted\"]}");
    done();
  })
  it('should set a custom failure message correctly', function(done){
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
  it('should fail validation with a custom accept value', function(done){
    var validation = new validotron({ 
      name: { 
        data: "foo", 
        acceptance: {
          accept: "bar"
        } 
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"must be accepted\"]}");
    done();
  })
  it('should pass validation with a custom accept value', function(done){
    var validation = new validotron({ 
      name: { 
        data: "foo", 
        acceptance: {
          accept: "foo"
        } 
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  })
  it('should pass validation if allow_blank: is true', function(done){
    var validation = new validotron({ 
      name: { 
        data: "", 
        acceptance: {
          allow_blank: true 
        },
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  })
})

