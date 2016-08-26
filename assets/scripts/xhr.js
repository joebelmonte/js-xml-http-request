'use strict';

const getFormFields = require('../../lib/get-form-fields');

$(() => {
  const baseUrl = 'http://localhost:3000';

  const onError = (error) => {
    console.error(error);
  };

  const onSignUp = (response) => {
    console.log(response);
    console.log('Signed up');
  };

  const onSignIn = (response) => {
    console.log(response);
    console.log('Signed in');
  };

  const signUpOrIn = (credentials, path, onFulfilled, onRejected) => {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onFulfilled(xhr.response);
      } else {
        onRejected(xhr);
      }
    });
    xhr.addEventListener('error', () => onRejected(xhr));
    xhr.open('POST', baseUrl + path);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(credentials));
  };

  const signIn = (credentials, onFulfilled, onRejected) =>
    signUpOrIn(credentials, '/sign-in', onFulfilled, onRejected);

  const signUp = (credentials, onFulfilled, onRejected) =>
    signUpOrIn(credentials, '/sign-up', onFulfilled, onRejected);

  $('#sign-up').on('submit', function submitHandler(e) {
    e.preventDefault(); // prevet default submit action
    let formData = getFormFields(this); // get data from form

    const onSignUpSuccess = function (response) {
      onSignUp(response);
      signIn(formData, onSignIn, onError);
    };

    signUp(formData, onSignUpSuccess, onError);
  });
});
