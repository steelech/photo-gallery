import Ember from 'ember';

export default Ember.Component.extend({
	classNames: [],
	albumName: '',
	actions: {
		addAlbum() {
			console.log("albumName:", this.get("albumName"));
		}
	}


});
