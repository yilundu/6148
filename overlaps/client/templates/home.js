
  // counter starts at 0
  Session.setDefault('counter', 0);



  Template.home.events({
    "submit .form": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var user_subject = $(".subject").val();
      var user_description = $(".description").val();
      // Insert a task into the collection
      
      classes.insert({
        subject: user_subject,
        description: user_description,
        createdAt: new Date() // current time
      });
      
      $(".subject").val('');
      $(".description").val('');
      // Clear form
      }
    
  });


$('#carouselimage').carousel({ interval: 2000, cycle: true });


