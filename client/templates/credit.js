Template.credit.helpers({
	authenticated: function(){
		return Meteor.user().profile.authenticated;
	},
	cash: function(){
    if (Meteor.user().profile.balance){
      return Math.round(Meteor.user().profile.balance*100)/100;
    }
    else{
      Meteor.call('setCash', Meteor.user()._id);
      return Math.round(Meteor.user().profile.balance*100)/100;
    }
  },
   url: function(){
    var string = "https://api.venmo.com/v1/oauth/authorize?client_id=3446&scope=make_payments&response_type=code&state="+Meteor.userId();
    return string;
  }
});

Template.credit.events({
	"click #submit-btn": function(result){
		var transaction = Meteor.user().profile.balance;
		var change = 0.00;
		var string = "";
		var addvalue = Math.round($('#addvalue').val()*100) / 100;
		var removevalue = Math.round($('#removevalue').val()*100) / 100;
		if ($('#addvalue').val()){
			if (addvalue !== 0){
			string = string + "Are you sure you want to add $" + addvalue + " to your account? <br>";
			var change = change + addvalue;
		}
		}

		if ($('#removevalue').val()){
			if (removevalue !==0){
			string = string + "Are you sure you want to withdraw $" + removevalue + " to your account? <br>";
			var change = change - removevalue;
		}
		}

		if (transaction+change >= 0) {
			string = string + "Your balance will be $"+ (transaction+change).toFixed(2)+ " after transaction.";

		
		bootbox.confirm(string, function(result){
			 if (result === false) {
			 	
			 	sAlert.error('Transaction Canceled!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});
			 	console.log(result);
			 }
			 else{

			
			 $.ajax({
			 	url: "/payvenmo",
			 	type: "GET",
			 	data:{
		        "access_token": Meteor.user().profile.venmo,
		        "id": Meteor.user()._id,
		        "amount": change
		      },
		     
		      	success: function(data){
		      		sAlert.success('Transaction Recieved!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});
		         	Meteor.call('addCash', Meteor.user()._id, change);
		         	$('#addvalue').val(0.00);
		         	$('#removevalue').val(0.00);

		      	},
		      	error: function(data){
		      		sAlert.error('Error in Venmo transaction. Please reauthenticate.',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});
		         	console.log(error);
		      	}
			 });

			
			 /*HTTP.call("POST", "https://api.venmo.com/v1/payments",{
		      data:{
		        "access_token": Meteor.user().profile.venmo,
		        "phone": "307-399-6339",
		        "note": "Transaction using Overlaps",
		        "amount": change
		      }
		      }, function(error, response) {
		         if ( error ) {
		         	sAlert.error('Error in Venmo transaction. Please reauthenticate.',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});
		         	console.log(error);
		         // console.log( error );
		         } else {
		         	sAlert.success('Transaction Recieved!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});
		         	Meteor.call('addCash', Meteor.user()._id, change);
		       //   console.log(response);
		       //   console.log(response.data.access_token);
		        //  console.log(this.userID);
		        
		          //Meteor.users.update({_id: id},{$set: {"profile.venmo": response.data.access_token, "profile.authenticated": true}});
		       //   venmo.insert({"json":response.json});
		         }

		    this.response.setHeader('access-control-allow-origin', '*');
			this.response.writeHead(200, {});
    		this.response.end();
		     });*/

			
			}
		});
	}
		else {
			sAlert.error('Error. Account balance must remain positive.',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});

		}
	}
});