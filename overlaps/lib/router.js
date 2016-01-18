Router.configure({
  layoutTemplate: 'layout'
});
resultssearch = {};
Router.configure({layoutTemplate: 'layout', notFoundTemplate: '404'});

Router.route('/', {
  title: 'Home',//set title of html (displayed in tab) here to be set later (see Router.after)
  name: 'home'
});

Router.route('/login', {
  title: 'Login'
});

Router.route('/register',{
  title: 'Register'
});

Router.route('/find',{
  title: 'Find Services'
});

Router.route('/editprofile',{
  name: "editProfile",
  title: 'Edit Profile'
});

Router.route('/sellerDashboard',{
  title:"Seller Dashboard"
});

Router.after(function(){
  if(this.route.options.title)
  {
    document.title = this.route.options.title + ' - Overlaps';
  }
})
