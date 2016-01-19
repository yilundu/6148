Template.classDashboardElement.events({
  "click .btn.btn-warning": function(){
    console.log("attempted to remove class with id =" + this._id);
    classes.remove({_id: this._id});
  }
});
