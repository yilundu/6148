Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  title: 'Home',//set title of html (displayed in tab) here to be set later (see Router.after)
  name: 'home'
});

Router.route('/login', {
  title: 'Login'
});

Router.route('/register',{
  title: 'Register'
});

Router.route('/find',{
  title: 'Find Services'
});


//sets the served html page title to the title associated with the routing if there is one
Router.after(function(){
  if(this.route.options.title)
  {
    document.title = this.route.options.title + ' - Overlaps';
  }
})
