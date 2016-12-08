import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		console.log("params:", params);
		return this.get("store").query("picture", {album: params.album_name});
	}
});
