import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['top-navbar'],
	actions: {

		logout() {
			this.sendAction("logout");
		}
	}

});
