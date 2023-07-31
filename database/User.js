const {Sequelize, sequelize} = require('./database');

const User = sequelize.define('user', {
    id: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        
    },
    username: Sequelize.STRING,
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING
});

module.exports = { User }; 