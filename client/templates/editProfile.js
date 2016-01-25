Template.editProfile.events({
  'click #submit-btn': function(){
    var name = $("#name-field").val();//edit this so that Hi {Name}! appears in the accounts ui
    var age = $("#age-field").val();
    var about = $("#about-field").val();


    Meteor.call('editUserInfo', Meteor.user()._id, name, age, about);
    //Note: Setting a name key within the profile will display the name value in the account ui
    //note: Meteor.userId throws a 403 not permmitted exception so use Meteor.user()._id
    //Meteor.users.update({_id: Meteor.user()._id}, {$set: {profile: {name: name, age: age, about: about}}});

    console.log("Logged submit click. " + name + age + about);
    console.log("New user value: " + JSON.stringify(Meteor.user().profile));
    sAlert.success('Profile Data Saved!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});
  },


  'change #fileInput': function(event)
  {
    console.log("File change!");
    if (event.target.files[0]){
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event){
   // Meteor.users.update({_id: Meteor.user()._id},{$set: {profile: {binary: reader.result}}});
    Meteor.call('editUserPhoto', Meteor.user()._id, reader.result);

    }
    reader.readAsDataURL(file);
  }
 }

 });



Template.editProfile.helpers({
  picture: function()
  {
    if(Meteor.user())
    {
      
      if (Meteor.user().profile.binary){
      return Meteor.user().profile.binary;}
      else {
        return '/default.jpg';
      }
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
  },

  authenticated: function(){
    return Meteor.user().profile.authenticated;

  },

  url: function(){
    var string = "https://api.venmo.com/v1/oauth/authorize?client_id=3446&scope=make_payments&response_type=code&state="+Meteor.userId();
    return string;
  },

  cash: function(){
    if (Meteor.user().profile.balance){
      return Meteor.user().profile.balance;
    }
    else{
      Meteor.call('setCash', Meteor.user()._id)
      return Meteor.user().profile.balance;
    }
  }

  });
