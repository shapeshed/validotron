
var assert = require('assert'),
    validotron = require('../lib/validotron'),
    test_helper = require('./support/test_helper');


describe('length', function(done){
  it('should pass validation', function(done){
    var validation = new validotron({ 
      name: { 
        data: "foo", 
        length: {
          minimum: 2
        } 
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  })
  it('should populate the errors object with the minimum constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: "foo", 
        length: {
          minimum: 20
        } 
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"is too short (min is 20 characters)\"]}");
    done();
  })
  it('should populate the errors object with the maximum constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: "foobarbaz", 
        length: {
          maximum: 6
        } 
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"is too long (max is 6 characters)\"]}");
    done();
  })
  it('should populate the errors object with the is constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: "foobarbaz", 
        length: {
          is: 6
        } 
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"is the wrong length (should be 6 characters)\"]}");
    done();
  })
  it('should pass validation if allow_blank: is true', function(done){
    var validation = new validotron({ 
      name: { 
        data: "", 
        length: {
          minimum: 2,
          allow_blank: true 
        },
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  })
})

