Template.classReview.helpers({
  displayName : function(){
    return Meteor.user().profile.name || Meteor.user().username;//if profile.name is set use that - else use username
  }
})
