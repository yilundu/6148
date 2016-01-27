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
  'click #example1' :function(){
    $("#buyers").toggle("medium");
    $("#buyerstitle").toggle("medium");
  },
  
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
      timePosted: moment().format("MMMM Do YYYY, h:mm a")});

    console.log("entered click teacherPostBtn, this._id = "+this._id+" postText= "+postText);
    Meteor.call('updateAnnouncements', this._id, updatedAnnouncements);
    //classes.update(this._id, {$set : {classAnnouncements: updatedAnnouncements}});
    sAlert.success('Information Updated!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});

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
      timePosted: moment().format("MMMM Do YYYY, h:mm a")});
      //rating: $('#rating').data('userrating');
    Meteor.call('updateComments', this._id, updatedComments);
    sAlert.success('Information Updated!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});

   // classes.update(this._id, {$set : {studentComments: updatedComments}});

 },
 'click #saveReviewBtn' : function(){
   var reviewText = $('#reviewField').val();
   var starRating = $('#rating').data('userrating');//TODO: implement front end input of star rating
   if(starRating == undefined || !starRating)
   {
     starRating = 0;
   }
   var reviewer = Meteor.userId();//the user who wrote the review

   var reviewTime = new Date();

   console.log("Called savereviewbtn");
   Meteor.call('addClassReview',this._id, reviewer, starRating, reviewText, reviewTime);
   sAlert.success('Information Updated!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});


 },
 'click #editReviewBtn' : function(){
   console.log("click #editReviewBtn");
   var reviewText = $('#reviewField').val();
   var starRating = $('#rating').data('userrating');//TODO: implement front end input of star rating
   var reviewer = Meteor.userId();//the user who wrote the review
   var reviewTime = new Date();

   console.log("in click #editreview this_id = "+this._id);
   Meteor.call('editClassReview',this._id, reviewer, starRating, reviewText, reviewTime);
   sAlert.success('Information Updated!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});


 },
 'click #deleteReviewBtn' : function(){
  var string = "Are you sure you want to delete your review?" ;
  var thisContext = this;
  bootbox.confirm(string, function(result){
       if (result === false) {}
        else{
   console.log("clicked remove review. this._id = "+ thisContext._id);
   Meteor.call('removeClassReview',thisContext._id, Meteor.userId());
 }});
 }
});

Template.classInfoPage.helpers({
  isTeacher : function(){
    if(Meteor.user()){//make sure user is loaded
      console.log("isteacher: " + Meteor.userId() +"/"+ this.teacherId);
      return (Meteor.userId() === this.teacherId);
    }
    else
    {
      return false;
    }
  },
  isOver : function(){
    return this.isOver;
  },
  isStudent: function(){
    thisContext = this;
    if(user.findOne({meteor: Meteor.userId(), classes: thisContext._id})){
      console.log("Is a student!");
      return true;
    }
    else{
      console.log("Is not a student!");
      return false;
    }
  },
  review: function(){
    var avgreview = classes.findOne(this._id).studentReviews;
    var total = 0;
    for(var i = 0; i < avgreview.length; i++) {
        total += avgreview[i].rating;
    }
    if(total == 0)
    {
      return "(No Ratings)";
    }
    else{
      var avg = total / avgreview.length
      return avg;
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
   // var review = getUserReview(getClassId());
    var classid = this._id;
    var specificclass = classes.findOne(classid);

    for (var i=0; i<specificclass.studentReviews.length ;i++){
      if (specificclass.studentReviews[i].reviewer == Meteor.user()._id){
        return true;
      //  console.log("Has Reviewed!")
      }
    }

    return false;

  },
  allClassReviews: function(){
    return this.studentReviews;
  },
  datahelper:function(){
    var classcost = this.cost;
    var a = [.5*classcost*((1./3 +2)/(1./3 +1)),.5*classcost*((2./3 +2)/(2./3 +1)),.5*classcost*((3./3 +2)/(3./3 +1)),.5*classcost*((4./3 +2)/(4./3 +1)),.5*classcost*((5./3 +2)/(5./3 +1)),.5*classcost*((6./3 +2)/(6./3 +1)), .5*classcost*((7./3 +2)/(7./3 +1)),.5*classcost*((8./3 +2)/(8./3 +1)),.5*classcost*((9./3 +2)/(9./3 +1)),.5*classcost*((10./3 +2)/(10./3 +1)),.5*classcost*((11./3 +2)/(11./3 +1)),.5*classcost*((12./3 +2)/(12./3 +1)),.5*classcost*((13./3 +2)/(13./3 +1)), .5*classcost*((14./3 +2)/(14./3 +1)), .5*classcost*((15./3 +2)/(15./3 +1))];
    return ("[" + a.toString() +"]")
  }

});
