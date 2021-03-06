import Ember from 'ember';
import { formatRows } from '../utils/rows';

export default Ember.Component.extend({
	actions: {
		openSlideshow(pic) {
			this.sendAction("openSlideshow", pic);

		}
	},
	didInsertElement() {
		$('#all-pics-tab').addClass('active');
		$('#albums-tab').removeClass('active');
	},
	didReceiveAttrs() {
		this.set("pictures", formatRows(this.get("pictures"), 3));
	},
	willDestroyElement() {
		$('#all-pics-tab').removeClass('active');
	}
});
