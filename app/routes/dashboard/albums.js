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
		var album4 = this.get("store").createRecord("album", {
			name: "fourth album"
		});
		var album5 = this.get("store").createRecord("album", {
			name: "fifth album"
		});
		var album6 = this.get("store").createRecord("album", {
			name: "sixth album"
		});
		var first_three = Ember.A([album1, album2, album3]);
		var second_three = Ember.A([album4, album5, album6]);
		return Ember.A([first_three, second_three]);
	},
	actions: {
	}
});
