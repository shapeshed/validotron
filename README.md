# Validotron

[![Build Status](https://secure.travis-ci.org/shapeshed/validotron.png)](http://travis-ci.org/shapeshed/validotron)

Throw data at validotron and it will tell you if it is valid based on what you specify. Inspired by Rails Validation Helpers. 

## Installation

    npm install validotron

## Usage

    var validotron = require('validotron');

    var validation = new validotron({ 
      name: { 
        data: "%$£@", 
        format: {
          with:"[A-Z]",
          message:"is the wrong format"
        }
      }, 
      size: {
        data: "big",
        numericality: true
      },
      color: {
        data: undefined,
        presence: true
      },
      terms: {
        data: 0,
        acceptance: {
          message: "you must accept to proceed"
        }
      }
    });

    console.log(validation.errors);

    { name: [ 'is the wrong format' ],
      size: [ 'is not a number' ],
      color: [ 'can\'t be blank' ],
      terms: [ 'you must accept to proceed' ] }

You might choose to use it with Objects like this

    var validotron = require('validotron');

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
      terms: [ 'must be accepted' ] }
