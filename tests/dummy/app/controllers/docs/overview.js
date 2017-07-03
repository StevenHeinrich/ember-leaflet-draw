import Ember from 'ember';
/* global L */

export default Ember.Controller.extend({
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
  }
});
