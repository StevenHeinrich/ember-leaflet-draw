import Ember from 'ember';
// TODO: Determine what is really needed from BaseLayer and create a new starting point, BaseControl (right now, this is just piggybacking off BaseLayer)
import BaseLayer from 'ember-leaflet/components/base-layer';

export default BaseLayer.extend({

  enableEditing: true, // Default value

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
    'draw',
    'enableEditing',
    'position',
    'showDrawingLayer'
  ],

  showDrawingLayer: true, // Default value

  usedLeafletEvents: Ember.computed('leafletEvents', function() {
    return this.get('leafletEvents').filter(eventName => {
      eventName = Ember.String.camelize(eventName.replace(':', ' '));
      const methodName = '_' + eventName;
      const actionName = 'on' + Ember.String.classify(eventName);
      return this.get(methodName) !== undefined || this.get(actionName) !== undefined;
    });
  }),

  createLayer() {
    const drawingLayerGroup = new this.L.FeatureGroup();
    if(this.get('showDrawingLayer')) {
      const map = this.get('parentComponent._layer');
      drawingLayerGroup.addTo(map);
    }
    return drawingLayerGroup;
  },

  didInsertParent() {
    this._layer = this.createLayer();
    this._addObservers();
    this._addEventListeners();

    const map = this.get('parentComponent._layer');
    if(map) {
      let options = this.getProperties('position', 'draw');
      if(!options.position) {
        options.position = 'topleft';
      }
      if(this.get('enableEditing')) {
        options.edit = {featureGroup: this._layer};
      }

      // Extend the default draw object with options overrides
      options.draw = Ember.$.extend({}, this.L.drawLocal.draw, options.draw);
      // Add the draw control to the map
      map.addControl(new this.L.Control.Draw(options));

      // If showDrawingLayer, add new feature to the layer
      if(this.get('showDrawingLayer')) {
        map.on('draw:created', (e) => {
          const layer = e.layer;
          this._layer.addLayer(layer);
        });
      }
    }
  },

  _addEventListeners() {
    this._eventHandlers = {};
    this.get('usedLeafletEvents').forEach(eventName => {
      const originalEventName = eventName;
      // Cleanup the Leaflet Draw event names that have colons, ex:'draw:created'
      eventName = Ember.String.camelize(eventName.replace(':', ' '));
      const actionName = 'on' + Ember.String.classify(eventName);
      const methodName = '_' + eventName;
      // Create an event handler that runs the function inside an event loop.
      this._eventHandlers[originalEventName] = function(e) {
        Ember.run(() => {
          // Try to invoke/send an action for this event
          this.invokeAction(actionName, e);
          // Allow classes to add custom logic on events as well
          if(typeof this[methodName] === 'function') {
            Ember.run(this, this[methodName], e);
          }
        });
      };

      const map = this.get('parentComponent._layer');
      // The events for Leaflet Draw are on the map object, not the layer
      map.addEventListener(originalEventName, this._eventHandlers[originalEventName], this);
    });
  }

});
