Template.search.helpers({
	posts: function(){
		//var filtered = this.replace('-',/ +/g);
		var search1 = new RegExp(this,'i');
		return classes.find({$or: [{title: search1},{description: search1}]});
	}

})