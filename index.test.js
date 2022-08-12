const {db} = require('./db');
const {Band, Musician} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await db.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const newBand = await Band.create({
            name: 'Atomic Hero',
            genre: 'Skate Punk'
        })
        expect(newBand.name).toEqual('Atomic Hero');
    })

    test('can create a Musician', async () => {
        const newLegend = await Musician.create({
            name: 'Craig',
            instrument: 'Guitar'
        })
        expect(newLegend.instrument).toEqual('Guitar');
    })

    test('can create a Musician that belongs to a band', async () => {
        const ah = await Band.findOne({
            where: {
                name: 'Atomic Hero'
            }
        })
        const newLegend1 = await ah.createMusician({
            name: 'Jack',
            instrument: 'Bass'
        })
        expect(newLegend1.BandId).toEqual(ah.id);
    })
})