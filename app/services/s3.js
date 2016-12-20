import Ember from 'ember';

export default Ember.Service.extend({
	cognito: Ember.inject.service(),
	uploadFiles(files) {
		var self = this;
		var promise = new Promise(function(resolve, reject) {
			var length = files.length;
			for(var i = 0;i < length;i++) {
				self.uploadSingleFile(files[i]);
			}
			resolve({data: "suh. dude"});
		})
		return promise;
	},
	uploadSingleFile(file) {
		console.log("uploading a file");
		var bucket = new AWS.S3();
		var params = {
			Bucket: 'pics-songs',
			Key: 'pics-songs3',
			ContentType: file.type,
			Body: file
		};
		bucket.upload(params, function(err, data) {
			if(err) {
				console.log()
				alert(err);
			} else {
				alert("success");
			}
		});
	},
	setCreds() {
		console.log("setting creds");
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
