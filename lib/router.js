

Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: '404',
  loadingTemplate: 'loadingTemplate',
  progress: false
});

Meteor.isServer && WebApp.connectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
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
  template: '/home',
  name: 'home',
  waitOn: function(){
    return Meteor.subscribe("data");
  },
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
  data: function(){
    data1 = {search: this.params.query.search}
    return data1;
  },
  waitOn: function(){
    return Meteor.subscribe("data");
  },
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
  waitOn: function(){
    return Meteor.subscribe("data");
  },
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
  waitOn: function(){
    return Meteor.subscribe("data");
  },
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
  waitOn: function(){
    return Meteor.subscribe("data");
  },
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
  waitOn: function(){
    return Meteor.subscribe("data");
  },
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
  waitOn: function(){
    return Meteor.subscribe("data");
  },
  title: 'Register'

});



Router.route('/class/:_id', function(){
  var matchedClass = classes.findOne(this.params._id);


  if(matchedClass)
  {
    this.render('classInfoPage', {
      data: function(){
        return classes.findOne(this.params._id);
      }
    });
  }
  else{
    this.render('404');
  }
});

Router.route('/editClass/:_id', function(){
  var matchedClass = classes.findOne(this.params._id);
  if(matchedClass.teacherId !== Meteor.userId())
  {
    this.render('403');
  }
  else {
    if(matchedClass)
    {
      this.render('editClass', {
        data: function(){
          return classes.findOne(this.params._id);
        }
      });
    }
    else{
      this.render('404');
    }

  }
  },
{
  title: "Edit Class"
});

Router.route('/credit',{
  progress: true,
  template: 'credit',
  title: 'Credit',
  waitOn: function(){
    return Meteor.subscribe("data");
  },
  onBeforeAction: function(pause) {
    if (!Meteor.user()) {
      this.render('register');

    } else {
    this.next();
  }
  }


});

Router.route('/debug',{

  waitOn: function(){

    return Meteor.subscribe("data");
  },
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

Router.route('/profile',{
  template: 'profile',
  progress: true,
  title: 'Profile Page',
  data: function(){
    return {id: this.params.query.id};
  }
});

Router.route('/guide',{
  template: 'guide',
  progress: true,
  title: 'User guide',
});

Router.route('/testregister',{
  progress: true,
  waitOn: function(){
    return Meteor.subscribe("data");
  },
  title: 'Test Register'
});

Router.route('/notifications',{
  progress: true,
  title: 'Notifications'
});



Router.route('/payvenmo',{
  where: 'server',
  action: function(){
    id = this.params.query.id;
    access_token = this.params.query.access_token;
    change = this.params.query.amount;
    HTTP.call("POST", "https://api.venmo.com/v1/payments",{
          data:{
            "access_token": access_token,
            "phone": "3073996339",
            "note": "Transaction using Overlaps",
            "amount": change
          }
          }, function(error, response) {
             if ( error ) {
              //sAlert.error('Error in Venmo transaction. Please reauthenticate.',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});
              console.log(error);
             // console.log( error );
             } else {
             // sAlert.success('Transaction Recieved!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});
              Meteor.call('addCash', id, change);

              console.log(response);
           //   console.log(response.data.access_token);
            //  console.log(this.userID);

              //Meteor.users.update({_id: id},{$set: {"profile.venmo": response.data.access_token, "profile.authenticated": true}});
           //   venmo.insert({"json":response.json});
             }


         });
        this.response.setHeader('access-control-allow-origin', '*');
        this.response.writeHead(200, {});
        this.response.end();

  }
});
Router.after(function(){
  if(this.route.options.title)
  {
    document.title = this.route.options.title + ' - Overlaps';
  }




});
