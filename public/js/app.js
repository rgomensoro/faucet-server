console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value

    messageOne.textContent = 'Loading...'

    fetch('/faucet?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location + ' With this current balance: ' + data.balance
            }
        })
    })
})