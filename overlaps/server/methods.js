Meteor.methods({
    'insertPlayerClass': function(classid){
        var currentUserID = Meteor.user()._id;
        alert("stuff happened");
        Meteor.users.update({id: Meteor.user()._id}, {$set: {classid: true}});
    }

});