/***** CODE FOR UPDATING CLASSES AFTER THEY HAVE ENDED ******/
//source: http://richsilv.github.io/meteor/scheduling-events-in-the-future-with-meteor/
var performEndClass = function(classId)
{
    console.log("CLASS FIRED!!!!!!" + classId);

};



var addTask = function(id, details)
{

  SyncedCron.add({
    name: id,
    schedule: function(parser){
      return parser.recur().on(details.date.toDate()).fullDate();
    },
    job: function(){
      performEndClass(details);
      FutureTasks.remove(id);
      SyncedCron.remove(id);
      return id;
    }
  })

};

var scheduleClass = function (details){
  if(details.date.toDate() < new Date()){
    performEndClass(details);
  } else {
    var thisId = FutureTasks.insert(details);
    addTask(thisId, details);

  }

  console.log("Scheduled Class with id: "+details.class_id + " for time "+ details.date);
  return true;
};

Meteor.startup(function(){
  var tasksToRemove = [];


  FutureTasks.find({}).forEach(function(c){
    if(c.date < new Date()){
      performEndClass(c);
      tasksToRemove.push(id);
    } else {
      addTask(c._id, c);
    }
  });

  //remove any that were just handled
  for(var i = 0 ; i < tasksToRemove.length ; i++)
  {
    var task = tasksToRemove[i];
    FutureTasks.remove({task});
  }

  SyncedCron.start();
});

/***** FIN ******/

Meteor.methods({
    'insertPlayerClass': function(id, classid){
        //add class to user's class list
        var classStudentList = classes.findOne(classid);
        if(classStudentList){
          classStudentList = classStudentList.studentList;
          console.log("classList is " + classStudentList);
          //insert the students id into the class's studentList
          classStudentList.unshift(id);
          classes.update(classid, {$set : {studentList : classStudentList}});

        }
        else{
          throw "matching class not found";
        }

        user.update({meteor: id}, {$push: {classes: classid}});
        //add user to studentList of class


    },

    'createClass': function(address, class_date, user_title, user_cost, user_description, user_subject, user_id, username, actualusername, latitude, longitude){
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
        newcost: user_cost
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
          newcost: user_cost
	      });

    	}

      //set up listener to fire when class date occurs
      scheduleClass({date: class_date, class_id: classid});

    },
    'editClass': function(classId,address, class_date, user_title, user_cost, user_description, user_subject, user_id, username, actualusername, latitude, longitude){



      if(username){
    	classes.update(classId,{$set : {
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
        newcost: 2*user_cost
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
	        createdAt: new Date(),
	        studentNumber: 0, // current time
	        teacherId: user_id,
	        classAnnouncements: [],//empty at creation
	        studentComments: [],//empty at creation
	        studentList: [],//empty at creation
            latitude: latitude,
            longitude: longitude,
            address: address,
          studentReviews: [],
          newcost: 2*user_cost
	      }
        });

    	}
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
      if(classes.studentList)
      {
        var thisClass = classes.findOne(classid);

        classes.studentList.forEach(function(e){
          //push notificaton to the teacher that they have been reviewed
          var title = thisClass.title+": new class announcement!";
          var studentName;
          var studentObject = Meteor.users.findOne(e);
          if(studentObject && studentObject.profile && studentObject.profile.name)
          {
            studentName = studentObject.profile.name;
          }
          else {
            studentName = studentObject.username;
          }
          var message = thisClass.teacher + " sent to the class a new announcement";
          var type = "student";
          var options = null;
          Meteor.call('pushNotification',e, title, message, type, options);
          console.log("Sent push notification!");


        })
      }
    },
    'updateComments': function(classid, updatedComments){

    	classes.update(classid, {$set : {studentComments: updatedComments}});
    },
    'removeClass': function(id){
    	classes.remove({_id: id});
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
      var message = reviewerName + "gave your class "+rating+" stars - saying: " + text;
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
      var message = reviewerName + "gave your class "+rating+" stars - saying: " + text;
      var type = "teacher";
      var options = null;
      Meteor.call('pushNotification',reviews.teacherId, title, message, type, options);
      console.log("Sent push notification!");



    },
    'removeClassReview' : function(classId, userId){
      var reviews = classes.findOne(classId);
      console.log("class id in removeclassreview = "+classId);
      if(!reviews){
        throw "no matching class found";
        return;
      }

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

      if(index < 0)
      {
        console.log("previous review not found");
      }
      else{
        reviews.splice(index, 1);
      }
      console.log("deleted review - new reviews is now: "+reviews);
      classes.update({_id: classId}, {$set : {studentReviews: reviews}});

      //push notificaton to the teacher that they have been reviewed
      var title = "Review for "+reviews.title+" removed!";
      var reviewerName;
      var reviewerObject = Meteor.users.findOne(reviewerUserId);
      if(reviewerObject && reviewerObject.profile && reviewerObject.profile.name)
      {
        reviewerName = reviewerObject.profile.name;
      }
      else {
        reviewerName = reviewerObject.username;
      }
      var message = reviewerName + " removed their rating from your class.";
      var type = "teacher";
      var options = null;
      Meteor.call('pushNotification',reviews.teacherId, title, message, type, options);
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
      if (Meteor.users.findOne(id).profile.transactionhistory){
      Meteor.users.update(id, {$push: {'profile.transactionhistory': transaction}});
    }
      else {
        var array = [];
        Meteor.users.update(id, {$set: {'profile.transactionhistory': array}});
        Meteor.users.update(id, {$push: {'profile.transactionhistory': transaction}});
      }
    },
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

      //add the notification to profile.notifs
      Meteor.users.update(targetUserId, {$push: {'profile.notifs' :
        {
          title: title,
          message: message,
          type: type,
          options: options,
          seen: false,
          time: new Date()
        }
      }});

    }

});

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
