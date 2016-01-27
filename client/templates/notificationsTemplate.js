Template.notificationsTemplate.helpers({
  timeString: function(){
    console.log("called timeStirng");
    return moment(this.time*1000).calendar();
  }
});
