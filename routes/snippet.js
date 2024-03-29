const route = require('express').Router();
const { encrypt, decrypt } = require('../utils/encrypt');

const { sequelize } = require('../database/index');
const { Snippet, findMaxId } = require('../database/Snippet')
const { requiresAuth } = require('express-openid-connect')

// generate a unique ID for each snippet
//let id = Snippet.length + 1;

// create a new snippet - 
route.post('/', requiresAuth(), async (req, res) => {
    const { language, code } = req.body;

    // basic validation
    if (!language || !code) {
      return res
        .status(400)
        .json({ error: 'Language and code are required fields' })
    }
  
    try {

        const snippet = await Snippet.create({
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
  route.get('/', requiresAuth(), async (req, res, next) => {
    
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
  route.get('/:id', requiresAuth(), async (req, res) => {
  
    const snippet = await Snippet.findByPk(req.params.id);
  
    if (!snippet) {
      return res.status(404).json({ error: 'Snippet not found' })
    }
  
    res.json(snippet);
  });

  module.exports = route; 