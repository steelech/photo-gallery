import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Route.extend({
	album: null,
	resetController(controller, isExiting, transition) {
		controller.set("album", null);
	},
	actions: {
	}


})
