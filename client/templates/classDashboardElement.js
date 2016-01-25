Template.classDashboardElement.events({
  "click .btn.btn-warning": function(){
    console.log("attempted to remove class with id =" + this._id);
    var string = "Are you sure you want to remove this class? All payments will be refunded."
    //remove class from class db
    bootbox.confirm(string, function(result)
    {
    if (result===true){
    Meteor.call('removeClass', this._id);
    //classes.remove({_id: this._id});
    //unenroll all enrolled users
    var enrolledUsers = user.find().fetch();
    classes.find({}).forEach(
    function(elem){
      var newcost =(1*elem.cost*(elem.studentNumber/3+2)/(elem.studentNumber/3+1)/2).toFixed(2);  
      Meteor.call('setnewCash',elem._id, newcost);

    }


    );
    for(var i = 0 ; i < enrolledUsers.length ; i++){
      var currUser = enrolledUsers[i];
      var newClasses = currUser.classes;
      var index = newClasses.indexOf(this._id);
      //remove class from user's class list
      newClasses.splice(index,1);
      Meteor.call('updateClass', currUser._id, newClasses);
      string = "Refunded $"+cost+"for class "+classes.findOne(classid).title+"("+ classid + ") at time: "+time;
      Meteor.call('transactionHistory', Meteor.user()._id, string);
      //user.update(currUser._id, {$set : {classes: newClasses}});
    }}
    else{}
  });
  }
});
