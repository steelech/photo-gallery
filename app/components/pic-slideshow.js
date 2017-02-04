import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['slideshow-component'],
	album: null,
	pics: null,
	currentPic: null,
	currentPicIndex: null,
	numbPics: null,
	init() {
		this._super(...arguments);
		this.set("numbPics", this.get("pics").toArray().length)
		this.set("currentPicIndex", this.findCurrentIndex())
		console.log("currentPicIndex: ", this.findCurrentIndex())
	},
	actions: {
		nextPic() {
			console.log("next pic")
			if(this.get("currentPicIndex") + 1 == this.get("pics").toArray().length) {
				this.set("currentPicIndex", 0)
				this.set("currentPic", this.get("pics").toArray()[0].data)

			} else {
			}
		},
		prevPic() {
			console.log("prev pic")
		},
		downloadPic() {
			console.log("downloading pic")
		},
		deletePic() {
			console.log("deleting pic")
		}

	},
	findCurrentIndex() {
		var picsArray = this.get("pics").toArray()
		var length = picsArray.length

		for(var i = 0;i < length;i++) {
			var picData = picsArray[i].data
			var currentPic = this.get("currentPic")
			console.log("targetPic: ", picData)
			console.log("other pic: ", currentPic)
			if(picData.key === currentPic.key) {
				return i + 1;
			}
		}
	}
});
