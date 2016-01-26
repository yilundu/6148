Template.sellerDashboard.helpers({
  classes: function(){
    //return classes taught by the current user
    return classes.find({teacherId: Meteor.userId()}).fetch();
  },

  numClasses: function(){
    //return number of classes taught by current user
    return classes.find({teacherId: Meteor.userId()}).count();
  },
  transactionHistory: function(){
    return Meteor.user().profile.transactionhistory.reverse();
  },
  reviews: function(){
    results = classes.find({teacherId: Meteor.userId()}).fetch();
    var array = [];
    results.forEach(
    function(elem){
      for(var i=0; i<elem.studentReviews.length; i++){
        array.push(elem.studentReviews[i])
      }

    });
    return array;
  }

});
