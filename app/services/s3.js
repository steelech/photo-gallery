import Ember from 'ember';

export default Ember.Service.extend({
	cognito: Ember.inject.service(),
	init() {
		this.setCreds();
	},
	uploadFiles(files) {
		var self = this;
		var promise = new Promise(function(resolve, reject) {
			self.get("cognito").getCreds().then(function(creds) {

				var length = files.length;
				for(var i = 0;i < length;i++) {
					self.uploadSingleFile(files[i]);
				}
				resolve({data: "suh. dude"});
			})
		})
		return promise;
	},
	uploadSingleFile(file) {
		var bucket = new AWS.S3();
		var params = {
			Bucket: 'pics-songs',
			Key: 'pics-songs3',
			ContentType: file.type,
			Body: file
		};
		bucket.upload(params, function(err, data) {
			if(err) {
				alert("err");
			} else {
				alert("success");
			}
		});
	},
	setCreds() {
		var self = this;
		self.get("cognito").getCreds().then(function(creds) {
			AWS.config.accessKeyId = creds.accessKeyId;
			AWS.config.secretAccessKey = creds.secretAccessKey;
			AWS.config.sessionToken = creds.sessionToken;
			AWS.config.region = "us-west-2";
		});
	}
});
