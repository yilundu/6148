Template.studentBanner.helpers({
  name: function(){
    console.log("this = "+this);
    var student = Meteor.users.findOne({_id: String(this)});
    //throw exception if no matching student found
    if(!student)
    {
      throw "Student not found!";
    }
    //if the user has a profile display name set it to that, otherwise default to their username
    if(student.profile.name){
      return student.profile.name;
    }
    else{
      return student.username;
    }
  }
})
