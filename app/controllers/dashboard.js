import Ember from 'ember';

export default Ember.Controller.extend({
	startRoute: '',
	tab: '',
	session: Ember.inject.service(),
	actions: {
		logout() {
			this.get("session").invalidate();
		},
	},
});
