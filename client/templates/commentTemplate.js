Template.commentTemplate.events({
  'mouseenter ._commentTemplate' : function(){
    //console.log("mouseenter");
    //waiting on piazza //$('.glyphicon-remove').show();
  },

  'mouseleave ._commentTemplate' : function(){
    //console.log('mouseleave');
    //waiting on piazza //$('.glyphicon-remove').hide();
  },

  'click .glyphicon-remove' : function(){
    var comments = Template.parentData().studentComments;
    var indexOf = comments.indexOf(this);

    comments.splice(indexOf, 1);
    Meteor.call('updateComments',Template.parentData()._id, comments);
  },
  'click .glyphicon-alert' : function(){
    var comments = Template.parentData().studentComments;
    var indexOf = comments.indexOf(this);

    //toggle
    if(comments[indexOf].flagged)
    {
      comments[indexOf].flagged = false;
    }
    else {
      comments[indexOf].flagged = true;
    }
    Meteor.call('updateComments',Template.parentData()._id, comments);
  }
});


Template.commentTemplate.helpers({
    'canDelete' : function(){
      var isTeacher;
      if(Meteor.user()){//make sure user is loaded
        if(Meteor.userId() === Template.parentData().teacherId)
        {
          isTeacher =  true;
        }
        else{
          isTeacher = false;
        }
      }
      else
      {
        isTeacher =  false;
      }

      var currentId = Meteor.userId() || "";
      return isTeacher || (currentId == this.userId);
    },

    'isTeacher' : function(){
      if(Meteor.user()){//make sure user is loaded
        if(Meteor.userId() === Template.parentData().teacherId)
        {
          return true;
        }
        else{
          return false;
        }
      }
      else
      {
        return false;
      }
    },
    
    'isOwnComment' : function(){
      if(Meteor.userId())
      {
        return this.userId == Meteor.userId;
      }
      else{
        return false;
      }
    },

    displayImage: function(){
    if(!Meteor.user)
      return "";
    var thisUser = Meteor.users.findOne(this.userId);

    return thisUser.profile.binary || "/default.jpg";//if profile.name is set use that - else use username
  }
})
