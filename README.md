# ArrayPro

## Useful utility functions for more extensive use of arrays

Table of contents: <br />

[Evaluations](#evaluation)<br />
[Insertions](#insertions)<br />
[Modification](#modifications)<br />
[The handy failsafe switch](#the-handy-failsafe-switch)<br />
[More to come...](#more-to-come)<br />
#### Evaluations

Conducts simple evaluations of arrays, like sum of all elements in a provided array.

Note: equality checking does not yet support objects fully. This means that the `isEqual` function evaluating this two arrays:
`[{"one":1, "two":2}]` and `[{"two":2, "one":1}]`
would return false.

#### Insertions

You can fill arrays with random numbers and strings. Useful for testing purposes.
Eg: 

`let test = fillRandomNumber(7, 10, 40)`

would return an array with 7 random numbers in it, values ranging from 10 to 40.

#### Modifications

Currently, deleting from arrays would return a new array, instead of modifying the originally provided array.<br />
Conversion however affects the provided array.

#### The `failsafe` switch

Any array passed to these functions should have cleaned values inside. But if in your case, it is not possible to provide a type-safe array
you can ask ArrayPro functions to do their best and try to handle likely-to-be-inproper values without returning an error.
Of course, you can leave failsafe turned off so functions return `null` to indicate that some value was not compatible.

#### More to come...

I've got plans to fine-tune the already existing functions (eg. add deep-checking for evaluation), as well as adding new functions (eg. sorting).<br />
Also, I will provide proper documentation along the already written JSDoc 3 style docs. 
