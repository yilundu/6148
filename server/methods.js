
Meteor.methods({
    'insertPlayerClass': function(id, classid){
        console.log("insertPlayerClass: " +classId);
        user.update({meteor: id}, {$push: {classes: classid}});

        //add user to studentList of class
        var classList = classes.findOne(classid);
        if(classList){
          classList = classes.studentList;
          console.log("classList is " + classList);
          classList.unshift(id);
          classes.update(classid, {$set : {studentList : classList}});

        }
    }

});
