import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['file-upload'],
	fileList: null,
	actions:{

		uploadFiles() {
			var self = this;
			var accessKey = 'AKIAJUIQFPOP7WDB56TA';
			var secret = '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';
			AWS.config.region = 'us-east-2';
			AWS.config.accessKeyId = accessKey;
			AWS.config.secretAccessKey = secret;
			var bucket = new AWS.S3({
				Bucket: 'pics-and-songs' 
			});
			var length = self.get("fileList").length;
			for(var i = 0;i < length;i++) {
				var params = {
					Bucket: 'pics-and-songs',
					Key: 'folder/photo-gallery' + i,
					ContentType: self.get("fileList")[i].type,
					Body: self.get("fileList")[i],

				};
				bucket.putObject(params, function(err, data) {
					if (err) {
						self.sendAction("closePicturesModal");
						console.log("error:", err);
					} else {
						self.sendAction("closePicturesModal");
						console.log("success");
					}
				});
			}
		}
	}, 	
	addToFileList(files) {
		var fileList = Ember.A([]);
		if(this.get("fileList")) {
			fileList = this.get("fileList");
		}
		for(var i = 0;i < files.length;i++) {
			console.log("file:", files[i]);
			fileList.push(files[i]);
		}
		this.set("fileList", fileList);

	},
	didInsertElement() {
		var self = this;
		var fileBrowse = this.$('.import-button');
		var dragAndDrop = this.$('#drag-and-drop-container');

		fileBrowse.on('change', function(e) {
			var files = this.files;
			self.addToFileList(files);
		});

		dragAndDrop.on('dragenter', function(e) {
			e.stopPropagation();
			e.preventDefault();
		});
		dragAndDrop.on('dragover', function(e) {
			e.stopPropagation();
			e.preventDefault();
		});
		dragAndDrop.on('drop', function(e) {
			e.preventDefault();
			var files = e.originalEvent.dataTransfer.files;
			self.addToFileList(files);
		});
	}
});
