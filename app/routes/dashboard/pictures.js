import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin, {
	actions: {
		reloadAlbums() {
			console.log("reloading albums");
			window.location.reload();
		},
		reloadPictures() {
			console.log("reloading pictures");
		}
	}
});
