const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');


app.use((req,res,next) => {

	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log+'\n', function (err) {
	    if(err){
	        throw err;
	    }
	});

	next();
});

// app.use((req,res,next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
	return text.toUpperCase();
});

app.get('/', (req,res) => {
	//res.send('<h1>Hello Express!</h1>');
	res.render('home.hbs',{
		titleTag: 'Home',
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome To the Environment',
	});
});
app.get('/about',(req,res) => {
	//res.send('<h2 style="text-align:center">About US<h2>')
	res.render('about.hbs',{
		titleTag: 'About Us',
		pageTitle: 'About Page',
	});
});


app.get('/bad',(req,res) => {
	res.send({
		errorMessage:'Unable to handle request'
	});
});
app.listen(port,() => {
	console.log(`Server is up on the port ${port}`);
});