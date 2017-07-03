/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    fingerprint: {
      exclude: [
        // You should already have these from using Ember-Leaflet (Leaflet)
        'images/layers-2x.png',
        'images/layers.png',
        'images/marker-icon-2x.png',
        'images/marker-icon.png',
        'images/marker-shadow.png',
        // These are additional images used by Ember-Leaflet-Draw (Leaflet.draw)
        'images/spritesheet-2x.png',
        'images/spritesheet.png',
        'images/spritesheet.svg'
      ]
    }
  });

  return app.toTree();
};
