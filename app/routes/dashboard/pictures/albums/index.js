import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.get("store").findAll("album");
	},
	afterModel(model) {
		console.log("model:", model.content);
	}
});
