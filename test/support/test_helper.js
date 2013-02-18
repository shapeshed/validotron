module.exports = {

  isEmpty: function(obj) {

    'use strict';

    return (Object.getOwnPropertyNames(obj).length === 0);
  }

};
