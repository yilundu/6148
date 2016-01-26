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

var checkDateNaN = function(element){
  var time = $(element).val();
  time = moment(time).unix();

  if(time !== NaN){
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
    var class_date = $("#dateField").val();
    var unixtime = moment(class_date).unix();
    class_date = moment(class_date).format("dddd, MMMM Do YYYY, h:mm a");

    var dateObject = new Date(class_date);

    $('.list-group-item').each(function(){
      if($(this).hasClass('active')){
        user_subject = $(this).html();
      }
    });
    var address=$('#mapidform').val();
    var latitude = 0;
    var longitude = 0;
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json",
        type: "GET",
        data:{
            "address": address,
            "key": "AIzaSyAL46_D20KBsAqUgDigLBQetRCJO3tiByM"
          },

            success: function(data){
              latitude = data.results[0].geometry.location.lat;
              longitude = data.results[0].geometry.location.lng;
          //    sAlert.success('Transaction Recieved!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});
          //    Meteor.call('addCash', Meteor.user()._id, change);


            },
            error: function(data){
          //    sAlert.error('Error in Venmo transaction. Please reauthenticate.',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});
          //    console.log(error);
            }
       });
    //check fields
    //NOTE: use singular & in order to avoid short-circuit evaluation: all methods must be called to label fields red as needed
    if(checkTextEmpty($('#titleField')) &
    checkTextEmpty($('#descField')) &
    checkNumberPositive($('#costField'))&checkTextEmpty($('#dateField'))&checkDateNaN($('#dateField'))&checkTextEmpty($('#mapidform'))){

     Meteor.call('createClass', address, class_date, user_title, user_cost, user_description, user_subject, Meteor.user()._id, Meteor.user().profile.name, Meteor.user().username, latitude, longitude, unixtime);


      //redirect to sellerDashboard
      Router.go('/sellerDashboard');
    }
    else{
      sAlert.error('Please Fill Out all Forms',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});

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
  "keyup #mapidform": function(event){
    checkTextEmpty(event.target);
  }

});


Template.createClass.onRendered(function() {
  GoogleMaps.load();
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#mapidform").geocomplete({
      map: "#my_map"
    }).bind("geocode:result", function(event, result){
      console.log(result.formatted_address);
      var geo = new GeoCoder();
      var result1 = geo.geocode(result.formatted_address);
      console.log(result1);
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
      position: map.options.center(new google.maps.LatLng(-37.8136, 144.9631)),
      map: map.instance
    });
  });
});
