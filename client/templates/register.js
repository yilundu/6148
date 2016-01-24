
    Template.register.events({
        'click #createBtn': function(event) {
            if ($('#confirm_password').val() === $('#password').val()){
                username = $('#titleField').val();
                password = $('#password').val();
                Accounts.createUser({
                    username: username,
                    password: password,
                    profile: {}

                });

                Meteor.loginWithPassword(username, password);
                Router.go('/');
        
            }
            else{
                sAlert.error('Passwords do not match!',  {effect: 'genie', position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: true, offset: '100px'});
            }
           
        },
         'keyup #confirm_password': function(event){
            if ($('#confirm_password').val() === $('#password').val()){
                $('#confirm_password').removeClass('incorrect');
                $('#confirm_password').addClass('correct');
            }
            else{
                $('#confirm_password').removeClass('correct');
                $('#confirm_password').addClass('incorrect');
            }

         }
    });

