$(document).ready(function() {

$(".Continue").on("click", function(){

	var survey = {
		title: $('#titleValue').val()
	}

	$.post("/api/surveys/new", survey)
	.then(function(data) {
		window.location.href = "survey.html?surveyId="+data.id;
	 });
		

});

});