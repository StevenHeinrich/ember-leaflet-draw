/*jshint node:true*/
'use strict';

module.exports = function(environment) {
  var ENV = {
    rootURL: '/',
  };

  if (environment === 'production') {
    ENV.rootURL = 'ember-leaflet-draw/';
  }

  return ENV;
};
