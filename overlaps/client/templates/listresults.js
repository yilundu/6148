Template.listresults.helpers({
    posts: function() {
         return classes.find({subject: this.subject});
    }
})