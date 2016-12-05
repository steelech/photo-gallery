import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ["photos-route-container"],
	tab: "all",
	actions: {
		setTab(tab) {
			var tabs = Ember.A(['all', 'albums', 'music']);
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
			//Ember.$("#photos-navbar-all").addClass("photos-navbar-selected");

		}

	}
});
