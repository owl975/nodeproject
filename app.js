var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var _ = require("underscore");

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());



var users = [
	{id: 1,
	username: "Matt",
	firstname: "Matthew",
	lastname: "Gomez",
	age: 29},
	{id: 2,
	username: "Jon",
	firstname: "Jonathan",
	lastname: "Fulton",
	age: 31}
];

app.get("/users", function(req, res){
	res.json(users);

});

app.post("/users", function(req, res){
	var newUser = req.body;


	users.push(newUser);
	res.json(users);

});

app.put("/users/:id", function(req, res){
	var targetID = req.params.id;

	var targetID = parseInt(req.params.id);

	var foundUser = _.findWhere(users, {id: targetID});

	foundUser.username = req.body.username;

	foundUser.firstname = req.body.firstname;

	foundUser.lastname = req.body.lastname;

	foundUser.age = parseInt(req.body.age);

	res.json(foundUser);

});


app.delete("/users/:id", function(req, res){

	if(users.length <= req.params.id){
		res.statusCode = 404;
		return res.send('Error 404: No user found');
	}

	var targetID = parseInt(req.params.id);

	var foundUser = _.findWhere(users, {id: targetID});

	var index = users.indexOf(foundUser);

	users.splice(index, 1);

	res.json(foundUser);

});




app.listen(3000);