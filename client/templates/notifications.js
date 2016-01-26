Template.notifications.helpers({
  notifications: function(){
    if(Meteor.user() && Meteor.user().profile)
    {
      if(Meteor.user().profile.notifs)
      {
        return Meteor.user().profile.notifs;
      }
    }
  }
})
