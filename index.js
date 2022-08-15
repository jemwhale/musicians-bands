const {db} = require('./db');

const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Song')

Musician.belongsTo(Band);
Band.hasMany(Musician);

// Song.belongsToMany(Band, {through: 'perform', as: 'Performer'});
// Band.belongsToMany(Song, {through: 'perform', as: 'Performed'});

Song.belongsToMany(Band, {through: 'perform'});
Band.belongsToMany(Song, {through: 'perform'});

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

    const bodies = await Song.create({
        title: 'Bodies',
        year: 2017
    })

    const manhatthanStreets = await Song.create({
        title: 'Manhatthan Streets',
        year: 2017
    })

    const countYourBruises = await Song.create({
        title: 'Count Your Bruises',
        year: 2010
    })

    const birdsOfEngland = await Song.create({
        title: 'Birds Of England',
        year: 2013
    })

    await atomicHero.addSong(bodies)
    await atomicHero.addSong(manhatthanStreets)
    await atomicHero.addSong(countYourBruises)
    await atomicHero.addSong(birdsOfEngland)
    await theFlatliners.addSong(countYourBruises)
    await theFlatliners.addSong(birdsOfEngland)

    const bruisesBands = await atomicHero.getSongs()
    console.log(bruisesBands.map(x => (x.title)))


    // await bodies.addPerformer(atomicHero)
    // await manhatthanStreets.addPerformer(atomicHero)
    // await countYourBruises.addPerformer(atomicHero)
    // await countYourBruises.addPerformer(theFlatliners)
    // await birdsOfEngland.addPerformer(theFlatliners)
    // await birdsOfEngland.addPerformer(atomicHero)

    // const bruisesBands = await atomicHero.getPerformer()
    // console.log(bruisesBands.map(x => (x.title)))

    const bandsFacts = await Band.findAll({include: Musician})
    console.log(bandsFacts.map(x => x.toJSON())[0].Musicians[1].name)

    const ahFacts = await Band.findOne({
        where:{
            name: 'Atomic Hero'
        },
        include: Musician
    })

    console.log(ahFacts.Musicians[0].name)
}

main();

module.exports = {
    Band,
    Musician
}
