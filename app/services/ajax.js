import Ember from 'ember';
import Ajax from 'ember-ajax/services/ajax';

export default Ajax.extend({
	host: 'http://localhost:3000'
});
