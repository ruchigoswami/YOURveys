$(document).ready(function() {
// start temperary code 
	var answer1 = {
		 id: 1,
         text: 'RED',
         voteCount: 1
	}

	var answer2 = {
		 id: 2,
         text: 'BLUE',
         voteCount: 2
	}

	var answer3 = {
		 id: 3,
         text: 'VIOLET',
         voteCount: 3
	}

	var answer4 = {
		 id: 4,
         text: 'GREEN',
         voteCount: 4
	}

	var question = {
            id: 1,
            text: 'What is your favorate color',
            answerType: 'radio',
            answer:[]
        };

     question.answer.push(answer1);
     question.answer.push(answer2);
	 question.answer.push(answer3);
	 question.answer.push(answer4);
	 var questions =[];
	 questions.push(question);

	 displayQuestions(questions)
//end temp code



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

	



	
	//ading answer to survey to the
	$(".add_answer").on("click", function(){
		event.preventDefault();
		var check = $("#answer2").val();
		var hold = $("#answer2");
		console.log(check);
		console.log(answerCount);
		answerCount++;
		$(this).parent().find('#answer')
		.append('<input placeholder="Answer ' + answerCount + '" class="form-control answer_values" id="answer' + answerCount + '">');

		
	});

	function displayQuestions(questions) {

		for (var i = 0; i < questions.length; i++) {
     		displayQuestion(question);
    	}

	}	

	function displayQuestion(question) {
		$("#survey_content").append("<div class='survey_Q'>"+question.text+"</div>");

		for (var i = 0; i < question.answer.length; i++) {

			if(question.answerType=== 'radio'){
				$("#survey_content").append("<div class='survey_A'><input type='radio'>"+ question.answer[i].text+"</div>");
			}


	    } 	
   }

});