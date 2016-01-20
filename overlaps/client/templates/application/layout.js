
  Template.layout.helpers({
    photoprof: function(){
      return Meteor.user().profile.binary;
    }
  });

  Template.layout.events({
      "click #editprofile": function(){
        Router.go("/editprofile", {name: $(".form-control").val()});
      }
  })



  
