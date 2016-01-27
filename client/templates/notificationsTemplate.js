Template.notificationsTemplate.helpers({
  timeString: function(){
    console.log("called timeStirng");
    return moment.unix(this.time).calendar();
  }
});
