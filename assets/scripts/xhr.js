'use strict';

const getFormFields = require('../../lib/get-form-fields');

// jQuery shorthand for $(document).ready
$(() => {
  const baseUrl = 'http://localhost:3000';

  // error handler (to be passed as a callback)
  const onError = (error) => {
    console.error(error);
  };

  // another handler, this time for signUp success
  const onSignUp = (response) => {
    // this is where your signUp-related logic would usually go
    console.log(response);
    console.log('Signed up');
  };

  // another handler, this time for signIn success
  const onSignIn = (response) => {
    console.log(response);
    console.log('Signed in');
  };

  // signUpOrIn will do either a signUp or a signIn, since the two requests only
  // differ by the path (the part of the URL after the /).
  //
  // credentials: an object, possibly created by getFormFields, used for data
  // path: the part of the URL after the / which determines which auth action
  //       to take
  // onFulfilled: success handler
  // onRejected: error handler
  const signUpOrIn = (credentials, path, onFulfilled, onRejected) => {

    // starting a new request object
    let xhr = new XMLHttpRequest();

    // adding a handler for the 'load' --- btw wtf is the 'load' event?
    xhr.addEventListener('load', () => {
      // look at the status code, and if it is successful
      if (xhr.status >= 200 && xhr.status < 300) {
        // fire the handler we passed in for success, and pass it the data!
        // you may want to parse it, if its JSON, you can do that here or in
        // your handler, whereever it makes sense.
        onFulfilled(xhr.response);
      } else {
        // fire the handler for failure, and pass it the entire request object
        onRejected(xhr);
      }
    });
    // this looks like English, finally! this handles any errors that occur
    // before the request is even made
    xhr.addEventListener('error', () => onRejected(xhr));

    // start the request!!
    xhr.open('POST', baseUrl + path);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // oh, wait, don't forget to actually do the request, and send the data.
    xhr.send(JSON.stringify(credentials));
  };

  // define a function which calls signUpOrIn with the appropriate path for
  // signIn
  // this might be related to "partial application", but I'm not a functional
  // programming expert
  const signIn = (credentials, onFulfilled, onRejected) =>
    signUpOrIn(credentials, '/sign-in', onFulfilled, onRejected);

  // same story, just use /sign-up instead
  const signUp = (credentials, onFulfilled, onRejected) =>
    signUpOrIn(credentials, '/sign-up', onFulfilled, onRejected);

  const submitHandler = function (event) {
    event.preventDefault();
    let data = getFormFields(event.target);
    // data.credentials.password_confirmation = data.credentials.password;

    // another handler! wat.
    const onSignUpSuccess = function (response) {
      // the original success handler we defined at the top of the file
      onSignUp(response);
      // but we don't just want to console.log the success, we also want to
      // trigger another event. Look, ma, a callback chain!
      signIn(data, onSignIn, onError);
    };

    // look here first, confusing, I know, since it's at the bottom of the
    // function body
    signUp(data, onSignUpSuccess, onError);
  };

  // attach a handler to the `#sign-up` form in the DOM
  $('#sign-up').on('submit', submitHandler);
});
