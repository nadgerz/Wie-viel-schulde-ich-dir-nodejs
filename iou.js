
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

// const people = all_people.slice(0, num_people)
const people = all_people.slice(0, 3)
// console.log( people )
// process.exit(0)

//
//    Create a random number of transaction.
//
const MAX_TRANSACTIONS = 20
// const MAX_TRANSACTIONS = 5
const num_transactions = Math.floor(Math.random() * MAX_TRANSACTIONS) + 1
console.log( `Number of transactions: ${num_transactions}` )

//
//    Generate some random transactions.
//
let transactions = []
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
    //    Note: This is in cents, so we convert totals at end.
    //
    const owed = Math.floor(Math.random() * MAX_OWED * 100)
    // console.log( `Owed => ${owed}`)

    console.log( `Xact ${i}: ${people[p1]} owes ${people[p2]} $${owed}`)

    transactions = transactions.concat(
	{
	    parasite: p1,
	    benefactor: p2,
	    owed
	}
    )
}

console.log( transactions )


// Now run along transactions array and make a hash for the amount.
const xacts = {}
// console.log( typeof xacts )

transactions.map( (transaction,idx) => {
    const { parasite, benefactor, owed } = transaction
    // console.log( `XACT: ${idx + 1}` )
    // console.log( parasite, benefactor, owed )

    const key = `${parasite}_${benefactor}`
    // console.log( key )
    // console.log( typeof key )

    const current = xacts[`${key}`]
    // console.log( current )
    // console.log( typeof current )
    // console.log( typeof owed )

    if ( current ) {
	// console.log( 'there' )
	xacts[`${key}`] = current + owed
    } else {
	console.log( 'here')
	xacts[`${key}`] = owed
	// console.log( xacts )
	// console.log( 'que?' )
    }

    // console.log( xacts[`${key}`] )
})

console.log( xacts )

//
//    Now go through the transactions and check for bi-directional owing
//    and simplify.
//
let keys = Object.entries(xacts).map(([key, value]) => {
    console.log( key )
    console.log( value )
    return key
})

console.log( keys )

//
//    Change to foreach
//
for( i = 0; i < keys.length; i++) {
    [p1, p2] = keys[i].split('_')
    const owed = xacts[`${keys[i]}`]

    console.log( `Loop ${i}`, p1, p2, owed )

    const opposite_key = `${p2}_${p1}`
    const opposite_owed = xacts[`${opposite_key}`]
    console.log( opposite_key )
    console.log( opposite_owed )

    if (opposite_owed) {
	if ( owed >= opposite_owed ) {
	    const new_owed = owed - opposite_owed
	    xacts[i] = new_owed
	    xacts[`${opposite_key}`] = 0
	} else {
	    const new_owed = opposite_owed - owed
	    xacts[`${opposite_key}`] = new_owed
	    xacts[i] = 0
	}
    }
}

console.log( xacts )

process.exit( 0 )


const hash = {}
console.log( hash )
console.log( typeof hash )

const key = '1_2'
hash[`${key}`] = 5.6
console.log( hash )
