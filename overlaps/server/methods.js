
Meteor.methods({
    'insertPlayerClass': function(id, classid){
        console.log("stuff happened");
        user.update({meteor: id}, {$push: {classes: classid}});
    }

});
