
Template.layout.helpers({
	photoprof: function(){
		return Meteor.user().profile.binary;
	},

});

Template.layout.events({
	"click #editprofile": function(){
		Router.go("/editprofile", {name: $(".form-control").val()});
	}
})

Template._loginButtonsLoggedInDropdown.onRendered(function () {
	$(".dropdown-menu").prepend("<button class= 'btn btn-default btn-block' id='editprofile'> Edit Profile </button>");
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
			return " <li class = 'toptab' id = 'toptabid'> <a href = '#about' class = 'scroll-link navbartext' data-scroll> About </a></li>
			<li> <a href = '#Topics' id = 'toptabid2' class = 'topicslink navbartext scroll-link'> How It Works </a></li>";
		}else{
			return "";
		}
	},
	toptabid33:function(){
		if (Router.current().route.path() === "/"){
			return "<li> <a href = '#Form' id = 'toptabid3' class = 'navbartext scroll-link'> Teach a Class </a></li>";
		}else{
			return "";
		}
	}
});






/*$(".dropdown-menu").prepend("<button class= 'btn btn-default btn-block' id='editprofile'> Edit Profile </button>");
     });


     Template.layout.onRendered(function(){
  if (Router.current().route.path() === "/"){
$("#navbartop").css("background-color", "rgba( 11, 181, 250, .09)");
$(".navbar").css("position", "absolute");

}else{
  $("#navbartop").css("background-color", "rgba( 11, 181, 250, .9)");
  $(".navbar").css("position", "relative");
  $("#NavBar").css("position", "absolute").css("width", "100%").css("background-color", "rgba( 11, 181, 250, .8)");
  $("#toptabid").remove();
  $("#toptabid2").remove();
  $("#toptabid3").remove();
  $("#leftpart ul").append('<li><a href = "/createclass" class = "navbartext"> Teach a Class </a></li>');

}

*/