Template.classDashboardElement.events({
  "click .btn.btn-warning": function(){
    console.log("attempted to remove class with id =" + this._id);

    //remove class from class db
    classes.remove({_id: this._id});
    //unenroll all enrolled users
    var enrolledUsers = user.find().fetch();
    for(var i = 0 ; i < enrolledUsers.length ; i++){
      var currUser = enrolledUsers[i];
      var newClasses = currUser.classes;
      var index = newClasses.indexOf(this._id);
      //remove class from user's class list
      newClasses.splice(index,1);
      user.update(currUser._id, {$set : {classes: newClasses}});
    }
  }
});
