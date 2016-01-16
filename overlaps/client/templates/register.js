if (Meteor.isClient) {
    Template.register.events({
        'submit form': function(event) {
            event.preventDefault();
            var emailVar = event.target.registerEmail.value;
	    var passwordVar = event.targt.registerPassword.value;
 	    Accounts.createUser({
            	email: emailVar,
            	password: passwordVar,
		date: new Date(),
		level: 'O',
		experience: '0'
        });
        }
    });
}
