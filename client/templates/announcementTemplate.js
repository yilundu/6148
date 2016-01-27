Template.announcementTemplate.events({
  'mouseenter ._announcementTemplate' : function(){
    console.log("mouseenter");
    //waiting on piazza //$('.glyphicon-remove').show();
  },

  'mouseleave ._announcementTemplate' : function(){
    console.log('mouseleave');
    //waiting on piazza //$('.glyphicon-remove').hide();
  },

  'click .glyphicon-remove' : function(){


    var announcements = Template.parentData().classAnnouncements;
    var indexOf = announcements.indexOf(this);
    announcements.splice(indexOf, 1);
    Meteor.call('updateAnnouncements',Template.parentData()._id, announcements);

  }
});

Template.announcementTemplate.helpers({
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

    displayImage: function(){
    if(!Meteor.user)
      return "";
    var thisUser = Meteor.users.findOne(this.userId);
    console.log("asofhasdofasd");
    return thisUser.profile.binary || "/default.jpg";//if profile.name is set use that - else use username
  }
});
