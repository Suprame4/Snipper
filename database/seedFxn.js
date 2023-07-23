const { sequelize } = require('./database');
const { Snippet } = require('./index');
const { User } = require('./index');
const { snippets, users } = require('./seedData');

const seed = async () => {
    try {
        await sequelize.sync({ force: true }); //recreate the db 
        const createdUsers = await User.bulkCreate(users);
        const createdSnippets = await Snippet.bulkCreate(snippets);

        for( let i = 0; i < createdSnippets.length; ++i ){
            let snippet = createdSnippets[i];
            const userId = createdUsers[i % 3].id;
            
            await snippet.setUser(userId);
        }

    }
    catch ( error ) {
        console.error(error);
    }
}

module.exports = seed; 
