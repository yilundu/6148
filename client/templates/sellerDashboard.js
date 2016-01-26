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
        var string1="Review for "+elem.title+": "+elem.studentReviews[i].text+"Rating: "+elem.studentReviews[i].rating+"/5";
        console.log(string1);
        array.push(string1);
      }

    });
    return array;
  }

});
