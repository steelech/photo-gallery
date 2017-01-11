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
			var album = this.get("store").createRecord("album", {
				name: this.get("albumName"),
			});
			album.save().then(function(response) {
				console.log("response:", response);
			});
			if(this.get('checked')) {
				this.sendAction("addPicsToAlbum", album.name);
			} else {
				this.sendAction("addPicsLater");
			}
		}
	}


});
