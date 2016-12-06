import Ember from 'ember';

export default Ember.Controller.extend({
	startRoute: '',
	tab: '',
	session: Ember.inject.service(),
	actions: {
		changeTab(tab) {
			this.set("tab", tab);
			this.transitionToRoute("/" + tab);
		},
		logout() {
			this.get("session").invalidate();
		},
	},
});
