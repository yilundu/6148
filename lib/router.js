Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: '404',
  loadingTemplate: 'loading',
  progress: false
});

/*
Router.map({
  this.route('home', {
    title: 'Home',
    progress: true,
    path: '/'

  });

  this.route('listresults',{
    path: '/info/:_id',
    data: function(){
    var current = this.params._id;
    return classes.findOne({'subject': current});
  //  return {subject: "hi", description: "hi", title: "bye"}
  }
  });

  this.route('find',{
    title: 'Find Services',
    progress: true,
    path: '/find'
    onBeforeAction: function(pause) {
    if (!Meteor.user()) {
      this.render('find');

    } else {
    this.next();
  }
  }
  });

  this.route('editProfile',{
    title: 'Edit Profile',
    path: '/findprofile',
    progress: true,
    onBeforeAction: function(pause) {
    if (!Meteor.user()) {
      this.render('home');

    } else {
    this.next();
  }
  }
  });

  this.route('sellerDashboard',{
      title: "Seller Dashboard",
      progress: true,
      path:'/sellerDashboard',
      onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        this.render('home');

      } else {
      this.next();
  }
  }
  });

  this.route('studentDashboard',{
    title: "Student Dashboard",
    path: '/studentDashboard',
    progress: true,
    onBeforeAction: function(pause) {
    if (!Meteor.user()) {
      this.render('home');

    } else {
    this.next();
  }
  }
  });

  this.route('createClass',{
    title: "Create Class",
    path: '/createClass',
    progress: true,
    onBeforeAction: function(pause) {
    if (!Meteor.user()) {
      this.render('home');

    } else {
    this.next();
  }
  }

  });

});
*/
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

Router.route('/search/:_id', {
  template: 'search',
  data: function(){
    return this.params._id;
  }

});

Router.route('/search',{
  title: 'Find Services',
  progress: true,
  template: 'find',
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
      this.render('register');

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
      this.render('register');

    } else {
    this.next();
  }
  }
  /* TODO: Make this work after MVP deadline
  waitOn: function(){
    return Meteor.subscribe('users'); */

});

Router.route('/studentDashboard',{
  title: "Student Dashboard",
  progress: true,
  onBeforeAction: function(pause) {
    if (!Meteor.user()) {
      this.render('register');

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
      this.render('register');

    } else {
    this.next();
  }
  }
});

Router.route('/register',{
  template: 'register',
  progress: true,
  title: 'Register'

});

Router.route('/classInfoPage',{
  title: "Test Class Info Page"
});


Router.route('/class/:_id', function(){
  this.render('classInfoPage',{
    data: function(){
      return classes.findOne({_id: this.params._id});
    }
  })
});

Router.route('/credit',{
  progress: true,
  template: 'credit',
  title: 'Credit',
  onBeforeAction: function(pause) {
    if (!Meteor.user()) {
      this.render('register');

    } else {
    this.next();
  }
  }
 
});

Router.route('/_oauth/venmo', {
  where: 'server',
  action: function(){
    code = this.params.query.code;
    id = this.params.query.state;
   // console.log(id);
   // console.log(code);
    HTTP.call("POST", "https://api.venmo.com/v1/oauth/access_token",{
      data:{
        "client_id": 3446,
        "client_secret": "eEmfXPZgjcLFWfYJtG3hxMM4EG8PPkhG",
        "code": code
      }
      }, function(error, response) {
         if ( error ) {
         // console.log( error );
         } else {
       //   console.log(response);
       //   console.log(response.data.access_token);
        //  console.log(this.userID);
        Meteor.call('addVenmo', id, response.data.access_token);
          //Meteor.users.update({_id: id},{$set: {"profile.venmo": response.data.access_token, "profile.authenticated": true}});
       //   venmo.insert({"json":response.json});
         }});

    this.response.setHeader('access-control-allow-origin', '*');
    this.response.writeHead(301, {'Location': '/'});
    this.response.end();
  }

});

Router.after(function(){
  if(this.route.options.title)
  {
    document.title = this.route.options.title + ' - Overlaps';
  }




});
