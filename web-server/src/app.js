
require('dotenv').config()
// console.log('MAPBOX_TOKEN from app.js:', process.env.MAPBOX_TOKEN)

// npm run dev
// update Git and HeroKu


const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views locaction
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup handlebars engine and views location
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Christine'
    }); 
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Christine'
    }); 
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is a help text.',
        name: 'Christine'
    }); 
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'You must provide an address.' })
    }

    // default to Fahrenheit
    const unit = req.query.unit || 'f'

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, unit, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }

    console.log(req.query.search)
    res.send({
        products: []
    });
});

app.get('/about/*path', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Christine',
        errorMessage: '404 about article not found'
    });
});

app.get('/help/*path', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Christine',
        errorMessage: '404 Help article not found'
    });
});

app.get('/*path', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Christine',
        errorMessage: '404 page not found'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});

/**
 * Notes:
 * - Asynchronous program model one line runs after the next no matter how long it takes. Non-blocking model.
 * 
 * - Callstack: track execution of the program by keeping track of all the functions currently running. You can add on top or remove from the top.
 * 
 * - setTimeout is not part of the JS programming language. Is registered with Node API.
 * 
 * Callback Queues job to is maintain a list of the functions that are ready to be executed. 
 * 
 * Event loop looks at the callstack and callback queue. If Callstack is empty it will run items in the Callback Queue. Has to wiat for the Callstak to be empty
 * 
 * Callback -> Node API -> Callback Queue -(Event Loop)-> CallStack
 * 
 * Chrome JSON formatter - for easier reading of JSON data in the browser
 * 
 * Object Descruturing:
 * const product = { label: 'Red notebook', price: 3, stock: 201, salePrice: undefined }
 * 
 * const { label: productLabel, stock, rating = 5 } = product
 * 
 * console.log(productLabel) -> 'Red notebook'
 * console.log(stock) -> 201
 * console.log(rating) -> 5
 * 
 * Here we are taking the label property and assigning it to a new variable name productLabel. We are also setting a default value for rating of 5 in case it doesn't exist on the object.
 * 
 * Handlebars - allows us to load dynamic document rather than static.
 *            - render ddynamic content such as nav bar
 * 
 * --- app.js ---
 * const geocode = require('./utils/geocode');
    const forecast = require('./utils/forecast');
    
    const address = process.argv[2];
    
    if(!address) {
        console.log('Please provide an address');
    }
    else{
        geocode(address, (error, { latitude, longitude, location} = {}) => {
            if(error) {
                return console.log(error);
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return console.log(error);
                }
    
                console.log(location);
                console.log(forecastData);
            });
        });
    }
 */