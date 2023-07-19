const { sequelize, Sequelize} = require('./database');

const Snippet = sequelize.define('snippet', {
    id: { 
        type: Sequelize.INTEGER,
        primaryKey: true
        
    },
    language: Sequelize.STRING,
    code: Sequelize.STRING,
}); 

module.exports = { Snippet }; 