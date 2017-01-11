import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
	this.route('login');
	this.route('dashboard', { path: '/' }, function() {

		//pictures
		this.route('pictures', { path: 'pics'}, function() {
			this.route("new");
			this.route('albums', function() {
				this.route('new');
				this.route('album', { path: '/:album_name' });
          		});
        	});

		//music
		this.route('music');
	});




});

export default Router;
