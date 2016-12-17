import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['login-page'],
	session: Ember.inject.service(),
	cognito: Ember.inject.service(),
	actions: {
		authenticate() {
			var self = this;
			const { login, password } = this.getProperties('login', 'password');
			this.get('session').authenticate('authenticator:devise', login, password).then(() => {
				self.get("cognito").authenticate();
				
			}, (err) => {
				alert("Bad login creds");
			});
		}
	}
});
