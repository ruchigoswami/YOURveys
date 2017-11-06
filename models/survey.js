module.exports = function(sequelize, DataTypes) {
  var Survey = sequelize.define("Survey", {
    // Giving the Author model a name of type STRING
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    }
  });
  Survey.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Survey.hasMany(models.Question, {
      onDelete: "cascade"
    });
    /*Survey.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });*/
  };
  return Survey;
};