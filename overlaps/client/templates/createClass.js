var checkTextEmpty = function(element){
  if($(element).val()){
    $(element).parent().removeClass('has-error');
    $(element).parent().addClass('has-success');
    return true;
  }
  else{
    $(element).parent().removeClass('has-success');
    $(element).parent().addClass('has-error');
    return false;
  }
};

var checkNumberPositive = function(element){
  var costInput = $(element).val();
  if(costInput && costInput > 0){
    $(element).parent().removeClass('has-error');
    $(element).parent().addClass('has-success');
    return true;
  }
  else{
    $(element).parent().removeClass('has-success');
    $(element).parent().addClass('has-error');
    return false;
  }
};

Template.createClass.events({
  "click #createBtn": function (event) {

    // Get value from form element
    var user_title = $("#titleField").val();
    var user_cost = $("#costField").val();
    var user_description = $("#descField").val();
    var user_subject;


    $('.list-group-item').each(function(){
      if($(this).hasClass('active')){
        user_subject = $(this).html();
      }
    });

    //check fields
    //NOTE: use singular & in order to avoid short-circuit evaluation: all methods must be called to label fields red as needed
    if(checkTextEmpty($('#titleField')) &
    checkTextEmpty($('#descField')) &
    checkNumberPositive($('#costField'))){


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
    }
  },

  "click .list-group-item ": function(event){
    $('.list-group-item').removeClass('active');
    $(event.target).addClass("active");
  },

  "keyup #titleField": function(event){
    checkTextEmpty(event.target);
  },

  "keyup #costField": function(event){
    checkNumberPositive(event.target);
  },

  "keyup #descField": function(event){
    checkTextEmpty(event.target);
  }
});
