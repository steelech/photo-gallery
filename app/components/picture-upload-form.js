import Ember from 'ember';

export default Ember.Component.extend({
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	s3: Ember.inject.service(),
	fileList: null,
	selectedAlbum: null,
	init() {
		this._super(...arguments);
		this.get("s3").setCreds();
	},
	actions: {
		selectAlbum(selection) {
			this.set("selectedAlbum", selection);

		},
		uploadFiles() {
			var self = this;
			this.get("s3").uploadPics(this.get("fileList")).then(filesResponse => {
				self.sendFilesToBackend(filesResponse).then(function(response) {
					console.log("response: ", response);
					for(var i = 0;i < response.length;i++) {
						Picture.create({
							id: response[i].id,
							bucket: response[id].attributes.bucket,
							key: response[id].attributes.key
						})
					}
					self.sendAction("finishUpload");	
				})
			})
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
		var self = this;
		var authenticationInfo = this.get("session").get("data").authenticated;
		var authorization = "Token token=\"" + authenticationInfo.token + "\", email=\"" + authenticationInfo.email + "\"";
		return this.get("ajax").request("/pictures", {
			method: "POST",
			dataType: 'json',
			headers: {
				"Authorization": authorization,
			},
			data: ({files : files, numFiles: files.length, album: self.get("album")})
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

		$('#all-pics-tab').addClass('active');
		$('#albums-tab').removeClass('active');
	}, 
	willDestroyElement() {
		$('#all-pics-tab').removeClass('active');
		if($('#all-pics-tab').length == 0 && $('#albums-tab').length == 0) {
			$('#all-pics-tab').addClass('active');
		}
	}
});
