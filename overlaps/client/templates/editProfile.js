Template.editProfile.events({
  'click #submit-btn': function(){
    var name = $("#name-field").val();//edit this so that Hi {Name}! appears in the accounts ui
    var age = $("#age-field").val();
    var about = $("#about-field").val();



    //Note: Setting a name key within the profile will display the name value in the account ui
    //note: Meteor.userId throws a 403 not permmitted exception so use Meteor.user()._id
    Meteor.users.update({_id: Meteor.user()._id}, {$set: {profile: {name: name, age: age, about: about}}});

    console.log("Logged submit click. " + name + age + about);
    console.log("New user value: " + JSON.stringify(Meteor.user().profile));
  },
  

  'change #fileInput': function(event)
  {
    console.log("File change!");
    var file = event.target.files[0];
    var reader = new FileReader();
   reader.onload = function(event){
    Meteor.users.update({_id: Meteor.user()._id},{$set: {profile: {binary: reader.result}}});
     

    }
    reader.readAsDataURL(file);
 }
 
 });



Template.editProfile.helpers({
  picture: function()
  {
    if(Meteor.user())
    {
      console.log("Found picture!");
      console.log(Meteor.user().profile.binary);
      return Meteor.user().profile.binary;
    }
    else
    {
      console.log("Didn't find name!");
      return "";
    }
  }, 
  name: function()
  {
    if(Meteor.user())
    {
      console.log("Found name!");
      return Meteor.user().profile.name;
    }
    else
    {
      console.log("Didn't find name!");
      return "";
    }
  },

  age: function()
  {
    if(Meteor.user())
    {
      return Meteor.user().profile.age;
    }
    else
    {
      return "";
    }
  },

  about: function()
  {
    if(Meteor.user())
    {

      return Meteor.user().profile.about;
    }
    else
    {
      return "";
    }
  }
  });
