$(document).ready(function() {
  $(".Continue").on("click", function(){


  	window.location.href = "survey.html?surveyTitle=" + $('#titleValue').val();

  });
});