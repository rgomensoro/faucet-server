const path = require('path')
const express = require('express')
const hbs = require('hbs')
const walletFunction = require('./utils/wallet')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const port = process.env.PORT || 3000

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {

    var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'http://localhost:8000/start',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        'wallet-id': 'wallet1',
        'seedKey': 'default',
        'passphrase': 'Dudu2007!'
      }
    };
    
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
    
    res.render('index', {
        title: 'WATER Faucet',
        name: 'Hathor Heroes'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Hathor Heroes'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Follow the next steps to get some drops of water.',
        title: 'Help',
        name: 'Hathor Heroes'
    })
})

app.get('/faucet', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a WALLET address!'
        })
    }

    walletFunction(req.query.address, (error, { location,balance } = {}) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            location,
            balance,
            address: req.query.address
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hathor Heroes',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hathor Heroes',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port + ".")
})

