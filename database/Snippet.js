const { sequelize, Sequelize} = require('./database');

const Snippet = sequelize.define('snippet', {
    id: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        
    },
    language: Sequelize.STRING,
    code: Sequelize.STRING,
}); 

async function findMaxId () {
    try {
        const maxId = await Snippet.findOne({ 
            attributes: [
                [ sequelize.fn('max', sequelize.col('id')), 'maxId'],
            ],
        });

        console.log('Max Id: ', maxId.maxId);
    }
    catch ( error ) {
        console.error('Error: ', error)
    }
}

module.exports = { Snippet, findMaxId }; 