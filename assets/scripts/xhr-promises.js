'use strict';

const getFormFields = require('../../lib/get-form-fields');

$(() => {
  // // console methods require `this` to be `console`
  // // promise function are called with `this === undefined`
  // let clog = console.log.bind(console);
  // let elog = console.error.bind(console);

  const baseUrl = 'http://localhost:4741/';

  const onError = (error) => {
    console.error(error);
  };

  const onSignIn = (response) => {
    console.log(response);
    console.log('Signed in');
  };

  const onSignUp = (response) => {
    console.log(response);
    console.log('Signed up');
  };

  const signUpOrIn = (credentials, path) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr);
        }
      });
      xhr.addEventListener('error', () => reject(xhr));
      xhr.open('POST', baseUrl + path);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(credentials));
    });
  };

  const signIn = (credentials) => signUpOrIn(credentials, '/sign-in');

  const signUp = (credentials) => signUpOrIn(credentials, '/sign-up');

  $('#sign-up-promise').on('submit', function submitHandler(e) {
    // // console methods require `this` to be `console`
    // // promise function are called with `this === undefined`
    // let clog = console.log.bind(console);
    // let elog = console.error.bind(console);
    e.preventDefault();
    let formData = getFormFields(this);
    signUp(formData)              // returns the response body from signUp
      .then(onSignUp)             // logs response body, returns nothing
      // .then(signIn)
      .then(() => {
        return signIn(formData)   // returns the response body from signIn
      })
      // .then(() => {
      //   return formData;
      // })
      // .then(signIn)
      .then(onSignIn)             // logs response body, returns nothing
      .catch(onError)             // handle errors, I guess
      ;
  });
});
