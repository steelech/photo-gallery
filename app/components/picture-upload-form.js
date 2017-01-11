import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement() {
		$('#all-pics-tab').addClass('active');
		$('#albums-tab').removeClass('active');
	}
});
