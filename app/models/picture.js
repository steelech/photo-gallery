import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr(),
	album: DS.attr(),
	key: DS.attr(),
	bucket: DS.attr()



});
