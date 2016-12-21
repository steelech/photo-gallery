import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['file-upload'],
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	s3: Ember.inject.service(),
	fileList: null,
	init() {
		this._super(...arguments);
		this.get("s3").setCreds().then(function(creds) {
			console.log("done setting creds:", creds);
		})
	},
	actions:{

		uploadFiles() {
			var self = this;
			this.get("s3").uploadFiles(this.get("fileList")).then(function(data) {
					console.log("uploadedFiles:", data.files);
					self.sendFileInfoToBackend(data.files).then(function(data) {
						console.log("hi");
					})
			});
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
	sendFileInfoToBackend(files) {
		console.log("sending file info to backend");
		var self = this;
		var promise = new Promise(function(resolve, reject) {
			var length = files.length;
			for(var i = 0;i < length;i++) {

			}
		});
		return promise;
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
