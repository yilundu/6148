
function Regex(text){
	var search = text;
	var parts = search.trim().split(/[ \-\:]+/);
	return new RegExp("(" + parts.join('|') + ")", "ig");
}


Template.find.helpers({
	results: function() {
//	return classes.find();

//  var search1 = new ReactiveVar(new RegExp($(".subject").val(),'i'));
//	var search2 = new ReactiveVar(new RegExp($(".description").val(),'i'));
//	return classes.find({subject: search1, description: search2});
	
	if(this.search){
	var search = this.search;
	var parts = search.trim().split(/[ \-\:]+/);
    var searchregex = new RegExp("(" + parts.join('|') + ")", "ig");
    $("#title1").val(search);
	return classes.find({$or: [{title: searchregex}, {description: searchregex}, {subject: searchregex}]}, {limit: 10, sort: {studentNumber: -1}});
	}
	else{
	//var search1 = new RegExp($("#title1").val(),'i');
	//return {posts: classes.find({subject: search1, description: search2})};


	return classes.find({}, {limit: 10, sort: {studentNumber: -1}});
//	return classes.find({subject: {regex: "/"+$(".subject").val()+"/i"}, description: {regex: "/"+$(".description").val()+"/i"}});
	}
	},

});

Template.find.events({
	"submit .searchform": function(event) {
//	return classes.find();
	event.preventDefault();

//	search1.set(new RegExp($(".subject").val(),'i'));
//	search2.set(new RegExp($(".description").val(), 'i'));
	var search = $("#title1").val();
	var parts = search.trim().split(/[ \-\:]+/);
    var searchregex = new RegExp("(" + parts.join('|') + ")", "ig");
	var json = classes.find({$or: [{title: searchregex}, {description: searchregex}, {subject: searchregex}]});

	$(".Test").html("");

	 json.forEach(function(item){
		$(".Test").append(
			"<div class='results'>"
			+"<ul class = 'jumbotron insidesearch'>"
			+"<li class = 'hidethis'>"+item._id+"</li>"
			+"<li class= 'classliid'>"+item.title+"</li>"
			+"<li> Description: "+item.description+"</li>"
			+"<li> Subject: "+item.subject+"</li>"
			+"<li> Teacher: "+ item.teacher+ "</li><li> Date: "+ item.createdAt+ "</li>"
			+"<li> Students Enrolled: "+item.studentNumber+"</li>"
			+"<li><button class='submit'>Enroll!</button></li>"
			+"</ul></div>");
	});
	 $( ".__find .container" ).addClass( "jumbotron outsidesearch" );






},
    "click .results .submit": function(event) {
	 if (Meteor.user()){
     event.preventDefault();
     var classid = $(event.target).parent().parent().children().eq(0).text();

		// console.log(classid);
	 if (!user.findOne({meteor: Meteor.user()._id})){
	 	Meteor.call('addNewUser', Meteor.userId());
	 }
	 
     if ((user.find({meteor: Meteor.user()._id, classes: classid}).count())===0){
     	Meteor.call('incrementStudentNumber', classid);

     	var id = Meteor.user()._id;
     	Meteor.call('insertPlayerClass', id, classid);

		 	//user.update({meteor: id}, {$set: {classid: true}});
     	sAlert.success('Succesfully Enrolled!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});


     }
     else {
     	sAlert.error('You have already enrolled!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});
 	}}
 	else {
 		event.preventDefault();
 		Router.go('/register')
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
