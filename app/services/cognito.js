import Ember from 'ember';

export default Ember.Service.extend({
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	accessKeyId: null,
	secretAccessKey: null,
	getCreds() {
		var self = this;
		var promise = new Promise(function(resolve, reject){
			if(self.isAuthenticated()) {
				resolve(JSON.parse(Cookies.get("cognito")));
			} else {
				self.authenticate().then(function(creds) {
					resolve(creds);
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
		var self = this;
		AWS.config.region = 'us-west-2';
		AWS.config.credentials = creds;
		var promise = new Promise(function(resolve, reject) {
			AWS.config.credentials.get(function() {
				console.log("config", AWS.config.credentials);
				Cookies.set("cognito", { accessKeyId: AWS.config.credentials.accessKeyId, secretAccessKey: AWS.config.credentials.secretAccessKey, sessionToken: AWS.config.credentials.sessionToken }, { expires: AWS.config.credentials.expireTime });
				self.set("accessKeyId", AWS.config.credentials.accessKeyId);
				self.set("secretAccessKey", AWS.config.credentials.secretAccessKey);
				self.set("sessionToken", AWS.config.credentials.sessionToken);
				resolve({accessKeyId: AWS.config.credentials.accessKeyId, secretAccessKey: AWS.config.credentials.secretAccessKey, sessionToken: AWS.config.credentials.sessionToken});

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
	isAuthenticated() {
		if(Cookies.get("cognito")) {
			return true;
		} else {
			return false;
		}
	},
	sessionData() {
		return this.get("session").get("data").authenticated;
	}
});
