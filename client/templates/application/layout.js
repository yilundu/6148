
Template.layout.helpers({
	photoprof: function(){
		//check if user is loaded or logged in - avoids exceptions
		if(Meteor.user()){

			return Meteor.user().profile.binary;

		}
		else{
			return "";
		}
	},

});

Template.layout.events({
	"click #editprofile": function(){
		Router.go("/editprofile", {name: $(".form-control").val()});
	},

  "click #studentprofile": function(){
    Router.go("/studentDashboard", {name: $(".form-control").val()});
  },
  "click #teacherprofile": function(){
    Router.go("/sellerDashboard", {name: $(".form-control").val()});
  },
  "click #authorizevenmo": function(){
  	var string = "https://api.venmo.com/v1/oauth/authorize?client_id=3446&scope=make_payments&response_type=code&state="+Meteor.userId();
    window.location.replace(string);
  },


	"click .aboutlink": function(e, template){
		console.log("clickabout");
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $("#about").offset().top
		}, 500);
		console.log("clickabout");
		return false;

	},
	"click .topicslink": function(e, template){
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $("#Topics").offset().top
		}, 600);
		return false;
	},
	"click .missionlink": function(e, template){
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $("#Mission").offset().top
		}, 700);
		return false;
	}


});

Template._loginButtonsLoggedInDropdown.onRendered(function () {
	$(".dropdown-menu").prepend("<button class= 'btn btn-default btn-block' id='editprofile'> Edit Profile </button>");
  $(".dropdown-menu").prepend("<button class= 'btn btn-default btn-block' id='studentprofile'> Student Dashboard </button>");
  $(".dropdown-menu").prepend("<button class= 'btn btn-default btn-block' id='teacherprofile'> Teacher Dashboard </button>");
  if (Meteor.user().profile.authenticated === true){
  	
  }
  else {
  	$(".dropdown-menu").prepend("<button class= 'btn btn-default btn-block' id='authorizevenmo'> Authorize Venmo </button>");
  }
  

});



Template.layout.onRendered(function(){
	$("#leftpart ul").append('<li><a href = "/createclass" class = "navbartext"> Teach a Class </a></li>');

});

Template.layout.helpers({
	navbartophelper: function () {

		if (Router.current().route.path() === "/" ){
			return 'navbartophome';
		} else {
			return 'navbartopnothome';
		}
	},navbarhelper:function(){
		if (Router.current().route.path() === "/"){
			return "navbarhome";

		}else{
			return "navbarnothome";
		}
	},NavBarHelper:function(){
		if (Router.current().route.path() !== "/"){
			return "NavBar";
		}else{
			return "";
		}
	},
	toptabid12:function(){
		if (Router.current().route.path() === "/"){
			return true;
   //   var string = " <li class = 'toptab' id = 'toptabid'> <a href = '#about' class = 'scroll-link navbartext' data-scroll> About </a></li> <li> <a href = '#Topics' id = 'toptabid2' class = 'topicslink navbartext scroll-link'> How It Works </a></li>";
	//		return string;
}else{
	return false;
}
},
toptabid33:function(){
	if (Router.current().route.path() === "/"){
		return true;
	//		return "<li> <a href = '#Form' id = 'toptabid3' class = 'navbartext scroll-link'> Teach a Class </a></li>";
}else{
	return false;
}
}
});
