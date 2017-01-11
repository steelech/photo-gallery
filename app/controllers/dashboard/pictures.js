import Ember from 'ember';
const {
	getOwner
} = Ember;

export default Ember.Controller.extend({
	picturesModal: false,
	albumsModal: false,
	actions: {
		addPicsToAlbum(album) {
			this.set("albumsModal", false);
			this.set("picturesModal", true);
		},
		addPicsLater() {
			//window.location.reload();
		},
		closeAlbumsModal() {
			this.transitionToRoute()
		},
		openAlbumsModal() {
			this.transitionToRoute("dashboard.pictures.albums.new");
			$('#all-pics-tab').removeClass('active');
			$('#albums-tab').addClass('active');
		},
		closePicturesModal() {
			this.set("picturesModal", false);
		},
		openPicturesModal() {

			console.log(getOwner(this).lookup('controller:application').currentPath);
			this.transitionToRoute("dashboard.pictures.new");
			$('#all-pics-tab').addClass('active');
			$('#albums-tab').removeClass('active');
		}

	}
});
