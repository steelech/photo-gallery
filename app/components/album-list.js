import Ember from 'ember';
import { formatRows } from '../utils/rows';

export default Ember.Component.extend({
	didReceiveAttrs() {
		console.log("albums:", this.get("albums").content);
		this.set("albums", formatRows(this.get("albums"), 3));
	},
	actions: {
	}
});
