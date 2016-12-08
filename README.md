[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# JavaScript XML HTTP Requests

JavaScript XML HTTP Requests (xhr), created using the `XMLHttpRequest`
constructor function, are part of the Web API provided by browsers.  These
objects perform asynchronous network operations (a.k.a. AJAX in jQuery). In
jQuery, `$.ajax` returns something called a "deferred object" that implements
the [Promises/A+](https://promisesaplus.com/) specification.. In this talk,
we'll create a Promise interface for xhr using native promises and native xhr.

## Prerequisites

-   Familiarity with jQuery `$.ajax`.
-   [ga-wdi-boston/node-api-promises](https://github.com/ga-wdi-boston/node-api-promises)

## Objectives

By the end of this, developers should be able to:

-   Organize solutions to evented APIs using callbacks and promises.

## Preparation

1.  [Fork and clone](https://github.com/ga-wdi-boston/meta/wiki/ForkAndClone)
    this repository.
1.  Install dependencies with `npm install`.

## Annotate Along: XML HTTP Requests

We'll use the [library-api](https://github.com/ga-wdi-boston/library-api) we
 used when first learning about `$.ajax` to handle requests.

Let's examine and run the code in `assets/scripts/xhr.js`.

Then let's do the same with `assets/scripts/xhr-promises.js`.

## Lab: Compare XHR with AJAX

List the differences and similarities between `XMLHttpRequest` and
 `jQuery.ajax`.

Could you build a simplified version of `$.ajax` based on the code in
 `assets/scripts/xhr-promises.js`.

## Additional Resources

-   [XMLHttpRequest - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
-   [Deferred Object | jQuery API Documentation](https://api.jquery.com/category/deferred-object/)

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
