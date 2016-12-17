import Ember from 'ember';

export default Ember.Service.extend({
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	accessKeyId: null,
	secretAccessKey: null,
	getCreds() {
		var self = this;
		var promise = new Promise(function(resolve, reject){
			if(self.isAuthenticated) {
				resolve({accessKeyId: Cookies.get("accessKeyId"), secretAccessKey: Cookies.get("secretAccessKey"), sessionToken: Cookies.get("sessionToken")});
			} else {
				self.authenticate().then(function(creds) {
					resolve({accessKeyId: creds.accessKeyId, secretAccessKey: creds.secretAccessKey, sessionToken: creds.sessionToken});
				})
			}
		});
		return promise;
	},

	authenticate() {
		var self = this;
		return  this.getTokenFromBackend().then(function(response) {
			return self.createTempCreds(response); 
		}).then(function(creds) {
			return self.setCookies(creds);
		});
	},
	getTokenFromBackend() {
		var authorization = "Token token=\"" + this.sessionData().token + "\", email=\"" + this.sessionData().email + "\"";
		return this.get("ajax").request("/cognito", {
			method: 'GET',
			dataType: 'json',
			headers: {
				"Authorization": authorization
			}
		});
	},
	setCookies(creds) {
		AWS.config.region = 'us-west-2';
		AWS.config.credentials = creds;
		var promise = new Promise(function(resolve, reject) {
			AWS.config.credentials.get(function() {
				Cookies.set("accessKeyId", AWS.config.credentials.accessKeyId);
				Cookies.set("secretAccessKey", AWS.config.credentials.secretAccessKey);
				Cookies.set("sessionToken", AWS.config.credentials.sessionToken);
				resolve({accessKeyId: AWS.config.credentials.accessKeyId, SecretAccessKey: AWS.config.credentials.secretAccessKey, sessionToken: AWS.config.credentials.sessionToken});

			})
		});
		return promise;
		
	},
	createTempCreds(cognitoIdCreds) {
		var promise = new Promise(function(resolve, reject) {
			var creds = new AWS.CognitoIdentityCredentials({
				IdentityPoolId: 'us-west-2:02ccbc42-bd75-4fb2-9301-09f30a628349',
				IdentityId: cognitoIdCreds.identity_id,
				Logins: {
					'cognito-identity.amazonaws.com': cognitoIdCreds.token 
				}
			});
			
			resolve(creds);

		});
		return promise;
	},
	isAuthenticated: Ember.computed('accessKeyId', 'secretAccessKey', function() {
		if(Cookies.get("cognito")) {
			console.log("cookies");
		} else {
			console.log("no cookies");
		}
	}),
	sessionData() {
		return this.get("session").get("data").authenticated;
	}
});
