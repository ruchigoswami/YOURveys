$(document).ready(function() {
  /* global moment */
  // blogContainer holds all of our posts
  var surveyContainer = $(".survey-container");
  var surveyCategorySelect = $("#category");

  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleSurveyDelete);
  $(document).on("click", "button.edit", handleSurveyEdit);

  // Variable to hold our surveys
  var surveys;

  // The code below handles the case where we want to get survey surveys for a specific user
  // Looks for a query param in the url for user_id
  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getSurveys(userId);
  }
  // If there's no userId we just get all surveys as usual
  else {
    getSurveys();
  }

  // This function grabs surveys from the database and updates the view
  function getSurveys(user) {
    userId = user || "";
    console.log("userId = " + userId);
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/surveys" + userId, function(data) {
      console.log("Surveys", data);
      surveys = data;
      if (!surveys || !surveys.length) {
        displayEmpty(user);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete surveys
  function deleteSurvey(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/surveys/" + id
    })
    .done(function() {
      getPosts(surveyCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed survey HTML inside blogContainer
  function initializeRows() {
    surveyContainer.empty();
    var surveysToAdd = [];
    for (var i = 0; i < surveys.length; i++) {
      surveysToAdd.push(createNewRow(surveys[i]));
    }
    surveyContainer.append(surveysToAdd);
  }

  // This function constructs a survey's HTML
  function createNewRow(survey) {
    var formattedDate = new Date(survey.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newSurveyPanel = $("<div>");
    newSurveyPanel.addClass("panel panel-default");
    var newSurveyPanelHeading = $("<div>");
    newSurveyPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("Delete");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("Edit");
    editBtn.addClass("edit btn btn-info");
    var newSurveyTitle = $("<h2>");
    var newSurveyDate = $("<small>");
    var newSurveyUser = $("<h5>");
    newSurveyUser.text("Written by: " + survey.User.username);
    newSurveyUser.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newSurveyPanelBody = $("<div>");
    newSurveyPanelBody.addClass("panel-body");
    var newSurveyBody = $("<p>");
    newSurveyTitle.text(survey.title + " ");
    newSurveyBody.text(survey.body);
    newSurveyDate.text(formattedDate);
    newSurveyTitle.append(newSurveyDate);
    newSurveyPanelHeading.append(deleteBtn);
    newSurveyPanelHeading.append(editBtn);
    newSurveyPanelHeading.append(newSurveyTitle);
    newSurveyPanelHeading.append(newSurveyUser);
    newSurveyPanelBody.append(newSurveyBody);
    newSurveyPanel.append(newSurveyPanelHeading);
    newSurveyPanel.append(newSurveyPanelBody);
    newSurveyPanel.data("survey", survey);
    return newSurveyPanel;
  }

  // This function figures out which survey we want to delete and then calls deleteSurvey
  function handleSurveyDelete() {
    var currentSurvey = $(this)
      .parent()
      .parent()
      .data("survey");
    deleteSurvey(currentSurvey.id);
  }

  // This function figures out which survey we want to edit and takes it to the appropriate url
  function handleSurveyEdit() {
    var currentSurvey = $(this)
      .parent()
      .parent()
      .data("survey");
    window.location.href = "/cms?survey_id=" + currentSurvey.id;
  }

  // This function displays a message when there are no surveys
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for User #" + id;
    }
    surveyContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No surveys yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    surveyContainer.append(messageh2);
  }
});