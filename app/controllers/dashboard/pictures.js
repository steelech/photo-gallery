import Ember from 'ember';

export default Ember.Controller.extend({
	picturesModal: false,
	albumsModal: false,
	actions: {
		addPicsToAlbum(album) {
			this.set("albumsModal", false);
			this.set("picturesModal", true);
		},
		addPicsLater() {
			window.location.reload();
		},
		closeAlbumsModal() {
			this.set("albumsModal", false);
		},
		openAlbumsModal() {
			this.set("albumsModal", true);
		},
		closePicturesModal() {
			this.set("picturesModal", false);
		},
		openPicturesModal() {
			this.set("picturesModal", true);
		}

	}
});
