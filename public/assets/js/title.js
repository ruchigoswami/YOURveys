$(document).ready(function() {
  $(".Continue").on("click", function(){

	var survey = {
		title: $('#titleValue').val(),
		UserId: 1
	}

	$.post("/api/surveys/new", survey)
	.then(function(data) {
		window.location.href = "survey.html?surveyId=" + data.id;
	 });
  });
});