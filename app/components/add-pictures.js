import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['file-upload'],
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	s3: Ember.inject.service(),
	fileList: null,
	init() {
		this._super(...arguments);
		this.get("s3").setCreds(); 
		
	},
	actions:{

		uploadFiles() {
			var self = this;
			this.get("s3").uploadPics(this.get("fileList")).then(fileInfo => {
				console.log("fileInfo:", fileInfo);
			});
		}
	}, 	
	addToFileList(files) {
		var fileList = Ember.A([]);
		if(this.get("fileList")) {
			fileList = this.get("fileList");
		}
		for(var i = 0;i < files.length;i++) {
			fileList.push(files[i]);
		}
		this.set("fileList", fileList);

	},
	sendFileInfoToBackend(files) {
		var self = this;
		var promise = new Promise(function(resolve, reject) {
			var length = files.length;
			var pics = [];
			for(var i = 0;i < length;i++) {
				var picRecord = self.get("store").createRecord("picture", {
					name: files[i].name,
				});
				picRecord.save();
				pics.push(picRecord);

			}
			resolve(pics);
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
