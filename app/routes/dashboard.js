import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	session: Ember.inject.service("session"),
	beforeModel(transition) {
		if(transition.targetName == "dashboard.index") {
			this.transitionTo("dashboard.pictures");
		}
	},
	actions: {
		logout() {
			this.get("session").invalidate();
		}
	}
});
