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

      /*Do all the necessary database updates to unenroll the user form class*/

      //remove the class from the array
      //then, update the server side db document with the updated currentClasses array
      currentClasses.splice(indexOfClass,1);
      Meteor.call('updateCurrentClass', Meteor.userId(), currentClasses)

      //remove the student from the class student list
      var classStudentList = classes.findOne(this._id);
      if(classStudentList){
        classStudentList = classStudentList.studentList;
        console.log("classList is " + classStudentList);

        //find indexof user in student list of class
        var indexOf = classStudentList.indexOf(Meteor.userId());
        if(indexOf == -1){
          throw "userid not found in classStudentList "
        }
        //splice matching index out of classStudentList
        classStudentList.splice(indexOf, 1);

        //call server side method to update student list of class with this._id
        Meteor.call('updateStudentList', this._id, classStudentList);

      }
      else{

        throw "Error: No class found matching the given classid - can't remove student from class studnetlist!";
      }

      //decrement student count in the class db
      Meteor.call('decrementStudentNumber', this._id);



      console.log("Successfully unenrolled user from class!");
    }


  }
});
