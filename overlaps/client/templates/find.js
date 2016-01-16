Template.find.helpers({
	results: function() {
//	return classes.find();
	return classes.find({subject: {$regex: "/a/i"}, description: {$regex: "/a/i"}});
//	return classes.find({subject: {regex: "/"+$(".subject").val()+"/i"}, description: {regex: "/"+$(".description").val()+"/i"}});

	}
});

/*
Template.find.events({
	"submit form": function() {
		var results = []
		results= classes.find({subject:$(".subject").val(), description: {regex: "/"+$(".description").val()+"/i"}});
	}
})
*/
/*
results: [
			{subject: "Biology", description:"Learn Biology"},
			{subject: "Chemistry", description:"Learn Chemistry"},
			{subject: "Math", description:"Learn Math"},
			{subject: "Physics", description:"Learn Physics"}
		]
});
*/