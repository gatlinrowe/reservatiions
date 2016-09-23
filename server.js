// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Star Wars Characters (DATA)
// =============================================================
var reserve = [{
    name: 'Jenny',
    phone: '8675309',
    email: 'jenny@gmail.com',
    uniqueID: 'jenny'
    
}, {
    name: 'Jill',
    phone: '9785555',
    email: 'jill@gmail.com',
    uniqueID: 'jill',
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/form', function (req, res) {
	res.sendFile(path.join(__dirname, 'form.html'));
});

app.get('/list', function (req, res) {
	res.sendFile(path.join(__dirname, 'list.html'));
});

// Search for Specific Character (or all characters) - provides JSON
app.get('/api/:reserve?', function (req, res) {
	var chosen = req.params.reserve;

	if (chosen) {
		console.log(chosen);

		for (var i = 0; i < reserve.length; i++) {
			if (chosen === reserve[i].routeName) {
				res.json(reserve[i]);
				return;
			}
		}

		res.json(false);
	} else {
		res.json(reserve);
	}
});

// Create New Characters - takes in JSON input
app.post('/api/new', function (req, res) {
	var newreserve = req.body;

	console.log(newreserve);

	reserve.push(newreserve);

	res.json(reserve);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});
