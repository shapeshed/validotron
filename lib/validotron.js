
var validates = function (validations){

  this.errors = {};

  var setFieldErrorArray = function(field, errors){
    if (errors[field] === undefined) {
      errors[field] = [];
    }
    return;
  }
  
  var setErrorMessage = function(field, defaultMessage, customMessage, errors){
    setFieldErrorArray(field, errors);
    var message = (customMessage) ? customMessage : defaultMessage;
    errors[field].push(message)
    return;
  }

  var isNumber = function(n) {
    return (!isNaN(parseFloat(n)) && isFinite(n))
  }

  var isInt = function isInt(n) {
    return n % 1 === 0;
  }

  var isGreaterThan = function(n, x){
    return (isNumber(n) && (n > x));
  }

  var isGreaterThanOrEqualTo = function(n, x){
    return (isNumber(n) && (n >= x));
  }

  var isEqualTo = function(n, x){
    return (isNumber(n) && (n == x));
  }

  var isLessThan = function(n, x){
    return (isNumber(n) && (n < x));
  }

  var isLessThanOrEqualTo = function(n, x){
    return (isNumber(n) && (n <= x));
  }

  var isOdd = function(n){
    return (isNumber(n) && (n % 2 == 1));
  }

  var isEven = function(n){
    return (isNumber(n) && (n % 2 == 0));
  }

  var allowBlank  = function(data, validations) {
    if (validations.hasOwnProperty('allow_blank')) {
      if (validations.allow_blank && data === "") {
        return true; 
      }
    }
    return false;
  }

  var setMessage = function(obj) {
    return (obj.hasOwnProperty('message')) ? obj.message : undefined;
  }

  this.acceptance = function(data, validations, field){
    data = data || "";
    if (allowBlank(data, validations)) {
      return this;
    };
    var accept = (validations.hasOwnProperty('accept')) ? validations.accept : 1;
    if (data != accept) {
      setErrorMessage(field, "must be accepted", setMessage(validations), this.errors);
    }
    return this;
  }

  this.exclusion = function(data, validations, field){
    data = data || "";
    if (allowBlank(data, validations)) {
      return this;
    };
    if (validations.in.indexOf(data) !== -1) {
      setErrorMessage(field, "is reserved", setMessage(validations), this.errors);
    }
    return this
  }

  this.format = function(data, validations, field){
    data = data || "";
    if (allowBlank(data, validations)) {
      return this;
    };
    var regex = new RegExp(validations.with);
    if (!regex.test(data)) {
      setErrorMessage(field, "is invalid", setMessage(validations), this.errors);
    }
    return this
  }

  this.inclusion = function(data, validations, field){
    data = data || "";
    if (allowBlank(data, validations)) {
      return this;
    };
    if (validations.in.indexOf(data) === -1) {
      setErrorMessage(field, "is not included in the list", setMessage(validations), this.errors);
    }
    return this
  }

  this.length = function(data, validations, field){
    data = data || "";
    if (allowBlank(data, validations)) {
      return this;
    };
    if (validations.hasOwnProperty('minimum') && !isGreaterThanOrEqualTo(data.length, validations.minimum)){
      setErrorMessage(field, "is too short (min is " + validations.minimum + " characters)", setMessage(validations), this.errors);
    } 
    if (validations.hasOwnProperty('maximum') && !isLessThanOrEqualTo(data.length, validations.maximum)){
      setErrorMessage(field, "is too long (max is " + validations.maximum + " characters)", setMessage(validations), this.errors);
    } 
    if (validations.hasOwnProperty('is') && !isEqualTo(data.length, validations.is)){
      setErrorMessage(field, "is the wrong length (should be " + validations.is + " characters)", setMessage(validations), this.errors);
    } 
    return this
  };

  this.numericality = function(data, validations, field){
    data = data || "";
    if (allowBlank(data, validations)) {
      return this;
    };
    if (validations.hasOwnProperty('greater_than') && !isGreaterThan(data, validations.greater_than)){
      setErrorMessage(field, "must be greater than " + validations.greater_than, setMessage(validations), this.errors);
    } 
    if (validations.hasOwnProperty('greater_than_or_equal_to') && !isGreaterThanOrEqualTo(data, validations.greater_than_or_equal_to)){
      setErrorMessage(field, "must be greater than or equal to " + validations.greater_than_or_equal_to, setMessage(validations), this.errors);
    } 
    if (validations.hasOwnProperty('equal_to') && !isEqualTo(data, validations.equal_to)){
      setErrorMessage(field, "must be equal to " + validations.equal_to, setMessage(validations), this.errors);
    } 
    if (validations.hasOwnProperty('less_than') && !isLessThan(data, validations.less_than)){
      setErrorMessage(field, "must be less than " + validations.less_than, setMessage(validations), this.errors);
    } 
    if (validations.hasOwnProperty('less_than_or_equal_to') && !isLessThanOrEqualTo(data, validations.less_than_or_equal_to)){
      setErrorMessage(field, "must be less than or equal to " + validations.less_than_or_equal_to, setMessage(validations), this.errors);
    } 
    if (validations.hasOwnProperty('odd') && !isOdd(data)){
      setErrorMessage(field, "must be odd", setMessage(validations), this.errors);
    } 
    if (validations.hasOwnProperty('even') && !isEven(data)){
      setErrorMessage(field, "must be even", setMessage(validations), this.errors);
    } 
    if (validations.hasOwnProperty('only_integer') && !isInt(data)){
      setErrorMessage(field, "is not a number", setMessage(validations), this.errors);
    } else if (!isNumber(data)){
      setErrorMessage(field, "is not a number", setMessage(validations), this.errors);
    } 
    return this
  };

  this.presence = function(data, validations, field) {
    if (data === undefined) {
      setErrorMessage(field, "can't be blank", setMessage(validations), this.errors);
    }
    return this
  };

  for (var key in validations) {
    var data = validations[key].data || undefined;
    var obj = validations[key];
    for (var prop in obj) {
      if (prop === "acceptance"){
        this.acceptance(data, obj[prop], key);
      }
      if (prop === "exclusion"){
        this.exclusion(data, obj[prop], key);
      }
      if (prop === "format"){
        this.format(data, obj[prop], key);
      }
      if (prop === "inclusion"){
        this.inclusion(data, obj[prop], key);
      }
      if (prop === "length"){
        this.length(data, obj[prop], key);
      }
      if (prop === "presence"){
        this.presence(data, obj[prop], key);
      }
      if (prop === "numericality"){
        this.numericality(data, obj[prop], key);
      }
    }
  }

};

module.exports = validates;
