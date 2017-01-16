import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		addPicsToAlbum() {
			this.transitionToRoute("dashboard.pictures.new", { queryParams: { album: "myAlbum" } })
		},
		addPicsLater() {
			this.transitionToRoute("dashboard.pictures.albums.index");
		}
	}

});
