import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		addPicsToAlbum(albumName) {
			this.transitionToRoute("dashboard.pictures.new", { queryParams: { album: albumName } })
		},
		addPicsLater() {
			this.transitionToRoute("dashboard.pictures.albums.index");
		}
	}

});
