import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement() {
		$('#all-pics-tab').removeClass('active');
		$('#albums-tab').addClass('active')
	}
});
