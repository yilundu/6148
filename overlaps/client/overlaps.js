if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.body.events({
    "submit .form": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var user_subject = $(".subject").val();
      var user_description = $(".description").val();
      // Insert a task into the collection
      
      Classes.insert({
        subject: user_subject,
        description: user_description,
        createdAt: new Date() // current time
      });
      
      $(".subject").val('');
      $(".description").val('');
      // Clear form
      }
    
  });
 Accounts.ui.config({
	     passwordSignupFields: "USERNAME_ONLY"
	   });
}
Classes = new Mongo.Collection("classes");

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
Router.route('registerpage')
Router.route('loginpage')
Router.route('mainpage')