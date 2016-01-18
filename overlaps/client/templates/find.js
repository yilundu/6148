

Template.find.helpers({
	results: function() {
//	return classes.find();
	
//  var search1 = new ReactiveVar(new RegExp($(".subject").val(),'i'));
//	var search2 = new ReactiveVar(new RegExp($(".description").val(),'i'));
//	return classes.find({subject: search1, description: search2});
	var search1 = new RegExp($("#title1").val(),'i');
	var search2 = new RegExp($("#description1").val(), 'i');
	return classes.find({subject: search1, description: search2});
	


//	return classes.find({subject: {regex: "/"+$(".subject").val()+"/i"}, description: {regex: "/"+$(".description").val()+"/i"}});

	}
}
);

Template.find.events({
	"submit .searchform": function(event) {
//	return classes.find();
	event.preventDefault();
	
//	search1.set(new RegExp($(".subject").val(),'i'));
//	search2.set(new RegExp($(".description").val(), 'i'));
	var search1 = new RegExp($("#title1").val(),'i');
	var search2 = new RegExp($("#description1").val(), 'i');
	var json = classes.find({title: search1, description: search2});
	
	$(".Test").html("");

	 json.forEach(function(item){
		$(".Test").append("<div class='results'><ul><li>"+item._id+"</li><li> Title:"+item.title+"</li><li> Students Enrolled:"+item.studentNumber+"</li><li> ID: "+ item.teacher+ "</li><li> Date: "+ item.createdAt+ "</li><li> Description: "+item.description+"</li><li><button class='submit'>Enroll!</button></li></ul></div>");
	});






},
    "click .results .submit": function(event) {
     
     event.preventDefault();
     var classid = $(event.target).parent().parent().children().eq(0).text();
     if ((Meteor.users.find({id: Meteor.user()._id, classid: true}).count())===0){
     	classes.update({_id:classid},{$inc: {studentNumber: 1}});
     	alert("Succesfully Enrolled!");
     	Meteor.users.update({id: Meteor.user()._id}, {$set: {classid: true}})
     	location.reload();
     	
     }
     else {
     	alert("You have already been enrolled in this class!");
 	}
  //  $(".submit").eq(1).parent().parent().children().eq(0).text()
  //  classes.update({_id: $(this).parent().children(:first-child).val());



    }
});




/*
results: [
			{subject: "Biology", description:"Learn Biology"},
			{subject: "Chemistry", description:"Learn Chemistryhttp://localhost:3000/Bikeground.png"},
			{subject: "Math", description:"Learn Math"},
			{subject: "Physics", description:"Learn Physics"}
		]
});
*/
