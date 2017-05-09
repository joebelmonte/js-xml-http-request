'use strict';

// data serializer, converts form values into a POJO
const getFormFields = require('../../lib/get-form-fields');

// Usage:
//   ajax(<opts>) //=> Promise
//
//   opts (object) is a required argument with required keys `url` and `method`,
//     both of which are strings
//     optional key `data` is an object that describes the data to be sent to
//     the server

const ajax = function (opts) {
  if (!opts.url) {
    throw new Error('url is required');
  }

  const verbs = ['GET', 'POST', 'PATCH', 'DELETE']
  if (!opts.method || verbs.indexOf(opts.method.toUpperCase()) === -1) {
    throw new Error('method is required and is an HTTP VERB');
  }
  opts.method = opts.method.toUpperCase();

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
    xhr.open(opts.method, opts.url);

    if (opts.data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(opts.data));
    } else {
      xhr.send()
    }
  });
};

$(() => {
  ajax({
    url: 'http://httpbin.org/get',
    method: 'GET'
  }).then(console.log);

  ajax({
    url: 'http://httpbin.org/post',
    method: 'POST',
    data: {
      'hello': 'world'
    }
  }).then(console.log);

  ajax({
    url: 'http://httpbin.org/patch',
    method: 'PATCH',
    data: {
      'hello': 'world'
    }
  }).then(console.log);

  ajax({
    url: 'http://httpbin.org/delete',
    method: 'DELETE',
    data: {
      'hello': 'world'
    }
  }).then(console.log);
});
