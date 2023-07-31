const route = require('express').Router()
const basicAuth = require('../middleware/basicAuth')
const bcrypt = require('bcrypt')
const { User } = require('../database/User')


/**
 * Create a user (sign up)
 */
route.post('/', basicAuth, async (req, res) => {
  // get the user data, thanks to basicAuth middleware!
  const {  email, password } = req.user;
    const { username, name } = req.body;
  // hash the password
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  try {
    const user = await User.create( {
        username: username,
        name: name,  
        email: email,
        password: hashedPassword
    })

    console.log("POST users: ", user);
    
    // don't send back the hashed password
    res.status(201).send(user.toJSON())
    }
    catch( error ){
        console.error(error);
    }
})

/**
 * BONUS:
 * Get the user specified by the Authorization header
 */
route.get('/', basicAuth, async (req, res) => {
    const {  email, password } = req.user;
  
    // get the user from the database
    const user = await User.findOne({
        where: { email: email }
    }) 
  //const user = users.find(user => user.email === req.user.email)

  // make sure the user exists
  if (!user) {
    return res.status(404).send({ error: 'User not found.' })
  }

  // compare the provided password with the hashed password from the db
  const result = await bcrypt.compare(password, user.password)

  if (!result) {
    return res.status(401).json({ error: 'Incorrect password' })
  }

  // don't send back the hashed password
  res.json({ id: user.id, email: user.email, username: user.username })
})

module.exports = route;
