var Sequelize = require("sequelize");
var sequelize = new Sequelize("yourvey", "root", "poop500",{
	host: "localhost",
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

sequelize.authenticate().then(function(){
	console.log("Connection has been established.");
}).catch(function(err){
	console.log("Unable to connect to the database: " + err);
});

module.exports = sequelize;