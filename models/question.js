module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    // Giving the Author model a name of type STRING
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    answerType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      }
    },
    questionNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    // surveyId: DataTypes.INT
  });
  Question.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Question.hasMany(models.Answer, {
      onDelete: "cascade"
    });
    Question.belongsTo(models.Survey, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Question;
};