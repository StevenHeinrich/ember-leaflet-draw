import Ember from 'ember';
/* global L */

export default Ember.Controller.extend({
  lat: 38,
  lng: -77,
  zoom: 8,
  drawConfig: {
    circle: {
      shapeOptions: {
        color: '#1EB300'
      }
    },
    marker: {
      icon: new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    },
    polygon: {
      allowIntersection: false, // Restricts shapes to simple polygons
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
