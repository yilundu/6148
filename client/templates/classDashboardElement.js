Template.classDashboardElement.events({
  "click .btn.btn-warning": function(){
    var thisContext = this;
    var string = "Are you sure you want to remove this class? All payments will be refunded."
    //remove class from class db
    bootbox.confirm(string, function(result)
    {
    if (result===true){

      console.log("attempted to remove class with id =" + thisContext._id);
      Meteor.call('removeClass', thisContext._id);
      //classes.remove({_id: this._id});
      //unenroll all enrolled users
      var enrolledUsers = user.find().fetch();
      for(var i = 0 ; i < enrolledUsers.length ; i++){
        var currUser = enrolledUsers[i];
        var newClasses = currUser.classes;
        var index = newClasses.indexOf(thisContext._id);
        //remove class from user's class list
        newClasses.splice(index,1);
        Meteor.call('updateClass', currUser._id, newClasses);
        //user.update(currUser._id, {$set : {classes: newClasses}});
      }}
      else{}
    });
  },
  "click .btn.btn-primary" : function(){
    Router.go('/editClass/'+Template.parentData()._id);

  }
});
