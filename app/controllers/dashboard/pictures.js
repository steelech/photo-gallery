import Ember from 'ember';

export default Ember.Controller.extend({
	picturesModal: false,
	actions: {
		closePicturesModal() {
			this.set("picturesModal", false);
		},
		openPicturesModal() {
			this.set("picturesModal", true);
		}

	}
});
