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
    classes.update(Template.parentData()._id, {$set : {classAnnouncements: announcements}});

  }
});
