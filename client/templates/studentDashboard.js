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
    return classResults;
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
    return Meteor.user().profile.transactionhistory;
  }


});
