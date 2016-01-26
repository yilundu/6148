Template.notificationsTemplate.helpers({
  timeString: function(){
    console.log("called timeStirng");
    return moment(this.time).startOf('hour').fromNow();
  }
})
