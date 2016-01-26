
Template.home.helpers({
  username : function(){
    if(Meteor.user())
    {
      if( Meteor.user().profile.name){
        return Meteor.user().profile.name;
      }
      else{
        return Meteor.user().username;
      }
    }
    else {
      return "";
    }
    }
  });


Template.home.onRendered( function(){
  new WOW().init();
});

  

  Template.home.events({
    "submit .class_form": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      //if($(this).valid){
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
      alert("Form Submitted");
     /* }
      else{
        alert("Form is invalid(description must be longer than 12 characters) and cost positive)!")
      }*/
      // Clear form
      }
      ,
    "submit .search": function(event){
        console.log("Hello!");
        event.preventDefault();
        var path = $('#user1').val();
        path = "/search?search=" + path;
        Router.go(path);
    }


  });
