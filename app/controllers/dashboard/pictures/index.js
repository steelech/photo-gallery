import Ember from 'ember';

export default Ember.Controller.extend({
	slideshowMode: false,
	pics: null,
	selectedPic: null,
	actions: {
		openSlideshow(pic) {
			this.set("slideshowMode", true);
			this.set("pics", this.get("model"))
			this.set("selectedPic", pic)

			console.log("model: ", this.get("model"))
		},
		closeSlideshow() {
			this.set("slideshowMode", false);
		}
	}
});
