
var validates = function (validations){

  this.errors = {};

  this.acceptance = function(data, field){
    if (data != true) {
      if (this.errors[field] === undefined) {
        this.errors[field] = [];
      }
      this.errors[field].push("must be accepted")
      return this
    } else {
      return this
    }
  }

  this.format = function(data, pattern, field){
    var regex = new RegExp(pattern);
    if (!regex.test(data)) {
      if (this.errors[field] === undefined) {
        this.errors[field] = [];
      }
      this.errors[field].push("is invalid")
      return this
    } else {
      return this
    }
  }

  this.presence = function(data, field) {
    if (data === undefined) {
      if (this.errors[field] === undefined) {
        this.errors[field] = [];
      }
      this.errors[field].push("can't be blank")
      return this
    } else {
      return this
    }
  };

  this.numericality = function(data, field){
    if (isNaN(parseFloat(data)) && !isFinite(data)){
      if (this.errors[field] === undefined) {
        this.errors[field] = [];
      }
      this.errors[field].push("is not a number")
      return this
    } else {
      return this
    }
  };

  for (var key in validations) {
    var data = validations[key].data || undefined;
    var obj = validations[key];
    for (var prop in obj) {
      if (prop === "acceptance"){
        this.acceptance(data, key);
      }
      if (prop === "format"){
        this.format(data, obj[prop].with, key);
      }
      if (prop === "presence"){
        this.presence(data, key);
      }
      if (prop === "numericality"){
        this.numericality(data, key);
      }
    }
  }

};

module.exports = validates;
