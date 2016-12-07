import Ember from 'ember';
import { formatRows } from '../utils/rows';

export default Ember.Component.extend({
	didReceiveAttrs() {
		this.set("albums", formatRows(this.get("albums"), 3));
	},
});
