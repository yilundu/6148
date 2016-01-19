
  // counter starts at 0
  Session.setDefault('counter', 0);


  $("#nameid").text(Meteor.user().profile.name);



  Template.home.events({
    "submit .class_form": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var user_title = $(".title").val();
      var user_subject = $(".subject").val();
      var user_cost = $(".cost").val();
      var user_description = $(".description").val();
      // Insert a task into the collection

      classes.insert({
        title: user_title,
        subject: user_subject,
        cost: user_cost,
        teacher: Meteor.user().profile.name,
        description: user_description,
        createdAt: new Date(),
        studentNumber: 0, // current time
        teacherId: Meteor.user()._id
      });

      $(".subject").val('');
      $(".description").val('');
      $(".title").val('');
      $(".cost").val('');
      // Clear form
      },
      "click #editprofile": function(){
        Router.go("/editprofile");
      }



  });
$(document).ready(function(){
  var heightofcarousel = $("#icon-bar").height();
 $('#icon-bar').css( "margin-top", 500);

})
