const { Sequelize, DataTypes } = require('sequelize');
const {db} = require('./db');

const Song = db.define('Song',{
    title: {
        type: DataTypes.STRING
    },
    year: {
        type: DataTypes.NUMBER
    }
})

module.exports = {
    Song
};