Template.find.helpers({
	//results: Tracker.autorun(function() {
		results: [
			{subject: "Biology", description:"Learn Biology"},
			{subject: "Chemistry", description:"Learn Chemistry"},
			{subject: "Math", description:"Learn Math"}
		]
//	return classes.find({subject: {regex: "/"+$(".subject").val()+"/i"}, description: {regex: "/"+$(".description").val()+"/i"}});
//	})
});

/*
Template.find.events({
	"submit form": function() {
		var results = []
		results= classes.find({subject:$(".subject").val(), description: {regex: "/"+$(".description").val()+"/i"}});
	}
})
*/