$(document).ready(function() {

	$('.whatse').hide();
// start temperary code 
    var globalquestions = [];

/*	var answer1 = {
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

	 displayQuestions(questions)*/
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
	
	if (url.indexOf("?surveyTitle=") !== -1) {
		var surveyTitle = decodeURI(url.split("=")[1]);
   		$('#surveyTitle').html(surveyTitle);
	}


	$(document).on("click", ".whatse", handleFormSubmit);

	function handleFormSubmit(event) {
	  $(this).hide();	
      event.preventDefault();
      console.log("I have been clicked.");
      var fullsurvey = {
      	title: $('#surveyTitle').text(),
      	userId: 1,
      	questions: globalquestions
      };

      console.log("fullsurvey says...");
      console.log(fullsurvey);

      // Calling the upsertUser function and passing in the value of the name input
      upsertSurvey({
        fullsurvey
      });
    }

    function upsertSurvey(surveyData) {
      $.post("/api/fullsurvey", surveyData);
      $('#surveyMessage').html("Survey is saved");
        // .then(getUsers);
    }

	//Create Question
	$(".create").on("click", function(){
	  var surveyId = $('#surveyTitle').attr('data-surveyId');
	  var questionText = $(this).parent().find('#question').val();
	  var validQuestion = false;

	  if(questionText != ''){
        validQuestion = true;
        var answerType = $(this).attr('data-type');
	 	var question = {
          text: questionText,
          answerType: answerType,
          surveyId:surveyId ,
          answer:[]
   		};

 		//Check the options only for radio and checkbox
 		if(answerType != 'TextBox'){
 		  var numberOfAnswers = $(this).parent().find('.answer_values').length;
 		  validQuestion = false;
        
		  for (var i = 0; i < numberOfAnswers; i++) {
		    var answerId = 'answer' + (i + 1);
		    var answerText = $(this).parent().find('#'+answerId).val();
		    if(answerText != '') {
		      validQuestion = true;
			  var answer = {
				text: answerText,
				voteCount: i + 1
			  }
			  question.answer.push(answer);
		    }
          }
          
        }
	    

      

 	console.log(question);
	 if(validQuestion) {
	 	 globalquestions.push(question);
	     var quest= [];
	     quest.push(question);
		 displayQuestions(quest);
		 $('.whatse').show();

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
    $("#survey_content").append("<br><div class='survey_Q'>" + question.text + "</div>");

    var html ='<form class="survey_A">';
    if(question.answerType === 'TextBox'){
      html = html + "<textarea placeholder='Answer...' id='text_answer' rows='2' cols='40'></textarea> <br>"
    }
    else
    {
      for (var i = 0; i < question.answer.length; i++)
      {

        if(question.answerType === 'RadioButtons')
        {
          html = html + "<input type='radio'  class='radio_input'>" + question.answer[i].text + "</input> <br>";
        }
        else if(question.answerType === 'CheckBoxes')
        {
          html = html + "<input type='checkbox' class='radio_input'>" + question.answer[i].text + "</input> <br>";
        }	
      } 	
    }

    html = html+'</form>';
    $("#survey_content").append(html);
  }

});