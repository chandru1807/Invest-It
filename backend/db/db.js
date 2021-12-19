const knex = require('knex');
const { Model } = require('objection');
const knexfile = require('./knexfile');

//TODO in prod check with env to check which module to use
const db = knex(knexfile.development);

const setupObjectionDb = () => {
    Model.knex(db);
}

module.exports = {
    db,
    setupObjectionDb
};