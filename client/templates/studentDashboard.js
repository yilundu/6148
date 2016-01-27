

Template.studentDashboard.helpers({
  classes: function(){

    //check if db is available
    if(!user){
      return [];
    }

    var classIds = user.findOne({meteor: Meteor.userId()});//there should only be one entry so use findOne()
    var classResults = [];//students classes

    if(!classIds){
      return;
    }

    classIds = classIds.classes;

    for(var i = 0; i < classIds.length; ++i){
      classResults.push(classes.findOne({_id: classIds[i]}));
    }


    console.log("Entered classes helper function" + classes);
    return classResults.sort(function (a,b) {
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
    //check if user db is available
    if(!user){
      return 0;
    }
    var results = user.findOne({meteor: Meteor.userId()});
    if(results){
      //return number of classes taken by current user
      return results.classes.length;//there should only be one entry so use findOne()
    }
    else{
      return 0;
    }
  },

  transactionHistory: function(){
    if(Meteor.user() && Meteor.user().profile){
      if(!Meteor.user().profile.transactionhistory)
      {
        console.log("Set transactionhistory to []");
        Meteor.users.update(Meteor.userId(), {$set : {"profile.transactionhistory" : []}});
      }
      return Meteor.user().profile.transactionhistory.reverse();
    }
    else {
      return [];
    }
  },

  notifications: function(){
    console.log("DEPS.ACTIVE="+Deps.active);
    if(Meteor.user() && Meteor.user().profile)
    {

      var studentNotifs = [];
      if(Meteor.user().profile.notifs)
      {
        console.log("notifications entered");
        Meteor.user().profile.notifs.forEach(function(entry){
          if(entry.type == "student"){
            studentNotifs.push(entry);
          }
        });
      }
      return studentNotifs.reverse();
    }
  }


});
