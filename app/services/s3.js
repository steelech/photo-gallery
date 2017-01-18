import Ember from 'ember';

export default Ember.Service.extend({
	cognito: Ember.inject.service(),
	// 
	getPicsFromS3(albumName) {

	},
	generatePresignedUrl() {

	},
	uploadPics(files) {
		var self = this;
		var promise = new Promise(function(resolve, reject) {
			var fileInfo = [];
			for(var i = 0;i < files.length;i++) {
				fileInfo.push(self.uploadPicToS3(files[i]))
			}
			Promise.all(fileInfo).then(values => {
				resolve(values);
			})	
		})
		return promise;
	},
	uploadPicToS3(file) {
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
