const app = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;



var app2 = app();

hbs.registerPartials(__dirname + '/views/partials');
app2.set('view-engine','hbs');
app2.use(app.static(__dirname + '/public'));
app2.use((req,res,next) => {
	var time = new Date().toString();
	var log = `${time} ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n',(err) =>{
		if(err){
			console.log("Unable to append to server.log file");
		}
	})
	next();
});
// app2.use((req,res,next) =>{
// 	res.render('maintaince.hbs');
// })
hbs.registerHelper('getCurrentYear',() =>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',item =>{
	return item.toUpperCase();
});
app2.get('/',(req,res) => {
	res.render('home.hbs',{
		coderWeb: "Home page",
		pageTitle: "About page",
		currentYear: new Date().getFullYear()
	})	
});

app2.get('/about', (req,res) => {
	res.render("About.hbs",{
		pageTitle: "About page", 
	});
}) 
app2.get('/bad', (req,res) => {
	//if()
	res.send({result:"no such route"})
}) 

app2.get('/projects', (req,res) => {
	res.render("projects.hbs",{
		pageTitle: "Projects page.",
		coderWeb:"Projects page"
	})
})

app2.listen(port ,() =>{
	console.log(`the app is listening on port ${port}`);
});

console.log("the app is running on the port 3000");