import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	checked: false,
	classNames: [],
	albumName: '',
	didInsertElement() {
		$('#all-pics-tab').removeClass('active');
		$('#albums-tab').addClass('active')
	},
	actions: {
		addAlbum() {
			var self = this;
			var album = this.get("store").createRecord("album", {
				name: this.get("albumName"),
			});
			album.save().then(function(response) {
				if(self.get('checked')) {
					self.sendAction("addPicsToAlbum", response.data.name);
				} else {
					self.sendAction("addPicsLater");
				}

			});
		}
	}
});
