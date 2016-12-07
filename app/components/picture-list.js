import Ember from 'ember';

export default Ember.Component.extend({
	didReceiveAttrs() {
		console.log("pictures:", this.get("pictures").content.get(0).record.data);
		console.log("formatted:", this.formatPictures(this.get("pictures")));
		this.set("pictures", this.formatPictures(this.get("pictures")));
	},
	formatPictures(model) {
		var numAlbums = model.content.length;
		var albums = model.content;
		var rows = Math.ceil(numAlbums/3);
		var modelRows = Ember.A([]);
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
		return modelRows;
	}
});
