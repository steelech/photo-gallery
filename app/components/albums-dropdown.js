import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['albums-dropdown'],
	store: Ember.inject.service(),
	contents: null,
	album: '',
	disabled: false,
	placeholder: '',
	albumSelection: null,
	init() {
		var self = this;
		this._super(...arguments);
		if(this.get("album")) {
			this.set("placeholder", this.get("album"));
		} else {
			this.set("placeholder", "Album");
		}
		this.get("store").findAll('album').then(function(albums) {
			var album_names = albums.content.map(function(album) {
				return album._data.name
			});
			self.set("contents", album_names);
		})
	},
	actions: {
		selectAlbum(selection) {
			this.set("album", selection);
			this.sendAction("selectAlbum", selection);

		}
	}
});
