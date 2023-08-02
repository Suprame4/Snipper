require('dotenv').config();
const express = require('express');
const app = express()
const PORT  = 4000;
const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.TOKEN_SECRET,
    baseURL: 'http://localhost:4000',
    clientID: 'CTGd60ToCsXQxMLPB3sKBhPsYGgXDpoT',
    issuerBaseURL: 'https://dev-xotpginuhs07e13c.us.auth0.com'
}

const routes = require('./routes/index')
const requestLogger = require('./middleware/Logger');

app.use(express.json());
app.use(auth(config));
app.use(requestLogger);

app.use('/snippet', routes.snippet);
app.use('/user', routes.user);

app.get('/ping', (req, res) => {
    res.send( { msg: 'pong'} )
})

// start the server
app.listen(PORT, () => {
    console.log(`Your server is listening on port http://localhost:${PORT}/`);
})