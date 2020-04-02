/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//database connection******************
var pgp = require('pg-promise')();

const dbConfig = {
	host: '98.245.162.1',
	port: 5432,
	database: 'user_info',
	user: 'postgres',
	password: 'rdraw'
};

var db = pgp(dbConfig);
//**************************************


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory



//***************Below goes all of the code to load each individual site (reference lab 7)
//example:

app.get('/Login/form', function(req, res) {
	var first_name = req.body.firstName;
	var last_name = req.body.lastName;
	var user_name = req.body.userName;
	var password = req.body.psw;

	var insert_statement = "INSERT INTO User(last_name, first_name, user_name, password) VALUES('" + last_name + "','" +
							first_name + "','" + user_name +"','" + password + "') ON CONFLICT DO NOTHING;";

	db.task('get-everything', task => {
        return task.batch([
            task.any(insert_statement)
        ]);
    })
});

app.get('/Login', function(req, res) {
	res.render('pages/Login',{
		local_css:"Mystyle.css",
		my_title:"RDraw Login"
	});
});

app.get('/drawroom', function(req, res) {
	res.render('pages/drawroom',{
		local_css:"Mystyle.css",
		my_title:"RDraw Drawroom"
	});
});



//server will run on this port
app.listen(3000);
