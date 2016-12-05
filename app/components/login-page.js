import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['login-page'],
	session: Ember.inject.service('session'),
	actions: {
		authenticate() {
			const { login, password } = this.getProperties('login', 'password');
			this.get('session').authenticate('authenticator:devise', login, password).then(() => {
				alert("Success!");
			}, (err) => {
				alert("Bad login creds");
			});
		}
	}
});
