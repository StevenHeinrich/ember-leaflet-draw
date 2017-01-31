// TODO: determine what is really needed from BaseLayer and create a new starting point, BaseControl (right now, this is just piggybacking off BaseLayer)
import BaseLayer from 'ember-leaflet/components/base-layer';

export default BaseLayer.extend({
  leafletEvents: [
    'draw:created',
    'draw:edited',
    'draw:editmove',
    'draw:editresize ',
    'draw:editstart',
    'draw:editstop',
    'draw:editvertex',
    'draw:deleted',
    'draw:deletestart',
    'draw:deletestop ',
    'draw:drawstart',
    'draw:drawstop ',
    'draw:drawvertex '
  ],

  leafletOptions: [
    'edit',
    'draw',
    'position'
  ],

  createLayer() {}, // Must override createLayer if extending BaseLayer

  didInsertParent() {
    this._layer = this.createLayer();
    this._addObservers();
    this._addEventListeners();

    let map = this.get('parentComponent._layer');

    if(map) {
      console.log('map', map);
      let options = this.getProperties('position', 'draw', 'edit');
      if(!options.position) {
        options.position = 'topleft';
      }
      if(!options.draw) {
        options.draw = L.drawLocal.draw;
      }
      map.addControl(new this.L.Control.Draw(options));
    }
  }
});
