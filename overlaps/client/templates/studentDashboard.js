Template.studentDashboard.helpers({
  classes: function(){
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

    //return number of classes taken by current user
    return user.findOne({meteor: Meteor.userId()}).classes.length;//there should only be one entry so use findOne()
  },


});
