import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	session: Ember.inject.service("session"),
	model() {
		return this.store.findAll('code');
	},
	actions: {
		logout() {
			this.get("session").invalidate();
		}
	}
});
