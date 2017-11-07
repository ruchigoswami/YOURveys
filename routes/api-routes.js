var db = require("../models");
module.exports = function(app) {
	// Used for retrieving the user list.
    app.get("/api/users/", function (req, res) {
            db.User.findAll({
              include: [db.Survey]
            }).then(function(dbUser) {
                res.json(dbUser);
            });
    });

    app.post("/api/users/", function (req, res) {
      console.log('inside create user' + req);
      db.User.create({
        username: req.body.username,
        password: "asdf"
      }).then(function(dbUser) {
        console.log(dbUser);
        res.json(dbUser);
      });
    });

    app.get("/api/fullsurvey/", function (req, res) {
      db.Survey.findAll({

      }).then(function(dbSurvey) {
        res.json(dbSurvey);
      });
    });

    app.get("/api/fullsurvey/:id", function (req, res) {
      db.Survey.findOne({

      }).then(function(dbSurvey) {
        res.json(dbSurvey);
      });
    });

    app.post("/api/fullsurvey/", function (req, res) {
      console.log('inside create full survey' + req);
      console.log(req.body.fullsurvey.title);
      db.Survey.create({
        title: req.body.fullsurvey.title,
        UserId: 1
      }).then(function(dbSurvey) {
      	var questions = [];

      	var tempQ = req.body.fullsurvey.questions;
      	for(var i = 0; i < tempQ.length; i++)
      	{
          var question = {
          	text: tempQ[i].text,
          	answerType: tempQ[i].answerType,
          	questionNumber: (i + 1),
            SurveyId: dbSurvey.id
          };
          questions.push(question);
      	}

        db.Question.bulkCreate(questions);

        
      });
    });

    app.delete("/api/users/:id", function (req, res) {
      db.User.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbAuthor) {
        res.json(dbAuthor);
      });
    });

    // GET route for getting all of the surveys
    app.get("/api/surveys", function(req, res) {
      var query = {};
      if (req.query.user_id) {
        query.UserId = req.query.user_id;
      }
      // Here we add an "include" property to our options in our findAll query
      // We set the value to an array of the models we want to include in a left outer join
      // In this case, just db.User
      db.Survey.findAll({
        where: query,
        include: [db.User]
      }).then(function(dbSurvey) {
      	console.log(dbSurvey);
        res.json(dbSurvey);
      });
    });

    // Used for retrieving the survey that the user created based on the id that was assigned to it.
    app.get("/api/surveys/:id", function (req, res) {
            db.Survey.findOne({
                where: {
                    id: req.params.id
                },
                include: [db.User]
            }).then(function(dbSurvey) {
                res.json(dbSurvey);
            });
    });
    // Used for displaying the vote results for that specific survey after it has been created.
    app.get("/api/surveys/:id/data", function (req, res) {
            db.Answer.findOne({
                where: {
                    id: req.body.id
                }
            }).then(function(dbSurvey) {
                res.json(dbSurvey)
            });
    });
    // Used for sending the survey that the user just created to the database.
    app.post("/api/surveys/new", function (req, res) {
        console.log('inside create survey' + req);
            db.Survey.create({
                title: req.body.title,
                UserId: req.body.UserId
            }).then(function(dbSurvey) {
                console.log()
                res.json(dbSurvey);
            });
    });
    // Used for sending the vote results that come from someone taking and submitting the survey.
    app.put("/api/surveys/:id/submit", function (req, res) {
            db.Answer.update({
                voteCount: req.body.voteCount
            }, {
                where: {
                    id: req.body.id
                }
            }).then(function(dbSurvey) {
                res.json(dbSurvey);
            });
    });

    // Used to create a question to database.
   /* app.post("/api/surveys/question/new", function (req, res) {
        console.log('inside create question' + req);
            db.Question.create({
                text: req.body.text
                answerType: req.body.answerType,
                surveyId:req.body.surveyId ,
                answer:req.body.answer

            }).then(function(dbQuestion) {
                console.log('inside create question response')
                res.json(dbQuestion);
            });
    });*/
    // Used for editing a specific question in a survey that has been sent to the database.
    app.put("/api/surveys/:id/:questionid/edit", function (req, res) {
            db.Question.update({
                text: req.body.text
            }, {
                where: {
                    id: req.body.id
                }
            }).then(function(dbSurvey) {
                res.json(dbSurvey);
            });
    });
    // Used for editing a specific answer for a specific question in a survey that has been sent to the database.
    app.put("/api/surveys/:id/:questionid/:answerid/edit", function (req, res) {
            db.Answer.update({
                text: req.body.text
            }, {
                where: {
                    // specific question related to this answers option.
                }
            }).then(function(dbSurvey) {
                res.json(dbSurvey);
            });
    });
};