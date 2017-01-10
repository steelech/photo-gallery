import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	classNames: [],
	albumName: '',
	actions: {
		addAlbum() {
			var album = this.get("store").createRecord("album", {
				name: this.get("albumName"),
			});
			album.save();
		}
	}


});
