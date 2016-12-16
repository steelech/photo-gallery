import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['file-upload'],
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	fileList: null,
	actions:{

		uploadFiles() {
			console.log("sessionData:", this.get("session").get("data").authenticated);
			var authorization = "Token token=\"" + this.get("session").get("data").authenticated.token + "\", email=\"" + this.get("session").get("data").authenticated.email + "\"";

			var self = this;
			self.get("ajax").request('/cognito', {
				method: 'GET',
				dataType: 'json',
				headers: {
					"Authorization": authorization
				}
			}).then(function(response) {
				var promise = new Promise(function(resolve, reject) {
					var creds = new AWS.CognitoIdentityCredentials({
						IdentityPoolId: 'us-west-2:02ccbc42-bd75-4fb2-9301-09f30a628349',
						IdentityId: response.identity_id,
						Logins: {
							'cognito-identity.amazonaws.com': response.token
						}
					});
					resolve(creds);
				});
				console.log("response:", response);
				return promise;
			}).then(function(creds) {
				console.log("creds:", creds);
				AWS.config.region = "us-west-2";
				AWS.config.credentials = creds;	
				console.log(AWS.config.credentials);
				AWS.config.credentials.get(function() {
					console.log("accessKeyId:", AWS.config.accessKeyId);
					console.log(AWS.config.credentials);
						var bucket = new AWS.S3({
							Bucket: 'pics-songs'
						});
						var length = self.get("fileList").length;
						for(var i = 0;i < length; i++) {
							var params = {
								Bucket: 'pics-songs',
								Key: 'photo-gallery' + i,
								ContentType: self.get("fileList")[i].type,
								Body: self.get("fileList")[i]


							}
							bucket.putObject(params,function(err, data) {
								if(err) {
									alert("err");
								} else {
									alert("success");
								}
							})
						}

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
