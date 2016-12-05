import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['dashboard-content-container'],
	tab: '',
	listName: Ember.computed("tab", {
		get() {
			if(this.get("tab") == "albums") {
				return 'album-list';
			} else {
				return 'song-list';
			}
		}
	}),
	actions: {
		changeTab(tab) {
			this.set("tab", tab);
		}
	}
});
