Template.classDashboardElement.events({
  "click .btn.btn-warning": function(){
    var thisContext = this;
    var string = "Are you sure you want to remove this class? All payments will be refunded."
    //remove class from class db
    bootbox.confirm(string, function(result)
    {

    //if teacher confirmed cancellation of class - proceed with cancellation procedure
    if (result===true){

      var enrolledUsers = user.find().fetch();
      //go through the formerly enrolled users and update their class lists and refund their money
      for(var i = 0 ; i < enrolledUsers.length ; i++){
        var currUser = enrolledUsers[i];
        var newClasses = currUser.classes;//THIS IS AN ARRAY OF CLASSIDS
        var index = newClasses.indexOf(thisContext._id);
        var removedClassId = newClasses[index];
        var removedClassObject = classes.findOne(removedClassId);
        console.log("newClasses: "+newClasses);
        console.log("index: "+index);
        console.log("removedClassId: "+removeClassId);
        console.log("removedClassObject: "+removedClassObject);
        //remove class from user's class list
        newClasses.splice(index,1);
        Meteor.call('updateClass', currUser._id, newClasses);
        string = "Refunded $"+removedClassObject.newCost+"for class "+classes.findOne(classid).title+"("+ classid + ") at time: "+time;
        Meteor.call('transactionHistory', Meteor.user()._id, string);
        //user.update(currUser._id, {$set : {classes: newClasses}});
      }

      //unenroll all enrolled users
      classes.find({}).forEach(
        function(elem){
          var newcost =(1*elem.cost*(elem.studentNumber/3+2)/(elem.studentNumber/3+1)/2).toFixed(2);
          Meteor.call('setnewCash',elem._id, newcost);

        }
      );

      //finally remove the class from the classes db
      Meteor.call('removeClass', thisContext._id);
    }
    else
    {

    }
  });
  }
});
