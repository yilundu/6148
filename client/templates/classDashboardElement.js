 Template.classDashboardElement.events({
  "click .btn.btn-warning": function(){
    var thisContext = this;
    var string = "Are you sure you want to remove this class? All payments will be refunded."
    //remove class from class db
    if (thisContext.unixtime > moment().unix()){
    console.log(thisContext.unixtime);
    bootbox.confirm(string, function(result)
    {


    //if teacher confirmed cancellation of class - proceed with cancellation procedure
    if (result===true){

      //var enrolledUsers = user.find({thisContext._id}).fetch();
      //go through the formerly enrolled users and update their class lists and refund their money
      time = new Date;
      user.find({classes: thisContext._id}).forEach(
        function(elem){
          var string1 = "Recieved $"+thisContext.cost+" for class cancellation of "+thisContext.title+"("+ thisContext._id + ") at time: "+time;
          Meteor.call('addCash', elem.meteor, thisContext.cost);
          console.log(elem.meteor);
          console.log(thisContext.cost);
          Meteor.call('transactionHistory', elem.meteor, string1);
         /*var string2 = "Refunded $"+(-1*thisContext.newcost)+" for class cancellation of "+thisContext.title+"("+ thisContext._id + ") at time: "+time;
          Meteor.call('addCash',thisContext.teacherId, -1*thisContext.newcash);
          Meteor.call('transactionHistory', thisContext.teacherId, string2);*/

      });
        Meteor.call('removeClasses', thisContext._id);
    //  user.update({},{$pull: {classes: thisContext._id}});
/*
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
*/
      //unenroll all enrolled users

      //finally remove the class from the classes db
      Meteor.call('removeClass', thisContext._id);
    }
    else
    {

    }});
}
    else{
    sAlert.error('Class has already occured!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});

    }

},

  "click .btn-primary": function(){
    var thisContext = this;
    if (thisContext.unixtime < moment().unix()){
      //class has already occured
      sAlert.error('Class has already occured!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});
    }
    else{
      Router.go('/editClass/'+this._id);
    }
  }

});

Template.classDashboardElement.helpers({
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
