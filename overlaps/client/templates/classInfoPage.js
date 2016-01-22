Template.classInfoPage.events({
  'click #teacherPostBtn' : function(){
    console.log(this);
    var postText = $('#teacherPostField').val();
    var updatedAnnouncements = this.classAnnouncements;

    //add new announcement object to beginning of array - thus when the array is looped through using #each in handlebars - it renders most recent at the top
    updatedAnnouncements.unshift({
      displayName: Meteor.user().profile.name,
      userId: Meteor.userId(),
      postText: postText,
      timePosted: new Date()});

    classes.update(this._id, {$set : {classAnnouncements: updatedAnnouncements}});
    console.log("Posted announcement: "+displayName + userId + postText + timePosted);
  },
  'submit #studentPostBtn' : function(){
    var postText = $('#studentPostField').val();
  }
});

Template.classInfoPage.helpers({
  isTeacher : function(){
    if(Meteor.user()){//make sure user is loaded
      return Meteor.userId() === this.teacherId;
    }
    else
    {
      return false;
    }
  },

});
