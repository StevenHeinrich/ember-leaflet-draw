import Ember from 'ember';

export default Ember.Controller.extend({
  lat: 38,
  lng: -77,
  zoom: 8,
  drawConfig: {polygon: null},
  restaurants: Ember.A([
    {
      name: 'Sinju Restaurant',
      rating: 4,
      lat: 38,
      lng: -78.5
    },
    {
      name: 'Burgerville',
      rating: 3.8,
      lat: 37,
      lng: -78
    },
    {
      name: 'Le Pigeon',
      rating: 4.5,
      lat: 37,
      lng: -79
    },
  ]),
  actions: {
    drawFinished(event) {
      console.log('finsihed', event);
    },
    editStarted(event) {
      console.log('edit started', event);
    }
  }
});
