import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model() {
		this.get("store").findAll("picture").then(function(response) {
			console.log("loading pictures:", response);
		})
		return this.get("store").findAll("picture");
	},
});
