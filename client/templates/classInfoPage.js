//hacky af
var getClassId = function(){
  var pathnamePieces = window.location.pathname.split('/');
  return pathnamePieces[pathnamePieces.length-1];
}

var getUserReview = function(classId){
  console.log("in getUserreivew");
  console.log(classId);
  console.log(classes.findOne(classId));
  var studentReviews = classes.findOne(classId);
  if(!studentReviews){
    return "";
  }
  else{
    studentReviews = studentReviews.studentReviews;
  }

  for(var i = 0 ; i < studentReviews.length ; i++)
  {
    var currReview = studentReviews[i];
    if(currReview.reviewer === Meteor.userId())
    {
      return currReview;
    }

  }
  //else nothing found
  console.log("No user reviews found!");
  return "";
}




Template.classInfoPage.events({
  'click #teacherPostBtn' : function(){
    console.log(this);
    var postText = $('#teacherPostField').val();
    var updatedAnnouncements = this.classAnnouncements;

    var displayName = Meteor.user().username;
    if(Meteor.user().profile.name)//if they've defined a display names
    {
      displayName    = Meteor.user().profile.name;
    }

    //add new announcement object to beginning of array - thus when the array is looped through using #each in handlebars - it renders most recent at the top
    updatedAnnouncements.unshift({
      displayName: displayName,
      userId: Meteor.userId(),
      postText: postText,
      timePosted: new Date()});

    console.log("entered click teacherPostBtn, this._id = "+this._id);
    Meteor.call('updateAnnouncements', this._id, updatedAnnouncements);
    //classes.update(this._id, {$set : {classAnnouncements: updatedAnnouncements}});

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
    Meteor.call('updateComments', this._id, updatedComments);
   // classes.update(this._id, {$set : {studentComments: updatedComments}});

 },
 'click #saveReviewBtn' : function(){
   var reviewText = $('#reviewField').val();
   var starRating = 4;//TODO: implement front end input of star rating
   var reviewer = Meteor.userId();//the user who wrote the review

   var reviewTime = new Date();

   console.log("Called savereviewbtn");
   Meteor.call('addClassReview',this._id, reviewer, starRating, reviewText, reviewTime);

 },
 'click #editReviewBtn' : function(){
   console.log("click #editReviewBtn");
   var reviewText = $('#reviewField').val();
   var starRating = 4;//TODO: implement front end input of star rating
   var reviewer = Meteor.userId();//the user who wrote the review
   var reviewTime = new Date();

   console.log("in click #editreview this_id = "+this._id);
   Meteor.call('editClassReview',this._id, reviewer, starRating, reviewText, reviewTime);

 },
 'click #deleteReviewBtn' : function(){
   console.log("clicked remove review. this._id = "+ this._id);
   Meteor.call('removeClassReview',this._id, Meteor.userId());
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
  studentList: function(){
    if(this.studentList)
    {
      console.log(this.studentList);
      return this.studentList;
    }
    else{
      return [];
    }
  },
  userReview: function(){//get's the user's current review for this class if they have one - otherwise reutrns null
    if(!Meteor.userId())
    {
      return null;
    }
    var studentReviews = classes.findOne(this._id).studentReviews;
    for(var i = 0 ; i < studentReviews.length ; i++)
    {
      var currReview = studentReviews[i];
      if(currReview.reviewer === Meteor.userId())
      {
        return currReview;
      }

    }

    console.log("No user reviews found!");
    return null;

  },

  userReviewText: function(){
    var review = getUserReview(getClassId());
    if(review){
      return review.text;
    }
    else {
      return "";
    }
  },

  userHasReviewed: function(){
    var review = getUserReview(getClassId());
    if(!review)
    {
      return false;
    }
    else{
      return getUserReview(getClassId()).text.length !== 0;
    }

  }

});
