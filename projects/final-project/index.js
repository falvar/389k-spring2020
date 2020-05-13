var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var dotenv = require('dotenv');
var Recipe = require('./Recipe');
var exphbs = require('express-handlebars');
var handlebars = exphbs.handlebars;
const Handlebars = require('handlebars');
var nodemailer = require('nodemailer');
var share = require('./share')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

// Load envirorment variables
dotenv.config();
console.log(process.env.MONGODB);
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function () {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

// Setup Express App
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

app.get('/', function (req, res) {
    Recipe.find(function (err, recipe) {
        //console.log(recipe)
        res.render('home', { recs: recipe });
    });
})

app.get("/addRecipe", function (req, res) {
    res.render('create');
});

app.post('/addRecipe', function (req, res) {
    // Create new recipe
    var recipe = new Recipe({
        title: req.body.title,
        calories: parseInt(req.body.calories),
        instructions: req.body.instructions,
        user: req.body.user,
        reviews: []
    });

    // Save recipe to database
    recipe.save(function (err) {
        if (err) throw err;
        return res.send('Succesfully inserted recipe.');
    });


});

app.delete('/recipe/:id', function (req, res) {
    // Find recipe by id
    Recipe.findByIdAndRemove(req.params.id, function (err, recipe) {
        if (err) throw err;

        if (!recipe) { return res.send('No recipe with that id'); }
        res.send('recipe deleted!');
    });


});

app.get('/getRecipes', function (req, res) {
    Recipe.find({}, function (err, recipes) {
        if (err) throw err;
        res.send(recipes);
    });
});

app.post('/recipe/:id/addReview', function (req, res) {
    // Add a review
    //Find the given recipe
    Recipe.findOne({ _id: req.params.id }, function (err, recipe) {
        if (err) throw err;
        if (!recipe) return res.send('No recipe found with that ID.');

        //Creating the review schema
        recipe.reviews.push({
            rating: parseFloat(req.body.rating),
            comment: req.body.comment,
            author: req.body.author
        });

        //Saving the updated recipe
        recipe.save(function (err) {
            if (err) throw err;
            res.send('Sucessfully added review.');
        });

    });
});

// Mails Recipe
app.get('/email/:id/:email', function (req, res) {
    Recipe.findOne({ _id: req.params.id }, function (err, recipe) {
        if (err) throw err;
        if (!recipe) return res.send('No recipe found with that ID.');

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport(
            {
                service: 'gmail',
                auth: {
                    user: 'fatimaalvarado99@gmail.com',
                    pass: 'falvarado99'
                }
            }
        );

        // Message object
        let message = {
            from: '"Recipes for All" fatimaalvarado99@gmail.com',
            to: `${req.params.email}`,
            subject: 'Check Out this Recipe!', // Subject line
            text: recipe.title + "\n" + recipe.instructions, // plain text body
            html: `<b>${recipe.title}</b><br>${recipe.instructions}`
        };

        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
                return process.exit(1);
            }

            console.log('Message sent successfully!');
        });


    });
    res.send("Email sent!")
});

//Send PDF of all recipes
app.get('/sendAll/:email', function (req, res) {
    Recipe.find({}, function (err, recipes) {
        if (err) throw err;
        share.initData(recipes);
        let buff = share.download();

        //Sending mail
        let transporter = nodemailer.createTransport(
            {
                service: 'gmail',
                auth: {
                    user: 'fatimaalvarado99@gmail.com',
                    pass: 'falvarado99'
                }
            }
        );

        // Message object
        let message = {
            from: '"Recipes for All" fatimaalvarado99@gmail.com',
            to: `${req.params.email}`,
            subject: 'Check Out these Recipes!', // Subject line
            attachments: [{
                filename: 'Recipes.pdf',
                content: buff
            }]
        };

        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
                return process.exit(1);
            }

            console.log('Message sent successfully!');
        });
    });
    res.send("Recipes Sent!")
});

// Deletes the most recently added review for the specified recipe
app.delete('/recipe/:id/review/last', function(req, res) {
    Recipe.findOne({ _id: req.params.id }, function (err, recipe) {
        if (err) throw err;
        if (!recipe) return res.send('No recipe found with that ID.');

        if(recipe.reviews == []) return res.send('No reviews for the Movie');
        
        recipe.reviews.pop();
        recipe.save(function (err) {
            if (err) throw err;
            res.send('Review deleted!');
        });
    });
});

// Gens post
app.get('/post/:id', function (req, res) {
    var _id = req.params.id;
    Recipe.findById(_id, function (err, recipe) {
        console.log(recipe);
        if (!recipe) return res.render('404');
        res.render('post', recipe);
    });
});

app.get('/about', function (req, res) {
    res.render('about');
})


app.listen(3000, function () {
    console.log('App listening on port 3000!');
})