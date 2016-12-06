import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend({
	model() {
		var album1 = this.get("store").createRecord("album", {
			name: "first album"
		});
		var album2 = this.get("store").createRecord("album", {
			name: "second album"
		});
		var album3 = this.get("store").createRecord("album", {
			name: "third album"
		});
		return Ember.A([album1, album2, album3]);
	},
	actions: {
	}
});
