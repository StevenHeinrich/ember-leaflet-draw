import Ember from 'ember';
/* global L */

export default Ember.Controller.extend({
  lat: 38,
  lng: -77,
  zoom: 8,
  latestFeature: {},
  latestFeatureStringified: Ember.computed('latestFeature', function() {
    return JSON.stringify(this.get('latestFeature'), null, 2);
  }),
  allFeatures: {},
  allFeaturesStringified: Ember.computed('allFeatures', function() {
    return JSON.stringify(this.get('allFeatures'), null, 2);
  }),
  editedFeatures: {},
  editedFeaturesStringified: Ember.computed('editedFeatures', function() {
    return JSON.stringify(this.get('editedFeatures'), null, 2);
  }),
  drawConfig: {
    circle: {
      shapeOptions: {
        color: '#1EB300'
      }
    },
    marker: {
      icon: new L.Icon({
        iconUrl: 'assets/images/map-markers/marker-icon-2x-green.png',
        shadowUrl: 'assets/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    },
    polygon: {
      allowIntersection: true, // Restricts shapes to simple polygons
      drawError: {
        color: 'red', // Color the shape will turn when intersects
        message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
      },
      shapeOptions: {
        color: '#1EB300'
      }
    },
    polyline: {
      shapeOptions: {
        color: '#1EB300'
      }
    },
    rectangle: {
      shapeOptions: {
        color: '#1EB300'
      }
    },
  },
  // editConfig: {
  //   edit: false,
  //   remove: false
  // },
  actions: {
    updateDrawnFeature(feature, drawingLayerGroup, map) {
      let latestFeature = feature.layer.toGeoJSON();
      this.set('latestFeature', latestFeature);

      // Run Later (like timeout) to stall, due to listening to the same event that adds the feature (technially a layer) to the LayerGroup.
      // If you access the 2nd arguement `drawingLayerGroup` without waiting, its highly likely that the new feature will be missing from the LayerGroup (hasn't been added yet).
      // Ember.run.later is not needed to work with the returned `feature` right away.
      Ember.run.later((() => {
        let allFeatures = drawingLayerGroup.toGeoJSON();
        this.set('allFeatures', allFeatures);
      }), 0);

      // In case you need access to the map object, it is passed in as the third argument.
      // This could be used to change the zoom based on your newly created feature, example follows.
      let zoom = map.getZoom() + 1; // Zoom in one level
      let latlng;
      if(feature.layerType === 'marker') {
        latlng = feature.layer.getLatLng();
      } else {
        latlng = feature.layer.getBounds().getCenter();
      }
      map.setView(latlng, zoom);
    },
    updateEditedFeatures(features, drawingLayerGroup) {
      // onDrawEdited event returns a LayerGroup, a list of all layers just edited on the map.
      // It corresponds to the event `draw.edited` in the underlying Leaflet.Draw library
      // https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event-event
      let editedFeatures = features.layers.toGeoJSON();
      this.set('editedFeatures', editedFeatures);

      // Update the allFeature collection to include the edits that were just finished
      Ember.run.later((() => {
        let allFeatures = drawingLayerGroup.toGeoJSON();
        this.set('allFeatures', allFeatures);
      }), 0);
    }
  }
});
