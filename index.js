const {db} = require('./db');

const {Band} = require('./Band')
const {Musician} = require('./Musician')

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

    const jack = await Musician.create({
        name: 'Jack',
        instrument: 'Bass & Vocals'
    })

    const craig = await Musician.create({
        name: 'Craig',
        instrument: 'Guitar & Vocals'
    })

    const rich = await Musician.create({
        name: 'Richie Sausage',
        instrument: 'Drums'
    })

    const chris = await Musician.create({
        name: 'Crust Crustwell',
        instrument: 'Guitar & Vocals'
    })

    const scott = await Musician.create({
        name: 'Scott',
        instrument: 'Guitar & Vocals'
    })

    const jon = await Musician.create({
        name: 'Jon',
        instrument: 'Bass & Vocals'
    })

    const paul = await Musician.create({
        name: 'Paul',
        instrument: 'Drums'
    })
}

main();

module.exports = {
    Band,
    Musician
};
