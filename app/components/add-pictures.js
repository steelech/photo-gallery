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
			this.get("s3").uploadPics(this.get("fileList")).then(filesResponse => {
				console.log("filesReponse:", filesResponse)
				self.sendFilesToBackend(filesResponse).then(function(response) {
					console.log("response: ", response);
				});
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
	sendFilesToBackend(files) {
		var authenticationInfo = this.get("session").get("data").authenticated;
		var authorization = "Token token=\"" + authenticationInfo.token + "\", email=\"" + authenticationInfo.email + "\"";
		return this.get("ajax").request("/pictures", {
			method: "POST",
			dataType: 'json',
			headers: {
				"Authorization": authorization,
			},
			data: ({files : files, numFiles: files.length})
		})
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
