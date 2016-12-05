import Ember from 'ember';

export default Ember.Controller.extend({
	userName: '',
	password: '',
	actions: {
		submit() {
			console.log("userName:", this.get("userName"));
			console.log("password:", this.get("password"))
		}
	}
});
