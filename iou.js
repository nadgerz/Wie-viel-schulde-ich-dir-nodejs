const formatObj = obj => JSON.stringify(obj, null, 4);

//
// faker for 100 unique name
//

let all_people = [
  "Beck, Glenn",
  "Becker, Carl",
  "Beckett, Samuel",
  "Beddoes, Mick",
  "Beecher, Henry",
  "Beethoven, Ludwig",
  "Begin, Menachem",
  "Belloc, Hilaire",
  "Bellow, Saul",
  "Benchley, Robert",
  "Benenson, Peter",
  "Ben-Gurion, David",
  "Benjamin, Walter",
  "Benn, Tony",
  "Bennington, Chester",
  "Benson, Leana",
  "Bent, Silas",
  "Bentsen, Lloyd",
  "Berger, Ric",
  "Bergman, Ingmar",
  "Berio, Luciano",
  "Berle, Milton",
  "Berlin, Irving",
  "Berne, Eric",
  "Bernhard, Sandra",
  "Berra, Yogi",
  "Berry, Halle",
  "Berry, Wendell",
  "Bethea, Erin",
  "Bevan, Aneurin",
  "Bevel, Ken",
  "Biden, Joseph",
  "Bierce, Ambrose",
  "Biko, Steve",
  "Billings, Josh",
  "Biondo, Frank",
  "Birrell, Augustine",
  "Black, Elk",
  "Blair, Robert",
  "Blair, Tony",
  "Blake, William"
];

all_people = [
  "ambrose",
  "aneurin",
  "augustine",
  "bernhard",
  "carl",
  "chester",
  "david",
  "elk",
  "eric",
  "erin",
  "frank",
  "glenn",
  "halle",
  "henry",
  "hilaire",
  "ingmar",
  "irving",
  "joseph",
  "josh",
  "katharina",
  "ken",
  "kerstin",
  "leana",
  "lloyd",
  "luciano",
  "ludwig",
  "maurice",
  "menachem",
  "mick",
  "milton",
  "peter",
  "ric",
  "robert",
  "samuel",
  "sandra",
  "saul",
  "silas",
  "simone",
  "steve",
  "tony",
  "walter",
  "wendell",
  "william",
  "yogi"
];
// console.log( all_people )

//
//    Pick a random number of people from the full list, with
//    a minimum of 2 people.
//
const num_people = Math.floor(Math.random() * all_people.length) + 2;
console.log(`Number of people: ${num_people}`);
//process.exit(0)

let people = all_people.slice(0, num_people);
people = all_people.slice(0, 6);
console.log(people);
// process.exit(0)

//
//    Create a random number of transaction.
//
let MAX_TRANSACTIONS = 200;
MAX_TRANSACTIONS = 50;
let num_transactions = Math.floor(Math.random() * MAX_TRANSACTIONS) + 1;
num_transactions = 20;
console.log(`Number of transactions: ${num_transactions}`);

//
//    Generate some random transactions.
//
console.log(`Generate ${num_transactions} transactions.`);
let transactions = [];
const MAX_OWED = 20;

for (i = 1; i <= num_transactions; i++) {
  // console.log( `Loop: ${i}` )

  //
  //    Pick a random person - they will owe someone something.
  //
  const p1 = Math.floor(Math.random() * people.length);
  // console.log( `Person 1: ${p1}`)

  // now get p2, but p2 != p1
  let p2 = -1;

  do {
    p2 = Math.floor(Math.random() * people.length);
    // console.log( `Try => Person 2: ${p2}`)
  } while (p2 === p1);

  //
  //    Now a random $ amount
  //
  //    Note: This is in cents, so we convert totals at end.
  //
  const owed = Math.floor(Math.random() * MAX_OWED * 100);
  // console.log( `Owed => ${owed}`)

  console.log(`Xact ${i}: ${people[p1]} owes ${people[p2]} $${owed / 100}`);

  transactions = transactions.concat({
    parasite: p1,
    benefactor: p2,
    owed
  });
}

console.log(transactions);

console.log(`Make single transaction for each parasite/benefactor pair.`);
// Now run along transactions array and make a hash for the amount.
const xacts = {};
// console.log( typeof xacts )

transactions.map((transaction, idx) => {
  const { parasite, benefactor, owed } = transaction;
  // console.log( `XACT: ${idx + 1}` )
  // console.log( parasite, benefactor, owed )

  const key = `${parasite}_${benefactor}`;
  // console.log( key )
  // console.log( typeof key )

  const current = xacts[`${key}`];
  // console.log( current )
  // console.log( typeof current )
  // console.log( typeof owed )

  if (current) {
    // console.log( 'there' )
    xacts[`${key}`] = current + owed;
  } else {
    // console.log( 'here')
    xacts[`${key}`] = owed;
    // console.log( xacts )
    // console.log( 'que?' )
  }

  // console.log( xacts[`${key}`] )
});

console.log(xacts);

//
//    Now go through the transactions and check for bi-directional owing
//    and simplify.
//
let keys = Object.entries(xacts).map(([key, value]) => {
  // console.log( key )
  // console.log( value )
  return key;
});

console.log(keys);

//
//    Change to forEach?
//
for (i = 0; i < keys.length; i++) {
  [p1, p2] = keys[i].split("_");
  const key = `${keys[i]}`;
  const owed = xacts[`${key}`];

  console.log(`Loop ${i}`, p1, p2, owed);

  const opposite_key = `${p2}_${p1}`;
  const opposite_owed = xacts[`${opposite_key}`];
  // console.log( opposite_key )
  // console.log( opposite_owed )

  if (opposite_owed) {
    if (owed >= opposite_owed) {
      const new_owed = owed - opposite_owed;
      xacts[`${key}`] = new_owed;
      xacts[`${opposite_key}`] = 0;

      console.log(`${key} => ${new_owed}`);
      console.log(`${opposite_key} => 0`);
    } else {
      const new_owed = opposite_owed - owed;
      xacts[`${opposite_key}`] = new_owed;
      xacts[`${key}`] = 0;

      console.log(`${key} => 0`);
      console.log(`${opposite_key} => ${new_owed}`);
    }
  }
}

console.log(xacts);

//
//    Now remove the ones that are 0
//
//    Generate a new transaction list.
//
console.log(`Remove entries where 0 is owed.`);
transactions = [];

for (i = 0; i < keys.length; i++) {
  [p1, p2] = keys[i].split("_");
  const key = `${keys[i]}`;
  const owed = xacts[`${key}`];

  console.log(`CHECK-0 ${i}`, p1, p2, owed);

  if (owed != 0) {
    transactions = transactions.concat({
      parasite: parseInt(p1, 10),
      benefactor: parseInt(p2, 10),
      owed
    });
  }
}

console.log(transactions);

console.log(`Sort by parasite number`);
const sortedByParasiteNumber = transactions.sort((a, b) => {
  return a.parasite < b.parasite ? -1 : 1;
});

console.log(sortedByParasiteNumber);

console.log(`Sort by benefactor number`);
const sortedByBenefactorNumber = transactions.sort((a, b) => {
  return a.benefactor < b.benefactor ? -1 : 1;
});

console.log(sortedByBenefactorNumber);

//
//    Who has the most transactions?
//
//    Parasite..
//
console.log(`Who is the biggest parasite by number of transactions?`);
const parasiteCounts = transactions.reduce(function(obj, item) {
  // console.log(obj);
  // console.log(item);
  const parasite = item.parasite;

  if (!obj[parasite]) {
    obj[parasite] = 0;
  }
  obj[parasite]++;
  return obj;
}, {});

console.log(JSON.stringify(parasiteCounts, null, 4));

//
//    Benefactor..
//
console.log(`Who is the biggest benefactor by number of transactions?`);
const benefactorCounts = transactions.reduce(function(obj, item) {
  // console.log(obj);
  // console.log(item);
  const benefactor = item.benefactor;

  if (!obj[benefactor]) {
    obj[benefactor] = 0;
  }
  obj[benefactor]++;
  return obj;
}, {});

console.log(JSON.stringify(benefactorCounts, null, 4));

//
//    Amount owing...
//
console.log(`Who owes the most?[parasite]`);
const parasiteAmountsByValue = transactions.reduce(function(obj, item) {
  const parasite = item.parasite;
  const owed = item.owed;

  if (!obj[parasite]) {
    obj[parasite] = 0;
  }
  obj[parasite] += owed;
  return obj;
}, {});

console.log(JSON.stringify(parasiteAmountsByValue, null, 4));

console.log(`Who owes the most?[benefactor]`);
const benefactorAmountsByValue = transactions.reduce(function(obj, item) {
  const benefactor = item.benefactor;
  const owed = item.owed;

  if (!obj[benefactor]) {
    obj[benefactor] = 0;
  }
  obj[benefactor] += owed;
  return obj;
}, {});

console.log(JSON.stringify(benefactorAmountsByValue, null, 4));

console.log(`Get all parasite keys used`);
let parasiteKeys;
/*
parasiteKeys = transactions.map(transaction => {
  return transaction.parasite;
});

console.log(parasiteKeys);
*/

parasiteKeys = transactions.reduce(function(obj, item) {
  const parasite = item.parasite;

  if (!obj[parasite]) {
    obj[parasite] = 0;
  }
  obj[parasite]++;
  return obj;
}, {});

console.log(parasiteKeys);

const uniqueParasiteKeys = Object.entries(parasiteKeys).map(([key, val]) =>
  parseInt(key, 10)
);

console.log(uniqueParasiteKeys);

console.log(`Get all benefactor keys used`);
let benefactorKeys;
/*
benefactorKeys = transactions.map(transaction => {
  return transaction.benefactor;
});

console.log(benefactorKeys);
*/

benefactorKeys = transactions.reduce(function(obj, item) {
  const benefactor = item.benefactor;

  if (!obj[benefactor]) {
    obj[benefactor] = 0;
  }
  obj[benefactor]++;
  return obj;
}, {});

console.log(benefactorKeys);

const uniqueBenefactorKeys = Object.entries(benefactorKeys).map(([key, val]) =>
  parseInt(key, 10)
);

console.log(uniqueBenefactorKeys);

console.log(`Get all options`);
console.log(`---------------`);

uniqueParasiteKeys.forEach(pKey => {
  uniqueBenefactorKeys.forEach(bKey => {
    const p = transactions.find(transaction => {
      const p = transaction.parasite;
      const b = transaction.benefactor;

      return p === pKey && b === bKey;
    });

    if (p) {
      // found a parasite record - to be fair, this is every transaction.
      console.log(`Found a parasite... bKey=${bKey}`);
      console.log(p);

      // is the benefactor B also a parasite
      const b = transactions.filter(transaction => {
        const p = transaction.parasite;

        return p === bKey;
      });

      if (b) {
        console.log("Benefactors of p that are parasites too");
        console.log(b);
        console.log(b.length);
        // does one of these parasite records have a benefactor
        // that is ALSO a parasite that has a BENEFACTOR that is the original pKey?
        // Phew!
        b.forEach(benefactorRecordThatIsAParasite => {
          console.log(
            "... look for a benefactor entry that also is a parasite"
          );
        });
      } else {
        console.log(`-- no parasite for Benefactor bKey=${bKey}`);
      }
      console.log(`===`);
    }
  });
});

process.exit(0);

/*
c)

  { parasite: '2', benefactor: '0', owed: 3907 },
  { parasite: '0', benefactor: '3', owed: 187 },
  { parasite: '3', benefactor: '2', owed: 1240 },

for each parasite P
   for all benefactor B (!=P)
      is the benefactor B also a parasite
         that has a benefactor P

	     store all 3 xacts:
	        P -> B
		B -> X
		X -> P

	     check if E2 < E1 && E2 < E3

	     if all true, then

	        P -> B (A -= E2)
		delete B -> X
	        X -> P (A -= E2)


d)

  { parasite: '2', benefactor: '0', owed: 3720 },
  { parasite: '3', benefactor: '2', owed: 1053 },

for each parasite P
    for each benefactor B1
       is there a B2 -> P where B1 != B2 (probably impossible  for B1 == B2 at this point)

       Note sure the use of this, but...


  { parasite: '2', benefactor: '0', owed: 3720 },
  { parasite: '3', benefactor: '2', owed: 1053 },

  =>

  { parasite: '2', benefactor: '0', owed: 3720 - 1053 },
  { parasite: '3', benefactor: '0', owed: 1053 },

  =>

  { parasite: '2', benefactor: '0', owed: 2667 },
  { parasite: '3', benefactor: '0', owed: 1053 },
*/

process.exit(0);

const hash = {};
console.log(hash);
console.log(typeof hash);

const key = "1_2";
hash[`${key}`] = 5.6;
console.log(hash);
