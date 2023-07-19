const { sequelize } = require('./database');
const seed = require('./seedFxn');

seed()
    .then(() => {
        console.log('Seeding success. Coding snippets to the rescue')
    })
    .catch( err => {
        console.error(err);
    })
    .finally(() => {
        sequelize.close();
    });