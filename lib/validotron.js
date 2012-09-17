
var validates = function (validations){

  this.errors = {};

  var setFieldErrorArray = function(field, errors){
    if (errors[field] === undefined) {
      errors[field] = [];
    }
    return;
  }
  
  var setErrorMessage = function(field, defaultMessage, customMessage, errors){
    var message = (customMessage) ? customMessage : defaultMessage;
    errors[field].push(message)
    return;
  }

  this.acceptance = function(data, message, field){
    if (data != true) {
      setFieldErrorArray(field, this.errors);
      setErrorMessage(field, "must be accepted", message, this.errors);
    }
    return this;
  }

  this.format = function(data, pattern, message, field){
    var regex = new RegExp(pattern);
    if (!regex.test(data)) {
      setFieldErrorArray(field, this.errors);
      setErrorMessage(field, "is invalid", message, this.errors);
    }
    return this
  }

  this.presence = function(data, message, field) {
    if (data === undefined) {
      setFieldErrorArray(field, this.errors);
      setErrorMessage(field, "can't be blank", message, this.errors);
    }
    return this
  };

  this.numericality = function(data, message, field){
    if (isNaN(parseFloat(data)) && !isFinite(data)){
      setFieldErrorArray(field, this.errors);
      setErrorMessage(field, "is not a number", message, this.errors);
    } 
    return this
  };

  for (var key in validations) {
    var data = validations[key].data || undefined;
    var obj = validations[key];
    for (var prop in obj) {
      if (prop === "acceptance"){
        this.acceptance(data, obj[prop].message, key);
      }
      if (prop === "format"){
        this.format(data, obj[prop].with, obj[prop].message, key);
      }
      if (prop === "presence"){
        this.presence(data, obj[prop].message, key);
      }
      if (prop === "numericality"){
        this.numericality(data, obj[prop].message, key);
      }
    }
  }

};

module.exports = validates;
