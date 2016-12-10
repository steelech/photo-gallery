import Ember from 'ember';

export default Ember.Component.extend({
	classNames: [''],
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
