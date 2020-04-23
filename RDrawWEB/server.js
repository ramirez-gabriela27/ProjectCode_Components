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

// const dbConfig = {
// 	host: '98.245.162.1',
// 	port: 5432,
// 	database: 'user_info',
// 	user: 'postgres',
// 	password: 'rdraw'
// };

// const dbConfig = {
// 	host: 'localhost',
// 	port: 5432,
// 	database: 'user_info',
// 	user: 'postgres',
// 	password: 'rdraw'
// };



const dbConfig = process.env.DATABASE_URL;

var db = pgp(dbConfig);
//**************************************

var current_user_id = 4;

function create_new_user_id(){
    current_user_id = current_user_id+1;
}

var match = false;
function check_password(pass_word1, pass_word2){
		console.log(match);
		if (pass_word1 == pass_word2) {
				match = true;
		}
		else {
				match = false;
		}
    return match;
}
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory



//***************Below goes all of the code to load each individual site (reference lab 7)
//example:

app.get('/', function(req, res) {
	res.render('pages/Login',{
		local_css:"Mystyle.css",
		my_title:"RDraw Login"
	});
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

app.get('/waitingpage', function(req, res) {
	res.render('pages/waitingpage',{
		local_css:"Mystyle.css",
		my_title:"RDraw Drawroom"
	});
});

app.post('/Login/signin', function(req,res) {
	var user_name = req.body.username;
	var pass_word = req.body.password;

	var search_for_pass_word = "select password from user_table where user_name = '" +  user_name + "';";

	db.task('get-everything', task => {
				return task.batch([
						task.any(search_for_pass_word)
				]);
		})
		.then(data => {
			//console.log(search_for_pass_word);
			var check = check_password(pass_word,data[0].search_for_pass_word);
        if (check == true) {
          res.render('pages/waitingpage',{
  					local_css:"Mystyle.css",
  					my_title: "RDraw Login"
  				});
        }
				else {
          alert("Password is incorrect. Please try again.");
          res.render('pages/Login',{
        		local_css:"Mystyle.css",
        		my_title:"RDraw Login"
        	});
        }
			})
		.catch(err => {
				// display error message in case an error
				//request.flash('error', err);
				res.render('pages/Login',{
					local_css:"Mystyle.css",
					my_title:"RDraw Login"
				});
		});
});
app.post('/Login/form', function(req, res) {
	create_new_user_id();
	var user_id = current_user_id;
	var first_name = req.body.firstName;
	var last_name = req.body.lastName;
	var user_name = req.body.userName;
	var password = req.body.password;

	var insert_statement = "INSERT INTO user_table(user_id, last_name, first_name, user_name, password) VALUES("+ user_id + ",'" + last_name + "','" +
							first_name + "','" + user_name + "','" + password + "');";

  console.log('test hello');
  console.log(first_name);
  console.log(last_name);

	console.log(insert_statement);
	db.task('get-everything', task => {
				return task.batch([
						task.any(insert_statement)
				]);
		})
		.then(info => {
			res.render('pages/waitingpage',{
				local_css:"Mystyle.css",
				my_title: "RDraw Login"
			})
		})
		.catch(err => {
				// display error message in case an error
						console.log('error', err);
						res.render('pages/waitingpage', {
							local_css:"Mystyle.css",
							my_title: "RDraw Login"
						})
		});
});





//server will run on this port
// app.listen(3000);
// console.log("listening on port 3000");
const port = process.env.PORT || 4000;
app.listen(port);
console.log("listening on port 4000");
