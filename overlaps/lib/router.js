Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: '404',
  loadingTemplate: 'loading',
  progress: false
});

resultssearch = {};


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
  title:"Seller Dashboard",
  progress: true,
  /* TODO: Make this work after MVP deadline
  waitOn: function(){
    return Meteor.subscribe('users');
  }*/
});

Router.after(function(){
  if(this.route.options.title)
  {
    document.title = this.route.options.title + ' - Overlaps';
  }
})
