/***** CODE FOR UPDATING CLASSES AFTER THEY HAVE ENDED ******/
//source: http://richsilv.github.io/meteor/scheduling-events-in-the-future-with-meteor/
var performEndClass = function()
{
  console.log("Ran check");
  var results = FutureTasks.find({triggered: false}).fetch();
  //console.log(results.length);
  //console.log(results);
  console.log("Current unix time: "+moment().unix());
  for(var i = 0 ; i < results.length ; i++){
    var each = results[i];
    console.log("Unix time: "+ each.date);

    //console.log(each);
    //console.log("Result.date = "+each.date);
    //console.log("Current Unix Time: "+moment().unix());
    console.log(moment().unix() + " > "+each.date + " = "+ (moment().unix() > each.date));
    if(moment().unix() > each.date)
    {
      console.log("EVENT TRIGGERED! id");

      //call update class on end
      UpdateClassOnEnd(each.class_id);

      //push notificaton to the teacher that they have been reviewed
      Meteor.call('endClass', each.class_id);
      FutureTasks.update({class_id : each.class_id}, {$set: {triggered: true}});//TODO: change this to rmeoved

    }
  }
};



var startCheck = function(id)
{
  console.log(id);
  SyncedCron.add({
    name: id,
    schedule: function(parser){
      return parser.text('every 15 seconds');
      //return parser.recur().every().second();
    },
    job: function(){
      performEndClass();
      return id;
    }
  });

};

var scheduleClass = function (details){



  FutureTasks.insert(details);



  console.log("Added Class with id: "+details.class_id + " for time "+ details.date);
  return true;
};

var updateScheduledClass = function (details){
  FutureTasks.update({'details.class_id' : details.class_id}, {$set : {details: details}});
}

Meteor.startup(function(){
  var tasksToRemove = [];

  startCheck("checkClassesEveryMinute");

  SyncedCron.start();
});

/***** FIN ******/

var getUserDisplayName = function(id)
{
  var teacherName;
  var teacherObject = Meteor.users.findOne(id);
  if(teacherObject && teacherObject.profile && teacherObject.profile.name)
  {
    teacherName = teacherObject.profile.name;
  }
  else {
    teacherName = teacherObject.username;
  }

  return teacherName;
}

Meteor.methods({
  'insertPlayerClass': function(id, classid){
        //add class to user's class list
        var matchClass = classes.findOne(classid);
        var classStudentList;
        if(matchClass){
          classStudentList = matchClass.studentList;
          console.log("classList is " + classStudentList);
          //insert the students id into the class's studentList
          classStudentList.unshift(id);
          classes.update(classid, {$set : {studentList : classStudentList}});

          //notify class teacher that a student has enrolled
          //push notificaton to the teacher that they have been reviewed
          var title = matchClass.title+": new student enrolled!";

          var message = getUserDisplayName(id) + " enrolled in your class.";
          var type = "teacher";
          var options = null;
          Meteor.call('pushNotification', matchClass.teacherId, title, message, type, options);


        }
        else{
          throw "matching class not found";
        }

        user.update({meteor: id}, {$push: {classes: classid}});


      },

      'createClass': function(address, class_date, user_title, user_cost, user_description,
        user_subject, user_id, username, actualusername, latitude, longitude,unixtime){
        var classid;
        if(username){
         classid = classes.insert({
          title: user_title,
          subject: user_subject,
          cost: user_cost,
          teacher: username,
          description: user_description,
          createdAt: class_date,
        studentNumber: 0, // current time
        teacherId: user_id,
        classAnnouncements: [],//empty at creation
        studentComments: [],//empty at creation
        studentList: [],//empty at creation
        studentReviews: [],
        latitude: latitude,
        longitude: longitude,
        address: address,
        studentReviews: [],
        newcost: user_cost,
        unixtime: unixtime,
        triggered: false,
        isOver: false
      });
       }
       else{
        Meteor.users.update(user_id,{$set:{"profile.name": actualusername}});
        classid = classes.insert({
         title: user_title,
         subject: user_subject,
         cost: user_cost,
         teacher: actualusername,
         description: user_description,
         createdAt: class_date,
	        studentNumber: 0, // current time
	        teacherId: user_id,
	        classAnnouncements: [],//empty at creation
	        studentComments: [],//empty at creation
	        studentList: [],//empty at creation
          latitude: latitude,
          longitude: longitude,
          address: address,
          studentReviews: [],
          newcost: user_cost,
          unixtime: unixtime,
          triggered: false,
          isOver: false
        });

      }
      //set up listener to fire when class date occurs
      scheduleClass({date: unixtime, class_id: classid, triggered: false});

    },
    'editClass': function(classId,address, class_date, user_title, user_cost, user_description, user_subject, user_id, username, actualusername, latitude, longitude, time, unixtime){



      if(username){
       classes.update(classId,{$set : {
        title: user_title,
        subject: user_subject,
        cost: user_cost,
        teacher: username,
        description: user_description,
        createdAt: class_date,
        teacherId: user_id,
        latitude: latitude,
        longitude: longitude,
        address: address,
        newcost: 2*user_cost,
      }});
     }
     else{
      Meteor.users.update(user_id,{$set:{"profile.name": actualusername}});
      classes.update(classId,{$set: {
       title: user_title,
       subject: user_subject,
       cost: user_cost,
       teacher: actualusername,
       description: user_description,
       createdAt: class_date,
       teacherId: user_id,
       latitude: latitude,
       longitude: longitude,
       address: address,
       newcost: 2*user_cost,
     }
   });

    }

    var matchClass = classes.findOne(classId);
    if(matchClass){
      var studentList = matchClass.studentList;
      for(var i = 0 ; studentList.length ; i++){
        var studentId = studentList[i];

        var title = matchClass.title + ": Class Info Changed!";
        var message = "Some of the class information for this class was changed.";
        var type = "student";
        var options = null;
        Meteor.call('pushNotification', matchClass.teacherId, title, message, type, options);

      }
    }
      //set up listener to fire when class date occurs
      updateScheduledClass({date: unixtime, class_id: classId, triggered: false});

    },
    'incrementStudentNumber': function(classid){
      console.log(classes.findOne(classid,{studentNumber: 1, _id: 0}));
      classes.update({_id:classid},{$inc: {studentNumber: 1}});
      console.log(classes.findOne(classid,{studentNumber: 1, _id: 0}));
    },
    'editUserInfo': function(user_id, name, age, about){
      Meteor.users.update({_id: user_id}, {$set: {"profile.name": name, "profile.age": age, "profile.about": about}});
    },
    'editUserPhoto': function(user_id, photo){
      Meteor.users.update({_id: user_id},{$set: {"profile.binary": photo}});

    },

    //updates class list of user with 'user_id'
    //note _id of user IS NOT the same as Meteor.userId() - use meteor instead
    'updateCurrentClass': function(user_id, currentClasses){
    	user.update({meteor: user_id}, {$set: {classes: currentClasses}});

    },

    //updates student list of class with classid
    'updateStudentList': function(class_id, studentList){
      classes.update(class_id, {$set: {studentList: studentList}});
    },

    'decrementStudentNumber': function(classid){

      console.log("before calling decrementStudentNumber - student number is now: "+classes.find(classid).studentNumber);
      classes.update({_id: classid}, {$inc: {studentNumber: -1}});

      console.log("Called decrementStudentNumber - student number is now: "+classes.find(classid).studentNumber);
    },
    'updateAnnouncements': function(classid, classAnnouncements){
    	classes.update(classid, {$set : {classAnnouncements: classAnnouncements}});

      //push notifications to all students

      var thisClass = classes.findOne(classid);

      thisClass.studentList.forEach(function(e){
        //push notificaton to the students that there is a new class announcement
        var title = thisClass.title+": new class announcement!";

        var message = thisClass.teacher + " sent to the class a new announcement";
        var type = "student";
        var options = null;
        Meteor.call('pushNotification',e, title, message, type, options);
        console.log("Sent push notification!");


      });

    },
    'updateComments': function(classid, updatedComments){

    	classes.update(classid, {$set : {studentComments: updatedComments}});

      var thisClass = classes.findOne(classid);
      //notify teacher that user has commented
      //push notificaton to the teacher that one of their classes has received a comment
      var title = thisClass.title+": new student comment!";
      var message = "Your class received a new comment.";
      var type = "student";
      var options = null;
      Meteor.call('pushNotification',thisClass.teacherId, title, message, type, options);
    },
    'removeClass': function(id){
    	classes.remove({_id: id});
    },
    'endClass': function(id){//class has ended due to being over - not being cancelled
    	classes.update({_id: id}, {$set : {isOver: true}});
      //push notifications to all students

      var thisClass = classes.findOne(id);

      thisClass.studentList.forEach(function(e){
        //push notificaton to the teacher that they have been reviewed
        var title = thisClass.title+" has reached it's start time!";
        var message = thisClass.title+" is beginning.";
        var type = "teacher";
        var options = null;
        Meteor.call('pushNotification',e, title, message, type, options);
        console.log("Sent push notification!");


      });
    },
    'updateClass': function(id, newClasses){
    	user.update(id, {$set : {classes: newClasses}});
    },
    'addVenmo': function(id, authentication_token){
      Meteor.users.update(id,{$set: {"profile.venmo": authentication_token, "profile.authenticated": true}});
    },
    'addNewUser': function(id){
      user.insert({meteor: id});
    },
    'setCash': function(id){
      Meteor.users.update(id, {$set: {"profile.balance": 0.00}});
    },
    'addClassReview': function(classId, reviewerUserId, rating, text, time){
      var ratedClass = classes.findOne(classId);
      console.log("called added class review on server");
/*
      if(!ratedClass){
        throw "no matching class found";
        return;
      }*/
      //var reviews = ratedClass.studentReview;
      if (ratedClass.studentReviews) {
        reviews = ratedClass.studentReviews;
      }
      else{
        reviews = [];
      }
      reviews.push({
        reviewer: reviewerUserId,
        rating: rating,
        text: text,
        timeReviewed: time});

      classes.update({_id: classId}, {$set : {studentReviews: reviews}});

      //push notificaton to the teacher that they have been reviewed
      var title = "New review for: "+ratedClass.title + "!";
      var reviewerName;
      var reviewerObject = Meteor.users.findOne(reviewerUserId);
      if(reviewerObject && reviewerObject.profile && reviewerObject.profile.name)
      {
        reviewerName = reviewerObject.profile.name;
      }
      else {
        reviewerName = reviewerObject.username;
      }
      var message = reviewerName + " rated "+ratedClass.title+" "+rating+" stars - saying: " + text;
      var type = "teacher";
      var options = null;
      Meteor.call('pushNotification',ratedClass.teacherId, title, message, type, options);
      console.log("Sent push notification!");

    },
    'editClassReview' : function(classId, reviewerUserId, rating, text, time){
      var reviews = classes.findOne(classId);
      console.log("called edited class review on server");

      if(!reviews){
        console.log("no matching class found");
        throw "no matching class found";
        return;
      }
      console.log("check 1");
      reviews = reviews.studentReviews;

      var index = -1;
      //remove previous version of review
      for(var i = 0; i < reviews.length ; i++)
      {
        if(reviews[i].reviewer == reviewerUserId)
        {
          index = i;
        }

      }

      console.log("check 2 i="+index);
      if(index < 0)
      {
        console.log("previous review not found");
        throw "previous review not found";
      }
      else{
        reviews.splice(index, 1);
      }


      //add new version of review
      reviews.push({
        reviewer: reviewerUserId,
        rating: rating,
        text: text,
        timeReviewed: time});

      console.log("check 3");
      console.log("edited review - new reviews is now: "+reviews);
      classes.update({_id: classId}, {$set : {studentReviews: reviews}});

      //push notificaton to the teacher that they have been reviewed
      var title = "New review for: "+reviews.title + "!";
      var reviewerName;
      var reviewerObject = Meteor.users.findOne(reviewerUserId);
      if(reviewerObject && reviewerObject.profile && reviewerObject.profile.name)
      {
        reviewerName = reviewerObject.profile.name;
      }
      else {
        reviewerName = reviewerObject.username;
      }
      console.log("check 4 +"+reviewerName);
      var message = reviewerName + " gave "+reviews.title+" "+rating+" stars - saying: " + text;
      var type = "teacher";
      var options = null;
      Meteor.call('pushNotification',classes.findOne(classId).teacherId, title, message, type, options);
      console.log("Sent push notification!");



    },
    'removeClassReview' : function(classId, userId){
      var reviews = classes.findOne(classId);
      console.log("class id in removeclassreview = "+classId);
      if(!reviews){
        throw "no matching class found";
        return;
      }

      console.log("removeClassReview check 1");
      reviews = reviews.studentReviews;

      var index = -1;
      //remove previous version of review
      for(var i = 0; i < reviews.length ; i++)
      {
        if(reviews[i].reviewer === userId)
        {
          index = i;
        }

      }
      console.log("removeClassReview check 2");
      if(index < 0)
      {
        console.log("previous review not found");
      }
      else{
        reviews.splice(index, 1);
      }
      console.log(reviews);
      console.log("deleted review - new reviews is now: "+ reviews);
      classes.update({_id: classId}, {$set : {studentReviews: reviews}});

      //push notificaton to the teacher that they have been reviewed
      var title = "Review for "+reviews.title+" removed!";
      var reviewerName;
      var reviewerObject = Meteor.users.findOne(userId);
      if(reviewerObject && reviewerObject.profile && reviewerObject.profile.name)
      {
        reviewerName = reviewerObject.profile.name;
      }
      else {
        reviewerName = reviewerObject.username;
      }
      var message = reviewerName + " removed their rating from "+reviews.title+".";
      var type = "teacher";
      var options = null;
      Meteor.call('pushNotification',classes.findOne(classId).teacherId, title, message, type, options);
      console.log("Sent push notification!");

    },

    'addCash': function(id, amount){

     // try{
      if (Meteor.users.findOne(id).profile.balance){
        Meteor.users.update(id, {$inc: {"profile.balance": parseInt(amount)}});
        console.log("Money Updated!")
      }
      else {
        Meteor.users.update(id, {$set: {"profile.balance": 0.00}});
        Meteor.users.update(id, {$inc: {"profile.balance": parseInt(amount)}});
      }
   /*   }
      catch(err){
        console.log("caught exception - no biggie - carry on");
      }*/
    },
    'setnewCash': function(id, amount){
     classes.update({_id: id},{$set: {newcost: amount}});
   },
   'transactionHistory': function(id, transaction){
     console.log("Transaction for id "+id+"recorded with text: "+transaction);
    if (Meteor.users.findOne(id).profile.transactionhistory){

      console.log("Entered if of transaction history");
      Meteor.users.update(id, {$push: {'profile.transactionhistory': transaction}});
      console.log("Transaction history after if = "+Meteor.users.findOne(id).profile.transactionhistory);
    }
    else {
      console.log("Entered else of transaction history");
      var array = [];
      Meteor.users.update(id, {$set: {'profile.transactionhistory': array}});
      Meteor.users.update(id, {$push: {'profile.transactionhistory': transaction}});
      console.log("Transaction history after else = "+Meteor.users.findOne(id).profile.transactionhistory);
    }
  },
  'clearNotifications' : function(userId){
    Meteor.users.update(userId, {$set : {'profile.notifs' : []}});
  }
  ,
  'removeClasses': function(classid){
    user.update({},{$pull: {classes: classid}});
  },
    'pushNotification' : function(targetUserId, title, message, type, options)//type is either student or teacher - for which dashboard it should be displayed in
    {
      //essentially just add this information as a now entry to each users profile.notifs
      var targetUser = Meteor.users.findOne(targetUserId);

      if(!targetUser)//target not found
      {
        throw "Target user for notification not found!";
      }

      //add notification
      //if no field exists yet, initialize it
      if(!targetUser.profile.notifs)
      {
        Meteor.users.update(targetUserId, {$set: {'profile.notifs' : []}});
      }

      console.log("MOMENT: "+moment().unix());
      //add the notification to profile.notifs
      Meteor.users.update(targetUserId, {$push: {'profile.notifs' :
      {
        title: title,
        message: message,
        type: type,
        options: options,
        seen: false,
        time: moment().unix()
      }
    }});

  }}
  );


Meteor.publish('data', function(){
	return [classes.find({}), user.find({}), Meteor.users.find({}, {fields: {'profile.binary': 1,'profile.name':1, 'username':1, 'profile.age':1, 'profile.about':1, 'profile.balance':1}})];
});
/*
Meteor.publish('user', function(){
	return user.find({});
});

Meteor.publish("allUserData", function () {
    return Meteor.users.find({}, {fields: {'profile.binary': 1,'profile.name':1, 'username':1, 'profile.age':1, 'profile.about':1, 'profile.balance':1}});
  });*/


var UpdateClassOnEnd = function(classid) {
  classes.find({}).forEach(
    function(elem){
      var newcost =(1*elem.cost*(elem.studentNumber/3+2)/(elem.studentNumber/3+1)/2).toFixed(2);
      Meteor.call('setnewCash',elem._id, newcost);

    }
    );
  console.log("UPDATECLASSONEND classid = " + classid);
  console.log("findone = "+classes.findOne(classid));
  var savings = parseInt(classes.findOne(classid).cost)-parseInt(classes.findOne(classid).newcost);
  var classnew = classes.findOne(classid);
  var studentList = classes.findOne(classid).studentList;

  for (var i=0; i<studentList.length; i++){
    Meteor.call('addCash', studentList[i], savings);
    //TODO: replace static strings with objects so that relative date formatting isn't just relative to the time it was created at
    var string = "Received $"+savings+" for group savings from "+classnew.title;
    Meteor.call('transactionHistory', studentList[i], string);

    //notify user
    Meteor.call('pushNotification', studentList[i], "Received Class Savings!", "Received $"+savings+" for group savings from "+classnew.title, "student", null);


  }
  var total = studentList.length*parseInt(classes.findOne(classid).newcost);
  Meteor.call('addCash', classnew.teacherId, total);
  var string = "Received $"+total+" for teaching "+classnew.title;
  Meteor.call('transactionHistory', classnew.teacherId, string);

  //notify teacher
  Meteor.call('pushNotification', classnew.teacherId, "Received Class Earnings!", "Received $"+total+" for teaching "+classnew.title, "teacher", null);


}
