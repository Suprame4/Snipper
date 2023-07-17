require('dotenv').config();
const express = require('express');
const app = express()
const PORT  = process.env.PORT; 


// array to store snippets
const snippets = require('./seedData.json');

// generate a unique ID for each snippet
let id = snippets.length + 1;

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


// create a new snippet
app.post('/snippet', (req, res) => {
  const { language, code } = req.body

  // basic validation
  if (!language || !code) {
    return res
      .status(400)
      .json({ error: 'Language and code are required fields' })
  }

  const snippet = {
    id: id++,
    language,
    code
  }

  snippets.push(snippet)
  res.status(201).json(snippet)
});

// get all snippets
app.get('/snippet', (req, res) => {
  const { lang } = req.query

  if (lang) {
    const filteredSnippets = snippets.filter(
      snippet => snippet.language.toLowerCase() === lang.toLowerCase()
    )
    return res.json(filteredSnippets)
  }

  res.json(snippets)
});

// get a snippet by ID
app.get('/snippet/:id', (req, res) => {
  const snippetId = parseInt(req.params.id)
  const snippet = snippets.find(snippet => snippet.id === snippetId)

  if (!snippet) {
    return res.status(404).json({ error: 'Snippet not found' })
  }

  res.json(snippet)
});

//Bonus: Users can make a GET request to e.g. /snippet?lang=python 
//to retrieve all the Python snippets
app.get('/snippet', (req, res) => {

    const lang = req.query.lang;

    //find the code snippet
    const snippet = snippets.find(snip => snip.language === lang);

    if( !snippet ){
        return res.status(404).json({ error: 'Snippet not found' });
    }

    res.json(snippet);
})

// start the server
app.listen(PORT, () => {
    console.log(`Your server is listening on port http://localhost:${PORT}/snippet`);
})