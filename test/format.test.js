var assert = require('assert'),
    validotron = require('../lib/validotron'),
    test_helper = require('./support/test_helper');


describe('format', function(done){
  it('should pass validation', function(done){
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
  it('should populate the errors object when validation fails', function(done){
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
  it('should set a custom failure message correctly', function(done){
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
