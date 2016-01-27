Template.studentDashboardElement.events({
  "click .btn.btn-warning": function(){
    var thisContext = this;

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
      string = "Are you sure you want to drop this class?";
      if (thisContext.unixtime < moment().unix()){
          sAlert.error('Class has already occured!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});

      }
      else {
      bootbox.confirm(string, function(result)
    {

      if (result===true){

      /*Do all the necessary database updates to unenroll the user form class*/

      //remove the class from the array
      //then, update the server side db document with the updated currentClasses array
      currentClasses.splice(indexOfClass,1);
      Meteor.call('updateCurrentClass', Meteor.userId(), currentClasses)
      date = new Date();
      //remove the student from the class student list
      var classStudentList = classes.findOne(thisContext._id);
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
        Meteor.call('updateStudentList', thisContext._id, classStudentList);
        //decrement student count in the class db
        Meteor.call('decrementStudentNumber', thisContext._id);

        //money stuff
        var string1 = "Refunded $"+thisContext.cost+" for dropping class "+classes.findOne(thisContext._id).title+"("+ thisContext._id + ") at time: "+date;
        console.log(thisContext.cost);
        Meteor.call('addCash', Meteor.user()._id, thisContext.cost);
        Meteor.call('transactionHistory', Meteor.user()._id, string1);
       /*
        var string2 = "Refunded $-"+thisContext.newcost+" for  student dropping class "+classes.findOne(thisContext._id).title+"("+ thisContext._id + ") at time: "+date;
        Meteor.call('addCash', Meteor.user()._id, (-1*this.newcost));
        Meteor.call('transactionHistory', Meteor.user()._id, string2);
*/
        console.log("Successfully unenrolled user from class!");

      }
      else{

        throw "Error: No class found matching the given classid - can't remove student from class studnetlist!";
      }




    }
    else{

    }
    })
    }}


  }
});


Template.studentDashboardElement.helpers({
  dateText: function(){
    var momentObject = moment(this.unixtime*1000);//unix time is in seconds, exepcted in milliseconds
    //console.log(this.unixtime);
    //console.log(momentObject);
    if (this.unixtime < moment().unix()){
      //class has already occured
      console.log("has already occured.");
      return "Occurred "+momentObject.calendar();
    }
    else{
      console.log("is scheduled to occur in the future.");
      return "Scheduled for "+momentObject.calendar();
    }
  }
});
