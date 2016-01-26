classes = new Mongo.Collection("classes");
user = new Mongo.Collection("user");

//serverside only
FutureTasks = new Meteor.Collection('future_tasks');//for scheduling class updates
