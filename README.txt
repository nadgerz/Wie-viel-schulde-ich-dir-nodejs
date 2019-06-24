
Splittr(lite)
=============

TODO:

o	save to local storage
o	name of splittr session
o	enter number of people - P
	    or a pulldown one can add to?

	    add names to people -> array (option element)
o	add groups
	    name
	    pick from list P
		can add more, but adds as a Set

o	Add an IOU
	    pick who owes - could be a group
				in which case it will add an array of names
	    pick who is owed
	    pick an ammount - X

	    this will then generate individual IOU's

AIM (all to PDFs)
===

o	lowest number of transactions
o	detailed report on who owed who what - actual
o	filter by parasite/benefactor

HOW to reduce transactions

A	->	B	=	5
B	->	D	=	3
D	->	A	=	7
C	->	A	=	2
C	->	A	=	1
A	->	C	=	4

Get list of unique combinations


A	->	B	=	5
B	->	D	=	3
D	->	A	=	7
C	->	A	=	3
A	->	C	=	4

Then cancel 'opposites', so for each pair...


A	->	B	=	5
B	->	D	=	3
D	->	A	=	7
C	->	A	=	3 - (A -> C)


=> C	->	A	=	3 - 4
=> C	->	A	=	-1
=> A	->	C	=	1

=> Who owes the most different, starting with the lowest?

=> means that although A -> c = 1, it may turn out that A does not pay C, but say, in this case, D does.


The main AIM is to reduce/cancel transactions OR can we remove someone from owing anything?


A	->	B	=	5
B	->	D	=	3
D	->	A	=	7
A	->	C	=	1

=>


A	->	B	=	5
B	->	D	=	3  <-- B is owed and owes, so we can eliminate
D	->	A	=	7
A	->	C	=	1

=> 

A	->	B	=	5 - 3
D	->	A	=	7 - 3
A	->	C	=	1

=> 

A	->	B	=	2
D	->	A	=	4
A	->	C	=	1

Now reduce the number of people paying

A	->	B	=	2
D	->	A	=	4
A	->	C	=	1

=>


D	->	B	=	2
D	->	A	=	2
A	->	C	=	1

=>

D	->	B	=	2
D	->	A	=	1
D	->	C	=	1




