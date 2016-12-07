import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model() {
		var promise = this.get("store").query("album", {});
		return promise;
	},
	setupController(controller, model) {
		console.log("setting up the controller");
		model.content.forEach(function(album) {
			console.log("each: ", album.record.data);
		});
		var numAlbums = model.content.length;
		var albums = model.content;
		var rows = Math.ceil(numAlbums/3);
		var modelRows = Ember.A([]);
		// loop through each row, add 4 albums
		// stop when count == model.content.length
		var count = 0;
		for(var i = 0;i < rows;i++) {
			var row = Ember.A([]);
			for(var j = 0;j < 3;j++) {
				if(count < numAlbums) {
					var album = {
						name: albums.get(count).record.data.name
					}
					row.push(album);
				}
				count +=1;
			}
			modelRows.push(row);
		}
		controller.set("modelRows", modelRows);
		controller.set("model", model);
	}
});
