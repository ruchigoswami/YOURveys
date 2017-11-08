$(document).ready(function() {

var  surveyId='';
var url = window.location.search;
	
if (url.indexOf("?surveyId=") !== -1) {
	surveyId = decodeURI(url.split("=")[1]);

}


getSurvey(surveyId);
function getSurvey(surveyId){
		$.get("/api/surveys/"+surveyId , function(data) {
	         $('#survey_title').html(data.title);
	    	 $('#survey_title').attr('data-surveyId',data.id);
	    });
			  
	    $.get("/api/surveys/"+surveyId+"/questions" , function(questions) {
	      console.log("questions", questions);
		     displayQuestions(questions)
	    });
	}


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
      for (var i = 0; i < question.Answers.length; i++)
      {

        if(question.answerType === 'RadioButtons')
        {
          html = html + "<input type='radio'  class='radio_input'>" + question.Answers[i].text + "</input> <br>";
        }
        else if(question.answerType === 'CheckBoxes')
        {
          html = html + "<input type='checkbox' class='radio_input'>" + question.Answers[i].text + "</input> <br>";
        }	
      } 	
    }

    html = html+'</form>';
    $("#survey_content").append(html);
  }

 
});	