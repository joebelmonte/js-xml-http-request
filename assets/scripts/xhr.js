'use strict';

const getFormFields = require('../../lib/get-form-fields');

$(() => {
  const baseUrl = 'http://localhost:4741';

  // onError will fire after some sort of error event, and is a callback that
  // we may re-use.
  const onError = (error) => {
    console.error(error);
  };

  // this is where we handle what happens in our app when a user is able to
  // sign-up
  const onSignUp = (response) => {
    // not doing anything special
    console.log(response);
    // logging which action was fired so that we can see the order of events
    // occuring in the web console
    console.log('Signed up');
  };

  // this is where we handle what happens in our app when a user is able to
  // sign-in
  const onSignIn = (response) => {
    // not doing anything special
    console.log(response);
    // logging which action was fired so that we can see the order of events
    // occuring in the web console
    console.log('Signed in');
  };

  // as we're about to see, if we had two separate functions, we'd have to write
  // a lot of boilerplate code, just to fire a network request.
  //
  // we know from using $.ajax that the only things that change from request to
  // request are: the URL, the VERB, and occasionally whether or not DATA is
  // sent
  //
  // not so with XHR. what is XHR? XML HTTP Request. It's a browser technology
  // that's been around almost as long as the web, and it is the entire basis
  // for the programming technique AJAX
  //
  const signUpOrIn = (credentials, path, onFulfilled, onRejected) => {
    // start the asynchronous request by creating a new instance of the
    // XMLHttpRequest type
    //
    // if you would like to know more about XMLHttpRequest, see the MDN
    // documentation. Many of the things we do below are referenced from the
    // docs
    //
    let xhr = new XMLHttpRequest();

    // register a handler to fire when the response is received
    xhr.addEventListener('load', () => { // "load" fires when response is recv'd
      // did it work? is my status in the 2xx range?
      // is this the only way a request can fail? server-side?
      if (xhr.status >= 200 && xhr.status < 300) {
        onFulfilled(xhr.response); // start callback hell
      } else {
        onRejected(xhr); // deal with server-side errors
      }
    });
    // handle anything other than bad requests, for example, losing network
    // connection mid-flight
    xhr.addEventListener('error', () => onRejected(xhr)); // client-side errors
    // starts sending the request
    xhr.open('POST', baseUrl + path); // HTTP Verb and URL
    // add header
    xhr.setRequestHeader('Content-Type', 'application/json'); // synchronous
    // add body
    xhr.send(JSON.stringify(credentials)); // send the asynchronous
  };

  // uses our higher-order function to delegate or alias the task of
  // sign-in with the appropriate path
  const signIn = (credentials, onFulfilled, onRejected) =>
    signUpOrIn(credentials, '/sign-in', onFulfilled, onRejected);

  // uses our higher-order function to delegate or alias the task of
  // sign-in with the appropriate path
  const signUp = (credentials, onFulfilled, onRejected) =>
    signUpOrIn(credentials, '/sign-up', onFulfilled, onRejected);

  $('#sign-up').on('submit', function (event) {
    event.preventDefault(); // prevet default submit action
    let formData = getFormFields(this); // get data from form

    const onSignUpSuccess = function (response) {
      onSignUp(response);
      signIn(formData, onSignIn, onError);
    };

    signUp(formData, onSignUpSuccess, onError);
  });
});
