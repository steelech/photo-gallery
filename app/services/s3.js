import Ember from 'ember';

export default Ember.Service.extend({
	cognito: Ember.inject.service(),
	uploadFiles(files) {
		var self = this;
		var promise = new Promise(function(resolve, reject) {
			self.get("cognito").getCreds().then(function(creds) {
				AWS.config.accessKeyId = creds.accessKeyId;
				AWS.config.secretAccessKey = creds.secretAccessKey;
				AWS.config.sessionToken = creds.sessionToken;
				AWS.config.region = "us-west-2";
				console.log("creds(hi):", creds);
				var bucket = new AWS.S3({
					Bucket: 'pics-songs'
				});

				var length = files.length;
				for(var i = 0;i < length;i++) {
					var params = {
						Bucket: 'pics-songs',
						Key: 'pics-songs' + i,
						ContentType: files[i].type,
						Body: files[i]

					}
					bucket.putObject(params, function(err, data) {
						if(err) {
							alert("err");
						} else {
							console.log("success");
						}

					})
				}
				resolve({data: "suh. dude"});
			})
		})
		return promise;
	}
});
