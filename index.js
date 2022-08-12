const {db} = require('./db');

const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Song')

Musician.belongsTo(Band);
Band.hasMany(Musician);

Song.belongsToMany(Band, {through: 'perform', as: 'Performed_by'});
Band.belongsToMany(Song, {through: 'perform', as: 'Performer'});

async function main(){
    await db.sync({ force: true });

    const atomicHero = await Band.create({
        name: 'Atomic Hero',
        genre: 'Skate Punk'
    })

    const theFlatliners = await Band.create({
        name: 'The Flatliners',
        genre: 'Punk'
    })

    const jack = await atomicHero.createMusician({
        name: 'Jack',
        instrument: 'Bass & Vocals'
    })

    const craig = await atomicHero.createMusician({
        name: 'Craig',
        instrument: 'Guitar & Vocals'
    })

    const rich = await atomicHero.createMusician({
        name: 'Richie Sausage',
        instrument: 'Drums'
    })

    const chris = await theFlatliners.createMusician({
        name: 'Crust Crustwell',
        instrument: 'Guitar & Vocals'
    })

    const scott = await theFlatliners.createMusician({
        name: 'Scott',
        instrument: 'Guitar & Vocals'
    })

    const jon = await theFlatliners.createMusician({
        name: 'Jon',
        instrument: 'Bass & Vocals'
    })

    const paul = await theFlatliners.createMusician({
        name: 'Paul',
        instrument: 'Drums'
    })
}

main();

module.exports = {
    Band,
    Musician
};
