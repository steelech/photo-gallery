import Ember from 'ember';

export default Ember.Component.extend({
	init() {
		this._super(...arguments);
	},
	classNames: ["dashboard-navbar"],
	tab: "albums",
	actions: {
		setTab(tab) {
			var tabs = Ember.A(['albums', 'music']);
			if(this.get("tab") !== tab) {
				this.set("tab", tab);

				for(var i = 0;i < tabs.length;i++) {
					var selector = "#photos-navbar-" + tabs[i];
					if(tabs[i] == tab) {
						Ember.$(selector).addClass("photos-navbar-selected");
						Ember.$(selector).removeClass("photos-navbar-unselected");
					} else {
						Ember.$(selector).addClass("photos-navbar-unselected");
						Ember.$(selector).removeClass("photos-navbar-selected");
					}
				}
			}
			this.sendAction("changeTab", tab);
			//Ember.$("#photos-navbar-all").addClass("photos-navbar-selected");

		}

	}
});
