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

	var url = window.location.search;
	var surveyId;
	  if (url.indexOf("?surveyId=") !== -1) {
	    surveyId = url.split("=")[1];
	    getSurvey(surveyId);
	}
//Gets the survey by id
	function getSurvey(surveyId){
		$.get("/api/surveys/"+surveyId , function(data) {
	      console.log("Posts", data);
		     $('#surveyTitle').html(data.title);
	    	 $('#surveyTitle').attr('data-surveyId',data.id);
	    });
	}

	//Create Question
	$(".create").on("click", function(){
	 var surveyId= $('#surveyTitle').attr('data-surveyId');
	 var questionText = $(this).parent().find('#question').val();
	 var validQuestion=false;

	 if(questionText!=''){
         validQuestion = true;
	 	 var question = {
            text: questionText,
            answerType: $(this).attr('data-type'),
            surveyId:surveyId ,
            answer:[]
   		 };

 
	    var numberOfAnswers= $(this).parent().find('.answer_values').length

	    for (var i = 0; i < numberOfAnswers; i++) {
	    	validQuestion = false;
	    	var answerId= 'answer'+(i+1);
	    	var answerText = $(this).parent().find('#'+answerId).val();
	    	if(answerText !='') {
	    		validQuestion = true;
		    	var answer = {
					 text: answerText,
			         voteCount: i+1
				}
				 question.answer.push(answer);
	    	}
		   
	     	
	    }

      

 	console.log(question);
	 if(validQuestion) {
	 	//TODO call api to save question

	 	/*$.post("/api/surveys/question/new", question)
		.then(function(question) {
			var quest= [];
	        quest.push(question);
			console.log(quest);
			 displayQuestions(quest);
		 });*/

	     var quest= [];
	     quest.push(question);
		 displayQuestions(quest);
	 }
	 	

	 }

	
	 	

	});


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
     		displayQuestion(questions[i]);
    	}

	}	

	function displayQuestion(question) {

		$("#survey_content").append("<br><div class='survey_Q'>"+question.text+"</div>");

		var html='<form class="survey_A">' ;
		if(question.answerType=== 'text'){
			   html = html + "<textarea placeholder='Answer...' id='text_answer' rows='2' cols='40'></textarea> <br>"
		}else{

			for (var i = 0; i < question.answer.length; i++) {

   				if(question.answerType=== 'radio'){
					html = html + "<input type='radio'  class='radio_input'>"+ question.answer[i].text+"</input> <br>";
				}
				else if(question.answerType=== 'checkbox'){
					html = html + "<input type='checkbox' class='radio_input'>"+ question.answer[i].text+"</input> <br>";
				}
				
		    } 	
		}

		html = html+'</form>';
		$("#survey_content").append(html);

		
   }

});