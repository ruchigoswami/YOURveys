INSERT INTO `yourvey`.`users` (`id`, `username`, `password`, `createdAt`, `updatedAt`)
     VALUES ('1', 'admin', 'admin', '2017-11-01 17:41:11', '2017-11-01 17:41:11'),
            ('2', 'edmacall', 'edmacall', '2017-11-01 17:41:11', '2017-11-01 17:41:11');

INSERT INTO `yourvey`.`surveys` (`id`, `title`, `createdAt`, `updatedAt`, `UserId`)
     VALUES ('1', 'First Survey', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '1');

INSERT INTO `yourvey`.`questions` (`id`, `text`, `answerType`, `questionNumber`, `createdAt`, `updatedAt`, `SurveyId`)
     VALUES ('1', 'What is your favorite food?', 'RadioButtons', '1', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '1'),
            ('2', 'What states have you lived in?', 'CheckBoxes', '2', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '1'),
            ('3', 'What was your childhood nickname?', 'TextBox', '3', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '1'),
            ('4', 'Do you like cats or dogs?', 'RadioButtons', '4', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '1'),
            ('5', 'What electronic devices do you own?', 'CheckBoxes', '5', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '1'),
            ('6', 'Who is your favorite musician?', 'TextBox', '6', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '1');

INSERT INTO `yourvey`.`answers` (`id`, `text`, `voteCount`, `answerNumber`, `createdAt`, `updatedAt`, `QuestionId`)
     VALUES ('1', 'Spaghetti', '0', '1', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '1'),
            ('2', 'Pizza', '0', '2', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '1'),
            ('3', 'Burgers', '0', '3', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '1'),;
            ('4', 'Ohio', '0', '1', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '2'),
            ('5', 'Montana', '0', '2', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '2'),
            ('6', 'Pennsylvania', '0', '3', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '2'),
            ('7', 'Indiana', '0', '4', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '2'),
            ('8', 'cats', '0', '1', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '4'),
            ('9', 'dogs', '0', '2', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '4'),
            ('10', 'Phone', '0', '1', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '5'),
            ('11', 'Laptop Computer', '0', '2', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '5'),
            ('12', 'Desktop Computer', '0', '3', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '5'),
            ('13', 'Tablet', '0', '4', '2017-11-01 17:41:11', '2017-11-01 17:41:11', '5');
