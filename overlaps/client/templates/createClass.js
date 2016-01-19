

Template.createClass.events({
  "click #createBtn": function (event) {

    // Get value from form element
    var user_title = $("#titleField").val();
    var user_subject = $('.list-group > .active').html()
    var user_cost = $("#costField").val();
    var user_description = $("#descField").val();
    // Insert a task into the collection

    //validating input
    if(!(user_title && user_subject && user_cost && user_description)){
      console.log("input invalid");
      return;
    }

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

    //redirect to sellerDashboard
    Router.go('/sellerDashboard');

    // Clear form
  },

  "click .list-group-item ": function(event){
    $('.list-group-item').removeClass('active');
    $(event.target).addClass("active");
  },

  "keyup #titleField": function(event){
    if($(event.target).val()){
      $(event.target).parent().removeClass('has-error');
      $(event.target).parent().addClass('has-success');
    }
    else{
      $(event.target).parent().removeClass('has-success');
      $(event.target).parent().addClass('has-error');
    }
  },

  "keyup #costField": function(event){
    var costInput = $(event.target).val();
    if(costInput && costInput > 0){
      $(event.target).parent().removeClass('has-error');
      $(event.target).parent().addClass('has-success');
    }
    else{
      $(event.target).parent().removeClass('has-success');
      $(event.target).parent().addClass('has-error');
    }
  },

  "keyup #descField": function(event){
    if($(event.target).val()){
      $(event.target).parent().removeClass('has-error');
      $(event.target).parent().addClass('has-success');
    }
    else{
      $(event.target).parent().removeClass('has-success');
      $(event.target).parent().addClass('has-error');
    }
  }
});
