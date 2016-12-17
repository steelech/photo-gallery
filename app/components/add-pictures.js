import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['file-upload'],
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	cognito: Ember.inject.service(),
	fileList: null,
	actions:{

		uploadFiles() {
			var self = this;
			console.log("uploading files");
			this.get("cognito").getCreds().then(function(creds) {
				console.log("temporary creds:", creds);
				AWS.config.accessKeyId = creds.accessKeyId; 
				AWS.config.secretAccessKey = creds.secretAccessKey;
				AWS.config.sessionToken = creds.sessionToken;
				AWS.config.region = 'us-west-2';
				var bucket = new AWS.S3({
					Bucket: 'pics-songs'
				});
				var length = self.get("fileList").length;
				for(var i = 0;i < length;i++) {
					var params = {
						Bucket: 'pics-songs',
						Key: 'pic' + i,
						ContentType: self.get("fileList")[i].type,
						Body: self.get("fileList")[i]
					}
					bucket.putObject(params, function(err, data) {
						if(err) {
							alert(err);
						} else {
							alert("success");
						}
					});
				}
			})
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
