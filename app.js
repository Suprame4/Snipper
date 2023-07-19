/*
To-do list:
    Add mysql and sequlize 
        Establish the relationships
        Populate with data 
    Complete week 2 and 3

    Ask Jonathan about the repo being the same as my work stack 


*/

require('dotenv').config();
const express = require('express');
const app = express()
const PORT  = process.env.PORT; 


//
const { Snippet } = require('./database/Snippet');

// generate a unique ID for each snippet
let id = Snippet.length + 1;

//create middleware to log the request 
const requestLogger = ( req, res, next ) => {
    console.log('Method: ', req.method);
    console.log('Path: ', req.path);
    console.log('Body: ', req.body);
    console.log('----');
    next();
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'});
}

app.use(express.json());
app.use(requestLogger);


// create a new snippet - 
app.post('/snippet', async (req, res) => {
  const { language, code } = req.body

  // basic validation
  if (!language || !code) {
    return res
      .status(400)
      .json({ error: 'Language and code are required fields' })
  }

  try {
    const snippet = await Snippet.create({
        id: id++,
        language: language,
        code: code
    });

    res.status(201).send(snippet.toJSON());
  }
  catch( error ){
    console.error( error )
  }

});

// get all snippets
app.get('/snippet', async (req, res, next) => {
  
try {
    const { lang } = req.query

    if (lang) {

        const snippet = await Snippet.findAll({ where: { language: lang }});

        if( !snippet ){
            return res.status(404).json({ error: 'Snippet not found' });
        }

        res.json(snippet);
    }

  
    const snippets = await Snippet.findAll(); 
    res.send(snippets); 

  }
  catch ( error ) {
    console.error(error);
    next(error); 
  }
});

// get a snippet by ID
app.get('/snippet/:id', async (req, res) => {


  const snippet = await Snippet.findByPk(req.params.id);

  if (!snippet) {
    return res.status(404).json({ error: 'Snippet not found' })
  }

  res.json(snippet);
});


// start the server
app.listen(PORT, () => {
    console.log(`Your server is listening on port http://localhost:${PORT}/snippet`);
})