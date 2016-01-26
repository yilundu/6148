Template.debug.helpers({
  classes: function(){
    return JSON.stringify(classes.find().fetch(),null,2);
  },
  user: function(){
    return JSON.stringify(user.find().fetch(),null,2);
  },
  users: function(){
    return JSON.stringify(Meteor.users.find().fetch(),null,2);
  },
  futuretasks: function(){
    return JSON.stringify(FutureTasks.find().fetch(),null,2);
  }
})
