const { Snippet } = require('./Snippet');
const { User } = require('./User');
const { sequelize, Sequelize } = require('./database');

Snippet.belongsTo(User, { foreignKey: 'ownerId' });
User.hasMany(Snippet);

module.exports = {
    Snippet,
    User,
    sequelize,
    Sequelize
};