
Template.layout.helpers({
	photoprof: function(){
		//check if user is loaded or logged in - avoids exceptions
		if(Meteor.user()){
			if (Meteor.user().profile.binary){
				return Meteor.user().profile.binary;}
				else{
					return '/default.jpg';
				}

			}
			else{
				return "";
			}
		},
		money: function(){
			if(Meteor.user())
			{
				if(!Meteor.user().profile.balance)
				{
					Meteor.call('setCash', Meteor.user()._id);
					return 0.00;
				}
				else
				{
					return Math.round(Meteor.user().profile.balance*100)/100;
				}

			}
		}

	});

Template.layout.events({
	"click #btndelete":function(){
		Meteor.call("clearNotifications", Meteor.userId());
	},
	"click #editprofile": function(){
		Router.go("/editprofile", {name: $(".form-control").val()});
	},
	"click #navhomeid": function(){
		if (Router.current().route.path() === "/"){
			document.location.reload(true);

		}else{
			Router.go("/", {name: $(".form-control").val()});
		}
	},
	"click #moneylink": function(){
		Router.go("/credit", {name: $(".form-control").val()});
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
	"click #moneymanage": function(){
		Router.go("/credit", {name: $(".form-control").val()});
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
	"click .pricelink": function(e, template){
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $("#pricing").offset().top
		}, 600);
		return false;
	},
	"click .missionlink": function(e, template){
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $("#Mission").offset().top
		}, 700);
		return false;
	},
	"click #createClass": function(e,template){
		e.preventDefault();
		if(Meteor.user()){
			Router.go('/createClass');
		}
		else{
			Router.go('/register');
		}
	},
	"click #search": function(e,template){
		e.preventDefault();
		Router.go('/search');
	},
	"click #login-buttons-logout": function(){
		$("#login-dropdown-list .dropdown-menu").append("<i class='icon-spinner icon-spin icon-large'></i> ");
	},
	"click #login-buttons-password": function(){
		$("#login-dropdown-list .dropdown-menu").append("<i class='icon-spinner icon-spin icon-large'></i> ");
	}


});

Template._loginButtonsLoggedInDropdown.onRendered(function () {
	$("#login-dropdown-list .dropdown-menu").prepend("<button class= 'btn btn-default btn-block' id='moneymanage'> Finances </button>");
	$("#login-dropdown-list .dropdown-menu").prepend("<button class= 'btn btn-default btn-block' id='editprofile'>  Edit Profile </button>");

	$("#login-dropdown-list .dropdown-menu").prepend("<button class= 'btn btn-default btn-block' id='studentprofile'> Student Dashboard </button>");
	$("#login-dropdown-list .dropdown-menu").prepend("<button class= 'btn btn-default btn-block' id='teacherprofile'> Teacher Dashboard </button>");

	if (Meteor.user().profile.authenticated === true){
		$("#login-dropdown-list .dropdown-menu").prepend("<button class= 'btn btn-default btn-block btn-success' id='authorizevenmo'> Venmo Authenticated </button>");
	}
	else {
		$("#login-dropdown-list .dropdown-menu").prepend("<button class= 'btn btn-default btn-block btn-danger' id='authorizevenmo'> Authorize Venmo </button>");
	}



});



Template.layout.onRendered(function(){
	$("#leftpart ul").append('<li id = "toptabid22"><a href = "#" id = "createClass" class = "navbartext"> Teach a Class </a></li>');

});

Template.layout.helpers({
	searchbarhelper: function(){
		if (Router.current().route.path() !== "/"){
			return "<a href = '#' id = 'search' class = 'navbartext'> Search </a>";

		}else{
			return "";
		}
	},
	navbartophelper: function () {

		if (Router.current().route.path() === "/" ){
			return 'navbartophome';
		}else if (Router.current().route.path() === "/404" ){
			console.log("fuc")
			return 'navbartopnothome';
		}
		else {
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
,


notifications: function(){
	if(Meteor.user() && Meteor.user().profile)
	{
		if(Meteor.user().profile.notifs)
		{
			var studentNotifs = [];
			console.log("notifications entered");
			return Meteor.user().profile.notifs.reverse();
		}
	}
},

  notificationsnum: function(){
    if(Meteor.user() && Meteor.user().profile)
    {
      if(Meteor.user().profile.notifs)
      {
	      return Meteor.user().profile.notifs.length;
      }
			else {
				return 0;
			}
    }
  }

});
