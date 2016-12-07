import Ember from 'ember';
import { formatRows } from '../utils/rows';

export default Ember.Component.extend({
	didReceiveAttrs() {
		this.set("pictures", formatRows(this.get("pictures"), 3));
	},
});
