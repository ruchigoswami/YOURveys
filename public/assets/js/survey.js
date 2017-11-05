$(document).ready(function() {
	console.log("I'm working...for the most part");
	var newSurvey = [];
	var questionCount = 1;
	var answerCount = 3;

	// function buildAnswers(){
	// 	console.log("Attempting to build questions.")
	// 	for(i = 0; i < 2; i++){
	// 		console.log("Building questions.");
	// 		$("#question").append('<input placeholder="Answer" class="form-control" id="answer">');
	// 	};
	// };

	// buildAnswers();

	$(".submit").on("click", function(){
		newQuestion.questionNumber = questionCount;
		newQuestion.title = $("#question_body").val().trim(),
		newQuestion.answerType = $("#select option").val(),
		newQuestion.answers = [];

	});


	$("#final_submit").on("click", function(){

	});

	$(".add-answer").on("click", function(){
		var check = $("#answer2").val();
		var hold = $("#answer2");
		console.log(check);
		console.log(answerCount);
		$("#question").append('<input placeholder="Answer ' + answerCount + '" class="form-control" id="answer' + answerCount + '" value="answer' + answerCount + '">');
		answerCount++;
	});

});