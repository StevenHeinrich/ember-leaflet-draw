/*jshint node:true*/
'use strict';

module.exports = function(environment) {
  var ENV = {};

  if (environment === 'production') {
    ENV.baseURL = 'ember-leaflet-draw/';
  }

  return ENV;
};
