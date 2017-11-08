$(document).ready(function() {

getAllSurveys();

function getAllSurveys(){
 $.get("/api/AllSurveys" , function(surveysList) {
	      
		     var html = "";
		     for(var i=0 ; surveysList.length >i ; i++){
				html =  html + "<tr  class='survey_table'>" +
	    	 				"<td class='td_first_header'>"+surveysList[i].title+"</td>" +
	    	 				"<td><a href='display.html?surveyId="+surveysList[i].id+"'>Preview</a></td>"+
							"<td><label class='btn btn-default delete_survey'>Delete</label></td>";


		     }
		     $('#surveyList').html(html);

	    	

});
}

	 $(document).on('click','.delete_survey', function()
	{
	    event.preventDefault();
		$(this).parent().parent().remove();
	});

});	