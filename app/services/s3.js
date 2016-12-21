import Ember from 'ember';

export default Ember.Service.extend({
	cognito: Ember.inject.service(),
	uploadFiles(files) {
		var self = this;
		var promise = new Promise(function(resolve, reject) {
			var length = files.length;
			var uploadedFiles = [];
			for(var i = 0;i < length;i++) {
				self.uploadSingleFile(files[i]).then(function(data) {
					uploadedFiles.push(data);
					console.log("file data:", data);
				}, function(err) {
					console.log("error:", err);

				});
			}
			resolve({files: uploadedFiles});
		})
		return promise;
	},
	uploadSingleFile(file) {
		var promise = new Promise(function(resolve, reject) {
			var bucket = new AWS.S3();
			var params = {
				Bucket: 'pics-songs',
				Key: file.name,
				ContentType: file.type,
				Body: file
			};
			bucket.upload(params, function(err, data) {
				if(err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		})
		return promise;
	},
	setCreds() {
		var self = this;
		var promise = new Promise(function(resolve, reject) {
			self.get("cognito").getCreds().then(function(creds) {
				AWS.config.accessKeyId = creds.accessKeyId;
				AWS.config.secretAccessKey = creds.secretAccessKey;
				AWS.config.sessionToken = creds.sessionToken;
				AWS.config.region = "us-west-2";
				resolve(AWS.config);
			});
		});
		return promise;
	}
});
