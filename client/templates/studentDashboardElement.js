Template.studentDashboardElement.events({
  "click .btn.btn-warning": function(){
    if(!user){
      alert("User db not loaded!");
      return;
    }


    var currentClasses = user.findOne({meteor: Meteor.userId()});//TODO: Make sure there is really only one matching user document
    if(!currentClasses){
      alert('No matching classes!')

      return;
    }
    else {
      currentClasses = currentClasses.classes;
    }
    console.log(currentClasses);
    var indexOfClass = currentClasses.indexOf(this._id);
    if(indexOfClass === -1)
    {
      throw ("Error in studentDashboardElement.events, class to remove could not be found");
      return;
    }
    else{

      //remove the class
      currentClasses.splice(indexOfClass,1);


      console.log(currentClasses.splice(indexOfClass,1));

      //update the list of classes user is enrolled in, in user db
      var getId = user.findOne({meteor: Meteor.userId()})._id;//do this to get around problem with untrusted code only being able to update with _id

      //TODO: we will need to refactor the overall database structure to get around this problem (bc once we turn off autopublish this workaround won't work anymore)
      Meteor.call('updateCurrentClass', getId, currentClasses)
      //user.update(getId, {$set: {classes: currentClasses}});
      //decrement student count in the class db
      Meteor.call('decrementStudentNumber', this._id);
      //classes.update(this._id, {$inc: {studentNumber: -1}});
      console.log("Successfully unenrolled user from class!");
    }


  }
});
