const { sequelize } = require('./database');
const { Snippet } = require('./Snippet');
const { snippets } = require('./seedData');

const seed = async () => {
    try {
        await sequelize.sync({ force: true }); //recreate the db 
        const createdSnippets = await Snippet.bulkCreate(snippets);

    }
    catch ( error ) {
        console.log(error);
    }
}

module.exports = seed; 
