Template.classReview.helpers({
  displayName : function(){
    if(!Meteor.user)
      return "";
    var thisUser = Meteor.users.findOne(this.review.reviewer);

    return thisUser.profile.name || thisUser.username;//if profile.name is set use that - else use username
  }
})
