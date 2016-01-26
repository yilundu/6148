Template.profile.helpers({
	binary: function(){
		if (Meteor.users.findOne(this.id).profile.binary){
			return Meteor.users.findOne(this.id).profile.binary;
		}
		else{
			return "default.jpg";
		}
	},
	name: function(){
		return Meteor.users.findOne(this.id).profile.name;
	},
	age: function(){
		return Meteor.users.findOne(this.id).profile.age;
	},
	about: function(){
		return Meteor.users.findOne(this.id).profile.about;
	},
	classes: function(){
    //return classes taught by the current user
    return classes.find({teacherId: this.id});
  },
  	numClasses: function(){
  		return classes.find({teacherId: this.id}).count();
  	},
  	username: function(){
  		return Meteor.users.findOne(this.id).username; 
  	},
  	reviews: function(){
    results = classes.find({teacherId: Meteor.userId()}).fetch();
    var array = [];
    results.forEach(
    function(elem){
      for(var i=0; i<elem.studentReviews.length; i++){
        var string1=elem.studentReviews[i].text+"; Rated: "+elem.studentReviews[i].rating+"/5";

        console.log(string1);
        array.push(string1);
      }

    });
    return array;
  }
});