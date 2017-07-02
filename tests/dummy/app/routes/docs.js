import Ember from 'ember';

export default Ember.Route.extend({
  redirect(model, transition) {
    if(transition.targetName === 'docs') {
      this.transitionTo('docs.overview');
    }
  }
});
