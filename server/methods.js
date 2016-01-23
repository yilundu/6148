
Meteor.methods({
    'insertPlayerClass': function(id, classid){
        //add class to user's class list
        user.update({meteor: id}, {$push: {classes: classid}});
        //add user to studentList of class
        var classStudentList = classes.findOne(classid);
        if(classStudentList){
          classStudentList = classes.studentList;
          console.log("classList is " + classStudentList);
          classStudentList.unshift(id);
          classes.update(classid, {$set : {studentList : classStudentList}});
        }

    },

    'createClass': function(user_title, user_cost, user_description, user_subject, user_id, username){
    	classes.insert({
        title: user_title,
        subject: user_subject,
        cost: user_cost,
        teacher: username,
        description: user_description,
        createdAt: new Date(),
        studentNumber: 0, // current time
        teacherId: user_id,
        classAnnouncements: [],//empty at creation
        studentComments: [],//empty at creation
        studentList: []//empty at creation
      });
    },
    'incrementStudentNumber': function(classid){
    	classes.update({_id:classid},{$inc: {studentNumber: 1}});
    },
    'editUserInfo': function(user_id, name, age, about){
    	 Meteor.users.update({_id: user_id}, {$set: {"profile.name": name, "profile.age": age, "profile.about": about}});
    },
    'editUserPhoto': function(user_id, photo){
    	 Meteor.users.update({_id: user_id},{$set: {"profile.binary": photo}});

    },

    //updates class list of user with 'user_id'
    'updateCurrentClass': function(user_id, currentClasses){
    	user.update(user_id, {$set: {classes: currentClasses}});

    },

    //updates student list of class with classid
    'updateStudentList': function(class_id, studentList){
      classes.update(class_id, {$set: {studentList: studentList}});
    },

    'decrementStudentNumber': function(classid){
    	classes.update({_id:classid},{$inc: {studentNumber: -1}});
    },
    'updateAnnouncements': function(classid, classAnnouncements){
    	classes.update(classid, {$set : {classAnnouncements: updatedAnnouncements}});
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
    }

});

Meteor.publish('classes', function(){
	return classes.find({});
});

Meteor.publish('user', function(){
	return user.find({});
});
