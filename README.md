# Validotron

[![Build Status](https://secure.travis-ci.org/shapeshed/validotron.png)](http://travis-ci.org/shapeshed/validotron)

Validotron is a partial JavaScript port of Ruby's [ActiveModel::Validations::ClassMethods][1]. It allows data to be validated against a series of constraints.

## Installation

    npm install validotron

## Usage

### acceptance

Validates that a checkbox on the user interface was checked when a form was submitted. This is typically used when the user needs to agree to your application’s terms of service, confirm reading some text, or any similar concept. 

    var someData =  "0";
    var validation = new validotron({ 
      terms: { 
        data: someData, 
        acceptance: true
      }, 
    });

The default error message for this helper is "must be accepted".

It can receive an `accept:` option, which determines the value that will be considered acceptance. It defaults to "1" and can be easily changed.

    var someData =  "0";
    var validation = new validotron({ 
      terms: { 
        data: someData, 
        acceptance: {
          accept: 'yes'
        }
      }, 
    });

### exclusion

This helper validates that a value is not included in a given array. 

    var someData = 'www';
    var validation = new validotron({ 
      name: { 
        data: someData, 
        exclusion: {
          in: ['www', 'us', 'ca', 'jp']
        }
      }
    });

The exclusion helper has an option :in that receives the set of values that will not be accepted for the validated attributes. 

The default error message for this helper is "is reserved".

### format

This helper validates a value by testing whether it matches a given regular expression, which is specified using the `with:` option

    var someData =  "&^%$£";
    var validation = new validotron({ 
      name: { 
        data: someData, 
        format: {
          with: "[A-Z]"
        } 
      }
    });

The default error message is "is invalid".



### inclusion

This helper validates that the value is included in a given array. 

    var someData =  "huge";
    var validation = new validotron({ 
      name: { 
        data: someData, 
        inclusion: {
          in: ['small', 'medium', 'large']
        } 
      }
    });

The inclusion helper has an option :in that receives the set of values that will be accepted. 

The default error message for this helper is "is not included in the list".

### length

This helper validates the length of a value. It provides a variety of options, so you can specify length constraints in different ways:

    var someData =  "foobar";
    var validation = new validotron({ 
      terms: { 
        data: someData, 
        length: {
          miniumum: '2'
        }
      }, 
    });

    var someData =  "foobar";
    var validation = new validotron({ 
      terms: { 
        data: someData, 
        length: {
          maximum: '500'
        }
      }, 
    });

    var someData =  "foobar";
    var validation = new validotron({ 
      terms: { 
        data: someData, 
        length: {
          is: 6
        }
      }, 
    });

The possible length constraint options are:

* `minimum:` – The value cannot have less than the specified length.
* `maximum:` – The value cannot have more than the specified length.
* `is:` – The value length must be equal to the given value.

## numericality

This helper validates that a value has only numeric values. By default, it will match an optional sign followed by an integral or floating point number. To specify that only integral numbers are allowed set `only_integer:` to true.

    var someData =  "1234";
    var points = new validotron({ 
      name: { 
        data: someData, 
        numericality: true
      }
    });

    var someData =  "1234";
    var points = new validotron({ 
      name: { 
        data: "123.234", 
        numericality: {
          only_integer: true
        }
      }
    });

* `greater_than:` – Specifies the value must be greater than the supplied value. The default error message for this option is "must be greater than #{count}".
* `greater_than_or_equal_to:` – Specifies the value must be greater than or equal to the supplied value. The default error message for this option is "must be greater than or equal to %{count}".
* `equal_to:` – Specifies the value must be equal to the supplied value. The default error message for this option is "must be equal to %{count}".
* `less_than:` – Specifies the value must be less than the supplied value. The default error message for this option is "must be less than %{count}".
* `less_than_or_equal_to:` – Specifies the value must be less than or equal the supplied value. The default error message for this option is "must be less than or equal to %{count}".
* `odd:` – Specifies the value must be an odd number if set to true. The default error message for this option is "must be odd".
* `even:` – Specifies the value must be an even number if set to true. The default error message for this option is "must be even".

The default error message is "is not a number".

### presence

This helper validates that the specified attributes are not empty. It uses the blank? method to check if the value is either nil or a blank string, that is, a string that is either empty or consists of whitespace.

    var validation = new validotron({ 
      name: { 
        data: undefined, 
        presence: true, 
      }
    });

The default error message is "can't be empty".

## Common Validation Options

### allow_blank:

This option will let validation pass if the value is blank, like nil or an empty string for example.

    var validation = new validotron({ 
      title: { 
        data: "", 
        length: {
          is: 5,
          allow_blank: true
        }, 
      }
    });

allow_blank: is ignored by the presence validator.

### message:

As you've already seen, the `message:` option lets you specify the message that will be added to the errors collection when validation fails. When this option is not used, Validotron will use the respective default error message for each validation helper.  

## Working with Validation Errors

### errors

Returns an object containing all errors. Each key is the attribute name and the value is an array of strings with all errors.

    var validation = new validotron({ 
      name: { 
        data: undefined, 
        presence: true, 
        length: {
          minimum: 3
        }
      }
    });

    console.log(validation.errors);
    { name: ["can't be blank", "is too short (minimum is 3 characters)"] }

### errors[]

errors[] is used when you want to check the error messages for a specific attribute. It returns an array of strings with all error messages for the given attribute, each string with one error message. If there are no errors related to the attribute, it returns an empty array.

[1]: http://api.rubyonrails.org/classes/ActiveModel/Validations/ClassMethods.html
