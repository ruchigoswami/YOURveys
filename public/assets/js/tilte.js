$(document).ready(function() {
var survey = {
		 id: 2,
         title: 'BLUE'
	}


$(".Continue").on("click", function(){

	   $.post("/api/authors", survey)

});

/*function upsertAuthor(authorData) {
    $.post("/api/authors", authorData)
      .then(getAuthors);
 }*/

  // Function for creating a new list row for authors

 

});