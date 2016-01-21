Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: '404',
  loadingTemplate: 'loading',
  progress: false
});



Router.route('/', {
  title: 'Home',//set title of html (displayed in tab) here to be set later (see Router.after)
  name: 'home', 
onAfterAction:function(pause){
  $(".navbar").css("position", "absolute");
}

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
  title: 'Find Services',
  progress: true,
  onBeforeAction: function(pause) {
    if (!Meteor.user()) {
      this.render('find');

    } else {
    this.next();
  }
  }
});

Router.route('/editprofile',{
  name: "editProfile",
  title: 'Edit Profile',
  progress: true,
  onBeforeAction: function(pause) {
    if (!Meteor.user()) {
      this.render('home');

    } else {
    this.next();
  }
  }
});

Router.route('/sellerDashboard',{
  title:"Seller Dashboard",
  progress: true,
  onBeforeAction: function(pause) {
    if (!Meteor.user()) {
      this.render('home');

    } else {
    this.next();
  }
  }
  /* TODO: Make this work after MVP deadline
  waitOn: function(){
    return Meteor.subscribe('users');
  }*/
});

Router.route('/studentDashboard',{
  title: "Student Dashboard",
  progress: true,
  onBeforeAction: function(pause) {
    if (!Meteor.user()) {
      this.render('home');

    } else {
    this.next();
  }
  }
});

Router.route('/createClass',{
  title: "Create Class",
  progress: true,
  onBeforeAction: function(pause) {
    if (!Meteor.user()) {
      this.render('home');

    } else {
    this.next();
  }
  }
});


Router.after(function(){
  if(this.route.options.title)
  {
    document.title = this.route.options.title + ' - Overlaps';
  }


        

});
