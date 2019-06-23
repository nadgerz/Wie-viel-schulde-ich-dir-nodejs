
// faker for 100 unique name
let all_people = [
    'Beck, Glenn',
    'Becker, Carl',
    'Beckett, Samuel',
    'Beddoes, Mick',
    'Beecher, Henry',
    'Beethoven, Ludwig',
    'Begin, Menachem',
    'Belloc, Hilaire',
    'Bellow, Saul',
    'Benchley, Robert',
    'Benenson, Peter',
    'Ben-Gurion, David',
    'Benjamin, Walter',
    'Benn, Tony',
    'Bennington, Chester',
    'Benson, Leana',
    'Bent, Silas',
    'Bentsen, Lloyd',
    'Berger, Ric',
    'Bergman, Ingmar',
    'Berio, Luciano',
    'Berle, Milton',
    'Berlin, Irving',
    'Berne, Eric',
    'Bernhard, Sandra',
    'Berra, Yogi',
    'Berry, Halle',
    'Berry, Wendell',
    'Bethea, Erin',
    'Bevan, Aneurin',
    'Bevel, Ken',
    'Biden, Joseph',
    'Bierce, Ambrose',
    'Biko, Steve',
    'Billings, Josh',
    'Biondo, Frank',
    'Birrell, Augustine',
    'Black, Elk',
    'Blair, Robert',
    'Blair, Tony',
    'Blake, William',
];

all_people = [ "steve", "maurice", "kerstin", "bernhard", "simone", "katarina" ]
// console.log( all_people )

//
//    Pick a random number of people from the full list, with
//    a minimum of 2 people.
//
const num_people = Math.floor(Math.random() * all_people.length) + 2
// console.log( num_people )
//process.exit(0)

const people = all_people.slice(0, num_people)
// console.log( people )
// process.exit(0)

//
//    Create a random number of transaction.
//
const MAX_TRANSACTIONS = 20
const num_transactions = Math.floor(Math.random() * MAX_TRANSACTIONS) + 1
console.log( `Number of transactions: ${num_transactions}` )

//
//    Generate some random transactions.
//
const transactions = []
const MAX_OWED = 20;

for( i = 1; i<= num_transactions; i++) {
    // console.log( `Loop: ${i}` )

    //
    //    Pick a random person - they will owe someone something.
    //
    const p1 = Math.floor(Math.random() * people.length)
    // console.log( `Person 1: ${p1}`)

    // now get p2, but p2 != p1
    let p2 = -1

    do {
	p2 = Math.floor(Math.random() * people.length)
	// console.log( `Try => Person 2: ${p2}`)
    } while (p2 === p1)

    //
    //    Now a random $ amount
    //
    const owed = Math.floor(Math.random() * MAX_OWED * 100) / 100
    // console.log( `Owed => ${owed}`)

    console.log( `Xact ${i}: ${people[p1]} owes ${people[p2]} $${owed}`)

    transactions.concat(
	{
	    parasite: p1,
	    benefactor: p2,
	    owed
	}
    )
}

console.log( transactions )

process.exit( 0 )
