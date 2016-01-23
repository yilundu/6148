Template.commentTemplate.events({
  'mouseenter ._commentTemplate' : function(){
    console.log("mouseenter");
    //waiting on piazza //$('.glyphicon-remove').show();
  },

  'mouseleave ._commentTemplate' : function(){
    console.log('mouseleave');
    //waiting on piazza //$('.glyphicon-remove').hide();
  },

  'click .glyphicon-remove' : function(){
    var comments = Template.parentData().studentComments;
    var indexOf = comments.indexOf(this);
    comments.splice(indexOf, 1);
    classes.update(Template.parentData()._id, {$set : {studentComments: comments}});
  }
});
