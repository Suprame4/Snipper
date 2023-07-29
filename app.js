require('dotenv').config();
const express = require('express');
const app = express()
const PORT  = process.env.PORT; 

const routes = require('./routes')
const requestLogger = require('./middleware/Logger');

app.use(express.json());
app.use(requestLogger);

app.use('/snippet', routes.snippet);
app.use('/user', routes.user);

// start the server
app.listen(PORT, () => {
    console.log(`Your server is listening on port http://localhost:${PORT}/snippet`);
})