module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define("Answer", {
    // Giving the Author model a name of type STRING
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    // questionId: DataTypes.INTEGER,
    voteCount: {
      type: DataTypes.INTEGER
    }
  });
  Answer.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Answer.belongsTo(models.Question, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Answer;
};