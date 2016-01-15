Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'home'});
Router.route('/login', {name: 'login'});
Router.route('/register');
Router.route('/search');
Router.configure({layoutTemplate: 'layout', notFoundTemplate: '404'});
