/* jshint node: true */
'use strict';

const path = require('path');

module.exports = {
  name: 'ember-leaflet-draw',

  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import(path.join(app.bowerDirectory, 'leaflet-draw', 'dist', 'leaflet.draw.js'));
    app.import(path.join(app.bowerDirectory, 'leaflet-draw', 'dist', 'leaflet.draw.css'));

    var imagesDestDir = '/assets/images';
    app.import(path.join(app.bowerDirectory, 'leaflet-draw', 'dist', 'images/spritesheet-2x.png'), { destDir: imagesDestDir });
    app.import(path.join(app.bowerDirectory, 'leaflet-draw', 'dist', 'images/spritesheet.png'), { destDir: imagesDestDir });
    app.import(path.join(app.bowerDirectory, 'leaflet-draw', 'dist', 'images/spritesheet.svg'), { destDir: imagesDestDir });
  }
};
