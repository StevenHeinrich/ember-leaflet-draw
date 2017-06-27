import Ember from 'ember';
import BaseLayer from 'ember-leaflet/components/base-layer';

export default BaseLayer.extend({
  enableEditing: false, // Default value

  leafletEvents: [
    L.Draw.Event.CREATED,
    L.Draw.Event.EDITED,
    L.Draw.Event.EDITMOVE,
    L.Draw.Event.EDITRESIZE,
    L.Draw.Event.EDITSTART,
    L.Draw.Event.EDITSTOP,
    L.Draw.Event.EDITVERTEX,
    L.Draw.Event.DELETED,
    L.Draw.Event.DELETESTART,
    L.Draw.Event.DELETESTOP,
    L.Draw.Event.DRAWSTART,
    L.Draw.Event.DRAWSTOP,
    L.Draw.Event.DRAWVERTEX
  ],

  leafletOptions: [
    'draw',
    'enableEditing',
    'position',
    'showDrawingLayer'
  ],

  showDrawingLayer: false, // Default value

  usedLeafletEvents: Ember.computed('leafletEvents', function() {
    return this.get('leafletEvents').filter(eventName => {
      eventName = Ember.String.camelize(eventName.replace(':', ' '));
      const methodName = '_' + eventName;
      const actionName = 'on' + Ember.String.classify(eventName);
      return this.get(methodName) !== undefined || this.get(actionName) !== undefined;
    });
  }),

  addToContainer() {
    if(this._layer) {
      this.get('parentComponent')._layer.addLayer(this._layer);
    }
  },

  createLayer() {
    let drawingLayerGroup;
    if(this.get('showDrawingLayer')) {
      drawingLayerGroup = new this.L.FeatureGroup();
      const map = this.get('parentComponent._layer');
      drawingLayerGroup.addTo(map);
    }
    return drawingLayerGroup;
  },

  didCreateLayer() {
    const map = this.get('parentComponent._layer');
    if(map) {
      let options = this.getProperties('position', 'draw');
      if(!options.position) {
        options.position = 'topleft';
      }
      if(this._layer && this.get('enableEditing')) {
        options.edit = {featureGroup: this._layer};
      }

      // Extend the default draw object with options overrides
      options.draw = Ember.$.extend({}, this.L.drawLocal.draw, options.draw);
      // Add the draw control to the map
      map.addControl(new this.L.Control.Draw(options));

      // If showDrawingLayer, add new feature to the layer
      if(this.get('showDrawingLayer')) {
        map.on(this.L.Draw.Event.CREATED, (e) => {
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
      const map = this.get('parentComponent._layer');
      // Cleanup the Leaflet Draw event names that have colons, ex:'draw:created'
      eventName = Ember.String.camelize(eventName.replace(':', ' '));
      const actionName = 'on' + Ember.String.classify(eventName);
      const methodName = '_' + eventName;
      // Create an event handler that runs the function inside an event loop.
      this._eventHandlers[originalEventName] = function(e) {
        Ember.run(() => {
          // Try to invoke/send an action for this event
          this.invokeAction(actionName, e, this._layer, map);
          // Allow classes to add custom logic on events as well
          if(typeof this[methodName] === 'function') {
            Ember.run(this, this[methodName], e, this._layer, map);
          }
        });
      };

      // The events for Leaflet Draw are on the map object, not the layer
      map.addEventListener(originalEventName, this._eventHandlers[originalEventName], this);
    });
  },

  _removeEventListeners() {
    if(this._eventHandlers) {
      this.get('usedLeafletEvents').forEach(eventName => {
        const map = this.get('parentComponent._layer');
        // The events for Leaflet Draw are on the map object, not the layer
        map.removeEventListener(eventName,
          this._eventHandlers[eventName], this);
        delete this._eventHandlers[eventName];
      });
    }
  }

});
