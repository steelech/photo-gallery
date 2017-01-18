import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	checked: false,
	classNames: [],
	albumName: '',
	watchCheckbox: function() {
		console.log("checked changed");
	}.observes('checked'),
	actions: {
		addAlbum() {
			var self = this;
			console.log("adding album!");
			var album = this.get("store").createRecord("album", {
				name: self.get("albumName"),
			});
			album.save().then(function(response) {
				console.log("response:");
				if(self.get('checked')) {
					//self.sendAction("addPicsToAlbum", .name);
					console.log("response:", response);
				} else {
					self.sendAction("addPicsLater");
				}
			});
		}
	}


});
