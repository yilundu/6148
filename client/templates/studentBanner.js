Template.studentBanner.helpers({
  name: function(){

    //if the user has a profile display name set it to that, otherwise default to their username
    if(this.profile.name){
      return this.profile.name;
    }
    else{
      return this.username;
    }
  }
})
