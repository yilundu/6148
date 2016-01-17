
  // counter starts at 0
  Session.setDefault('counter', 0);



  Template.home.events({
    "submit .class_form": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var user_title = $(".title").val();
      var user_subject = $(".subject").val();
      var user_description = $(".description").val();
      // Insert a task into the collection
      
      classes.insert({
        title: user_title
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


