import Ember from 'ember';

export default Ember.Controller.extend({
	slideshowMode: false,
	pics: null,
	actions: {
		openSlideshow(pic) {
			this.set("slideshowMode", true);
			this.set("pics", pic)
			console.log("opening slideshow in controller");
		},
		closeSlideshow() {
			this.set("slideshowMode", false);
		}
	}
});
