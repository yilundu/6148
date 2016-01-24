
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
    'updateAnnouncements': function(classid, classAnnouncements){
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
    }
});

Meteor.publish('classes', function(){
	return classes.find({});
});

Meteor.publish('user', function(){
	return user.find({});
});
