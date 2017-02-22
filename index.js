/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-leaflet-draw',

  included: function(app) {
    this._super.included.apply(this, arguments);
    
    // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
    // use that.
    if (typeof this._findHost === 'function') {
      app = this._findHost();
    }

    // Otherwise, we'll use this implementation borrowed from the _findHost()
    // method in ember-cli.
    // Keep iterating upward until we don't have a grandparent.
    // Has to do this grandparent check because at some point we hit the project.
    var current = this;
    do {
     app = current.app || app;
    } while (current.parent.parent && (current = current.parent));
    
    var baseDir = app.bowerDirectory + '/leaflet-draw/dist/';

    app.import(baseDir + 'leaflet.draw.js');
    app.import(baseDir + 'leaflet.draw.css');

    var imagesDestDir = '/assets/images';
    app.import(baseDir + 'images/spritesheet-2x.png', { destDir: imagesDestDir });
    app.import(baseDir + 'images/spritesheet.png', { destDir: imagesDestDir });
    app.import(baseDir + 'images/spritesheet.svg', { destDir: imagesDestDir });
  }
};
