
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
	classes.find({}).forEach(
		function(elem){
			var newcost =(1*elem.cost*(elem.studentNumber/3+2)/(elem.studentNumber/3+1)/2).toFixed(2);	
			Meteor.call('setnewCash',elem._id, newcost);

		}


		);
	if(this.search){
	var search = this.search;
	var parts = search.trim().split(/[ \-\:]+/);
    var searchregex = new RegExp("(" + parts.join('|') + ")", "ig");
    $("#title1").val(search);
	return classes.find({$or: [{title: searchregex}, {description: searchregex}, {subject: searchregex}]}, {limit: 10, sort: {studentNumber: -1}}).fetch();
	}
	else{
	//var search1 = new RegExp($("#title1").val(),'i');
	//return {posts: classes.find({subject: search1, description: search2})};


	return classes.find({}, {limit: 10, sort: {studentNumber: -1}}).fetch();
//	return classes.find({subject: {regex: "/"+$(".subject").val()+"/i"}, description: {regex: "/"+$(".description").val()+"/i"}});
	}
	},


	exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      };
    }
  }


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
	classes.find({}).forEach(
		function(elem){
			var newcost =(1*elem.cost*(elem.studentNumber/3+2)/(elem.studentNumber/3+1)/2).toFixed(2);
			Meteor.call('setnewCash',elem._id, newcost);
		}


		);
	var counter = 0;
	 json.forEach(function(item){
	 	counter++;
	 	var newCost = ((item.cost/2)*(item.studentNumber/3+2)/(item.studentNumber/3+1)).toFixed(2);
		$(".Test").append(
			"<div class='results' id='" + item._id+"''>"
			+"<ul class = 'jumbotron insidesearch'>"
			+"<li class = 'hidethis'>"+item._id+"</li>"
			+"<li class= 'classliid'>"+item.title+"</li>"
			+"<li> Description: "+item.description+"</li>"
			+"<li> Subject: "+item.subject+"</li>"
			+"<li> Teacher: <a href='/profile?id="+item.teacherId+"'>"+ item.teacher+ "</a></li><li> Time: "+ moment(item.createdAt).format("dddd, MMMM Do YYYY, h:mm a")+ "</li>"
			+"<li> Students Enrolled: "+item.studentNumber+"</li>"
			+"<li> Address: "+ item.address +"</li>"
			+"<li> Cost: <span class='strikethrough'>$"+ item.cost +"</span>  $"+ item.newcost +"</li>"
			+"<li><button class='submit'>Enroll!</button></li>"
			+"</ul></div>");
		/*GoogleMaps.create({
  			name: 'Map',
  			element: document.getElementById(item._id),
  			options: {
    		center: new google.maps.LatLng(-37.8136, 144.9631),
    		zoom: 8
  			}
		});*/
	});
	 if (counter===0){
	 	$(".Test").append("<p> Sorry, but no results were found for your query. Create this <a href='/createClass'> class </a> now!</p>")
	 }

	 $( ".__find .container" ).addClass( "jumbotron outsidesearch" );






},
    "click .results .submit": function(event) {
	 if (Meteor.user()){
     event.preventDefault();
     var classid = $(event.target).parent().parent().children().eq(0).text();
     var string = "";
     var string2 = "";
     var time = new Date();

		// console.log(classid);
	 if (!user.findOne({meteor: Meteor.user()._id})){
	 	Meteor.call('addNewUser', Meteor.userId());
	 }
	 
	 if (classes.findOne(classid).newcost < Meteor.user().profile.balance){
	 	
     if ((user.find({meteor: Meteor.user()._id, classes: classid}).count())===0){
     	var cost = classes.findOne(classid).cost;
	 	var negativecost = -1*cost;
	 	Meteor.call('addCash', Meteor.user()._id, negativecost);
	 	string = "Paid temporary $"+cost+" for class "+classes.findOne(classid).title+" at time: "+time;
	 	Meteor.call('transactionHistory', Meteor.user()._id, string);
	 	//Meteor.call('addCash', classes.findOne(classid).teacherId, cost);
	 	//string2 = "Recieved $"+cost+" for class "+classes.findOne(classid).title+"("+ classid + ") at time: "+time;
	 	//Meteor.call('transactionHistory', classes.findOne(classid).teacherId, string2);
     	Meteor.call('incrementStudentNumber', classid);

     	var id = Meteor.user()._id;
     	Meteor.call('insertPlayerClass', id, classid);

		 	//user.update({meteor: id}, {$set: {classid: true}});
     	sAlert.success('Succesfully Enrolled!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});


     }
     else {
     	sAlert.error('You have already enrolled!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});
 	}}
 	else{
 		sAlert.error('You do not have enough credit! Please authenticate venmo to add credit.',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});

 	}
 	}
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
