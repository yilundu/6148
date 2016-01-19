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

Router.route('/info/:_id', {
  template: 'listresults',
  data: function(){
    var current = this.params._id;
    return classes.findOne({'subject': current});
  //  return {subject: "hi", description: "hi", title: "bye"}
  }

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

Router.route('/createClass',{
  title: "Create Class",
  progress: true,
})

Router.after(function(){
  if(this.route.options.title)
  {
    document.title = this.route.options.title + ' - Overlaps';
  }
})
