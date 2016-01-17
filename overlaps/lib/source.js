SearchSource.defineSource('classes', function(searchText, options) {
  var options = {sort: {isoScore: -1}, limit: 20};
  
  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [
      {subject: regExp},
      {description: regExp}
    ]};
    
    return Packages.find(selector, options).fetch();
  } else {
    return Packages.find({}, options).fetch();
  }
});