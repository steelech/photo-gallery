import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
	tab: '',
	listName: Ember.computed("tab", {
		get() {
			if(this.get("tab") == "all") {
				return 'photo-list';
			} else if(this.get("tab") == "albums") {
				return "album-list"
			} else {
				return 'song-list';
			} 
		}
	}),
	actions: {
		logout() {
			this.get("session").invalidate();
		},
		changeTab(tab) {
			this.set("tab", tab);
			console.log("from controller", tab);

		}
	},
});
