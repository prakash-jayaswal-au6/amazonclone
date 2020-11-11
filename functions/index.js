const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('sk_test_51HSqzhIeqow5XXvPhJMUh5Tx9gbtNmpvVnWzpxx0QGJO6aEK0EP1KrJP3YkW7REHANyC3ZvtyhWA6QtNpBJtrgYe00wl1Ypb8P')

//API 

//App Config
const app = express();

//Middlwares
app.use(cors({ origin: true }));
app.use(express.json())

//API route
app.get('/', (req, res) => {
    res.status(200).send('hello world')
})

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;
    console.log('Payment request received for this amount >>> ', total)
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'inr',
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})
//Listen Command
exports.api = functions.https.onRequest(app);

//Example Endpoint
// http://localhost:5001/clone-2e316/us-central1/api