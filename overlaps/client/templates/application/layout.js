
  Template.layout.helpers({
    photoprof: function(){
      return Meteor.user().profile.binary;
    }
  });

  Template.layout.events({
      "click #editprofile": function(){
        Router.go("/editprofile", {name: $(".form-control").val()});
      }
  })



  
Template.layout.onRendered(function () {
 $(".dropdown-menu").prepend("<button class= 'btn btn-default btn-block' id='editprofile'> Edit Profile </button>");
          
  if (Router.current().route.path() === "/"){
$("#navbartop").css("background-color", "rgba( 11, 181, 250, .09)");
$(".navbar").css("position", "absolute");

}else{
  $("#navbartop").css("background-color", "rgba( 11, 181, 250, .9)");
  $(".navbar").css("position", "relative");
  $("#toptabid").remove();
  $("#toptabid2").remove();
  $("#toptabid3").remove();
  $("#leftpart ul").append('<li><a href = "/createclass" class = "navbartext"> Teach a Class </a></li>');

}
});