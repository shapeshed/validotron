var assert = require('assert'),
    validotron = require('../lib/validotron'),
    test_helper = require('./support/test_helper');


describe('inclusion', function(done) {

  'use strict';

  it('should pass validation', function(done) {
    var validation = new validotron({
      name: {
        data: 'foo',
        inclusion: {
          in: ['foo', 'bar', 'baz']
        }
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  });

  it('should populate the errors object when validation fails', function(done) {
    var validation = new validotron({
      name: {
        data: 'foo',
        inclusion: {
          in: ['bar', 'baz']
        }
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"is not included in the list\"]}");
    done();
  });

  it('should set a custom failure message correctly', function(done) {
    var validation = new validotron({
      name: {
        data: 'foo',
        inclusion: {
          in: ['bar', 'baz'],
          message: 'my custom message'
        }
      }
    });
    assert.strictEqual(JSON.stringify(validation.errors), "{\"name\":[\"my custom message\"]}");
    done();
  });

  it('should pass validation if allow_blank: is true', function(done) {
    var validation = new validotron({
      name: {
        data: '',
        inclusion: {
          allow_blank: true,
          in: ['bar', 'baz']
        }
      }
    });
    assert.strictEqual(test_helper.isEmpty(validation.errors), true);
    done();
  });

});
