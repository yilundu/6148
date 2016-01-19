Template.studentDashboard.helpers({
  classes: function(){
    var classIds = user.findOne({meteor: Meteor.userId()});//there should only be one entry so use findOne()
    var classes = [];

    if(!classIds){
      return;
    }

    classIds = classIds.classes;

    for(var i = 0; i < classIds.length; ++i){
      classes.push(classes.find({_id: classIds[i]}));
    }

    return classes;
  },

  numClasses: function(){
    //return number of classes taken by current user
    return  user.findOne({meteor: Meteor.userId()}).classes.length;//there should only be one entry so use findOne()
  }
});
