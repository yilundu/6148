
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
    	if(username){
    	classes.insert({
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
      });
    }
    	else{
    		Meteor.users.update(user_id,{$set:{"profile.name": actualusername}});
    		classes.insert({
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
    	classes.update({_id:classid},{$inc: {studentNumber: -1}});
    },
    'updateAnnouncements': function(id, classid, classAnnouncements){
    	classes.update(classid, {$set : {classAnnouncements: classAnnouncements}});
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
    },

    'addCash': function(id, amount){
        Meteor.users.update(id, {$inc: {"profile.balance": amount}});


    },
    'setnewCash': function(id, amount){
       classes.update({_id: id},{$set: {newcost: amount}});
    }

});

Meteor.publish('classes', function(){
	return classes.find({});
});

Meteor.publish('user', function(){
	return user.find({});
});
