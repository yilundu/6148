Template.sellerDashboard.helpers({
  classes: function(){
    //return classes taught by the current user
    return classes.find({teacherId: Meteor.userId()}).fetch().sort(function (a,b) {
      if (a.isOver && b.isOver){
        return (a.unixtime > b.unixtime);
    }
      else if (a.isOver && !b.isOver){
        return 1;
      }
      else if (!a.isOver && b.isOver){
        return -1;
      }
    else{
      return (a.unixtime > b.unixtime);
    }
    });
  },

  numClasses: function(){
    //return number of classes taught by current user
    return classes.find({teacherId: Meteor.userId()}).count();
  },
  transactionHistory: function(){
    if(Meteor.user() && Meteor.user().profile){
      if(!Meteor.user().profile.transactionhistory)
      {
        Meteor.users.update(Meteor.userId(), {$set : {"profile.transactionhistory" : []}});
      }
      return Meteor.user().profile.transactionhistory.reverse();
    }
    else {
      return [];
    }
  },
  reviews: function(){
    results = classes.find({teacherId: Meteor.userId()}).fetch();
    var array = [];
    results.forEach(
    function(elem){
      for(var i=0; i<elem.studentReviews.length; i++){
        var string1="Review for "+elem.title+": "+elem.studentReviews[i].text+" Rating: "+elem.studentReviews[i].rating+"/5";
        console.log(string1);
        array.push(string1);
      }

    });
    return array;
  },


  notifications: function(){
    if(Meteor.user() && Meteor.user().profile)
    {

      var studentNotifs = [];
      if(Meteor.user().profile.notifs)
      {
        console.log("notifications entered");
        Meteor.user().profile.notifs.forEach(function(entry){
          if(entry.type == "teacher"){
            studentNotifs.push(entry);
          }
        });
      }
      return studentNotifs.reverse();
    }
  }

});
