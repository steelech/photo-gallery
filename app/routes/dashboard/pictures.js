import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model() {
		return this.get("store").findAll("picture");
	},
	actions: {
		finishUpload() {
			window.location.reload();
			this.transitionTo("dashboard.pictures.index");
		},
		reloadAlbums() {
			console.log("reloading albums");
			window.location.reload();
		},
	}
});
