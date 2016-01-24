var checkTextEmpty = function(element){
  if($(element).val()){
    $(element).parent().removeClass('has-error');
    $(element).parent().addClass('has-success');
    return true;
  }
  else{
    $(element).parent().removeClass('has-success');
    $(element).parent().addClass('has-error');
    return false;
  }
};

var checkNumberPositive = function(element){
  var costInput = $(element).val();
  if(costInput && costInput > 0){
    $(element).parent().removeClass('has-error');
    $(element).parent().addClass('has-success');
    return true;
  }
  else{
    $(element).parent().removeClass('has-success');
    $(element).parent().addClass('has-error');
    return false;
  }
};

Template.createClass.events({
  "click #createBtn": function (event) {

    console.log("Clicked createBtn");

    // Get value from form element
    var user_title = $("#titleField").val();
    var user_cost = $("#costField").val();
    var user_description = $("#descField").val();
    var user_subject;


    $('.list-group-item').each(function(){
      if($(this).hasClass('active')){
        user_subject = $(this).html();
      }
    });

    //check fields
    //NOTE: use singular & in order to avoid short-circuit evaluation: all methods must be called to label fields red as needed
    if(checkTextEmpty($('#titleField')) &
    checkTextEmpty($('#descField')) &
    checkNumberPositive($('#costField'))){

     Meteor.call('createClass', user_title, user_cost, user_description, user_subject, Meteor.user()._id, Meteor.user().profile.name);


      //redirect to sellerDashboard
      Router.go('/sellerDashboard');
    }
  },

  "click .list-group-item ": function(event){
    $('.list-group-item').removeClass('active');
    $(event.target).addClass("active");
  },

  "keyup #titleField": function(event){
    checkTextEmpty(event.target);
  },

  "keyup #costField": function(event){
    checkNumberPositive(event.target);
  },

  "keyup #descField": function(event){
    checkTextEmpty(event.target);
  },

});


Template.createClass.onRendered(function() {
  GoogleMaps.load();
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#mapidform").geocomplete({
      map: "#my_map"
    }).bind("geocode:result", function(event, result){
      console.log(result.formatted_address);
      console.log("lel");
    });
    }
  });
});

Template.createClass.helpers({
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
Template.createClass.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});
