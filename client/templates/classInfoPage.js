Template.classInfoPage.events({
  'click #teacherPostBtn' : function(){
    console.log(this);
    var postText = $('#teacherPostField').val();
    var updatedAnnouncements = this.classAnnouncements;

    var displayName = Meteor.user().username;
    if(Meteor.user().profile.name)//if they've defined a display names
    {
      displayName = Meteor.user().profile.name;
    }

    //add new announcement object to beginning of array - thus when the array is looped through using #each in handlebars - it renders most recent at the top
    updatedAnnouncements.unshift({
      displayName: displayName,
      userId: Meteor.userId(),
      postText: postText,
      timePosted: new Date()});

    classes.update(this._id, {$set : {classAnnouncements: updatedAnnouncements}});

  },
  'click #studentPostBtn' : function(){

    console.log(this);
    var postText = $('#studentPostField').val();
    var updatedComments = this.studentComments;

    var displayName = Meteor.user().username;

    if(Meteor.user().profile.name)//if they've defined a display names
    {
      displayName = Meteor.user().profile.name;
    }

    //add new announcement object to beginning of array - thus when the array is looped through using #each in handlebars - it renders most recent at the top
    updatedComments.unshift({
      displayName: displayName,
      userId: Meteor.userId(),
      postText: postText,
      timePosted: new Date()});

    classes.update(this._id, {$set : {studentComments: updatedComments}});

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
