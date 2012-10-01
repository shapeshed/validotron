var assert = require('assert'),
    validotron = require('../lib/validotron'),
    test_helper = require('./support/test_helper');


describe('numericality', function(done){
  it('should pass validation', function(done){
    var validation = new validotron({ 
      name: { 
        data: "12", 
        numericality: true, 
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  })
  it('should populate the errors object when validation fails', function(done){
    var validation = new validotron({ 
      name: { 
        data: undefined, 
        numericality: true, 
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"is not a number\"]}");
    done();
  })
  it('should set a custom failure message correctly', function(done){
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
  it('should fail validation a with a greater than constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: 1, 
        numericality: {
          greater_than: 10
        }
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"must be greater than 10\"]}");
    done();
  })
  it('should pass validation a with a greater than constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: 12, 
        numericality: {
          greater_than: 10
        }
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  })
  it('should fail validation with a greater than or equal to constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: 9, 
        numericality: {
          greater_than_or_equal_to: 10
        }
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"must be greater than or equal to 10\"]}");
    done();
  })
  it('should pass validation with a greater than or equal to constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: 10, 
        numericality: {
          greater_than_or_equal_to: 10
        }
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    var validation = new validotron({ 
      name: { 
        data: 11, 
        numericality: {
          greater_than_or_equal_to: 10
        }
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  })
  it('should fail validation with an equal to constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: 9, 
        numericality: {
          equal_to: 10
        }
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"must be equal to 10\"]}");
    done();
  })
  it('should pass validation with an equal to constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: 10, 
        numericality: {
          equal_to: 10
        }
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  })
  it('should fail validation with a less than constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: 9, 
        numericality: {
          less_than: 6
        }
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"must be less than 6\"]}");
    done();
  })
  it('should pass validation with a less than constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: 5, 
        numericality: {
          less_than: 6
        }
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  })
  it('should fail validation with a less than or equal to constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: 9, 
        numericality: {
          less_than_or_equal_to: 6
        }
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"must be less than or equal to 6\"]}");
    done();
  })
  it('should pass validation with a less than or equal to constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: 6, 
        numericality: {
          less_than_or_equal_to: 6
        }
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    var validation = new validotron({ 
      name: { 
        data: 5, 
        numericality: {
          less_than_or_equal_to: 6
        }
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  })
  it('should fail validation with an odd constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: 10, 
        numericality: {
          odd: true
        }
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"must be odd\"]}");
    done();
  })
  it('should pass validation with an odd constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: 7, 
        numericality: {
          odd: true
        }
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  })
  it('should fail validation with an even constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: 7, 
        numericality: {
          even: true
        }
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"must be even\"]}");
    done();
  })
  it('should pass validation with an even constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: 10, 
        numericality: {
          even: true
        }
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  })
  it('should fail validation with an only integer constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: "6.25", 
        numericality: {
          only_integer: true
        }
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"is not a number\"]}");
    done();
  })
  it('should pass validation with an only integer constraint set', function(done){
    var validation = new validotron({ 
      name: { 
        data: 10234, 
        numericality: {
          only_integer: true
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
        numericality: {
          allow_blank: true 
        },
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  })
})

