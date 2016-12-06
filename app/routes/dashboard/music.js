import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model() {
		var song1 = this.get("store").createRecord("song", {
			name: "song 1"
		});
		var song2 = this.get("store").createRecord("song", {
			name: "song2"
		});
		var song3 = this.get("store").createRecord("song", {
			name: "song3"
		});
		return Ember.A([song1, song2, song3]);
	},
	actions: {
	}
});
