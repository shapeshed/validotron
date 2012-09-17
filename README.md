# Validotron

[![Build Status](https://secure.travis-ci.org/shapeshed/validotron.png)](http://travis-ci.org/shapeshed/validotron)

Validator offers Rails-style validations on JavaScript objects or any data you throw at it.

    var validotron = require(validotron);

    function Hat(name, size, colour, terms) {
      this.name = name || undefined;
      this.size = size || undefined;
      this.colour = colour || undefined;
      this.terms = terms || undefined;

      this.validate = function() {
        this.errors = undefined;
        var validation = new validotron({ 
          name: { 
            data: this.name, 
            format: {
              with:"[A-Z]"
            }
          }, 
          size: {
            data: this.size,
            numericality: true
          },
          color: {
            data: this.colour,
            presence: true
          },
          terms: {
            data: this.terms,
            acceptance: true
          }
        });
        this.errors = validation.errors;
      }
    }

    var hatObject = new Hat('*&^%$#', 'big', undefined, '0');
    hatObject.validate();
    hatObject.errors;

    { name: [ 'is invalid' ],
      size: [ 'is not a number' ],
      color: [ 'can\'t be blank' ],
      undefined: [ 'must be accepted' ] }

## Installation

    npm install validotron

## Usage

    var validotron = require('validotron');



































