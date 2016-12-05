import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['header'],
	actions: {
		logout() {
			this.sendAction("logout");
		}
	}

});
