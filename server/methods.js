
Meteor.methods({
    'insertPlayerClass': function(id, classid){
        user.update({meteor: id}, {$push: {classes: classid}});
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
        studentComments: []//empty at creation
      });
    },
    'incrementStudentNumber': function(classid){
    	classes.update({_id:classid},{$inc: {studentNumber: 1}});
    },
    'editUserInfo': function(user_id, name, age, about){
    	 Meteor.users.update({_id: user_id}, {$set: {profile: {name: name, age: age, about: about}}});
    },
    'editUserPhoto': function(user_id, photo){
    	 Meteor.users.update({_id: user_id},{$set: {profile: {binary: photo}}});

    },
    'updateCurrentClass': function(user_id, currentClasses){
    	user.update(user_id, {$set: {classes: currentClasses}});

    },
    'decrementStudentNumber': function(classid){
    	classes.update({_id:classid},{$inc: {studentNumber: -1}});
    },
    'updateAnnouncements': function(classid, classAnnouncements){
    	classes.update(classid, {$set : {classAnnouncements: updatedAnnouncements}});
    },
    'updateComments': function(classid, updatedComments){
    	
    	classes.update(classid, {$set : {studentComments: updatedComments}});
    }

});
