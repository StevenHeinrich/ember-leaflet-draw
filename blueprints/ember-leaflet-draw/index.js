/*jshint node:true*/
module.exports = {
  description: 'add leaflet-draw assets, using npm',

  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function() {
    return this.addPackageToProject('leaflet-draw', '~0.6.0');
  }
};
