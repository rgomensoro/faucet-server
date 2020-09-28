const request = require('request')
const Hathor = require('@hathor/wallet-lib')
const config = require('./config')

const walletFunction = (address, callback) => {

  var request = require('request');
  var options = {
    'method': 'POST',
    'url': 'http://localhost:8000/wallet/simple-send-tx',
    'headers': {
      'X-Wallet-Id': 'wallet1',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      'address': address,
      'value': '1'
    }
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);

    callback(undefined, {
      location: 'Wallet faucet dropped some WATER!',
      balance: 1
  })

  });
  
}

module.exports = walletFunction