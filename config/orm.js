// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  // TODO - delete this one
  selectWhere: function(tableInput, colToSearch, valOfCol) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, result) {
      return result;
    });
  },

  all: function(tableInput, cb) {
  	console.log("The orm.all method got called.");
  	var queryString = "SELECT * FROM ??";
  	connection.query(queryString, [tableInput], function(err, result) {
  	  console.log("I'm inside the connection.query.")
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  insertOne: function() {
  	var queryString = "SELECT * FROM ?? WHERE ?? = ?";
  	connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, result) {
      return result;
    });
  },

  // TODO - delete this one
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
        queryString += " (" + cols.toString();
        queryString += ") " + "VALUES (" + printQuestionMarks(vals.length);
        queryString += ") ";
    console.log(queryString);
    console.log(vals);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  updateOne: function(table, objColVals, condition, cb) {
    console.log("The table that I tried to call was " + table + ".");
    var queryString = "UPDATE "  + table;
        queryString += " SET "   + objToSql(objColVals);
        queryString += " WHERE " + condition;
    console.log(queryString);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;