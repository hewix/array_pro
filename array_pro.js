/**
ArrayPro v0.1

MIT License

Copyright (c) 2018 Osztein Tamás

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// HELPER CLASS FOR RANDOM NUMBER GENERATION

class MersenneTwister {
    constructor(seed) {
        if (seed == undefined) {
            seed = new Date().getTime();
        }
        this.N = 624;
        this.M = 397;
        this.MATRIX_A = 0x9908b0df;
        this.UPPER_MASK = 0x80000000;
        this.LOWER_MASK = 0x7fffffff;
        this.mt = new Array(this.N);
        this.mti = this.N + 1;
        this.init_genrand(seed);
    }
    init_genrand(s) {
        this.mt[0] = s >>> 0;
        for (this.mti = 1; this.mti < this.N; this.mti++) {
            let s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
            this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
                + this.mti;
            this.mt[this.mti] >>>= 0;
        }
    }
    genrand_int32() {
        let y;
        let mag01 = new Array(0x0, this.MATRIX_A);

        if (this.mti >= this.N) {
            let kk;

            if (this.mti == this.N + 1) {
                this.init_genrand(5489);
            }

            for (kk = 0; kk < this.N - this.M; kk++) {
                y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
                this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            for (; kk < this.N - 1; kk++) {
                y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
                this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
            this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

            this.mti = 0;
        }

        y = this.mt[this.mti++];

        y ^= (y >>> 11);
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= (y >>> 18);

        return y >>> 0;
    }
    real1() {
        return this.genrand_int32() * (1.0 / 4294967295.0);
    }
}

// EVALUATIONS 

/**
 * Evaluates whether two arrays are equal.
 * @param {Array} array1
 * @param {Array} array2
 * @return {boolean} Result of evaluation
 */

function isEqual(array1, array2) {
    if (array1 === undefined || array2 === undefined) { return false; }
    if (array1.length !== array2.length) {
        return false;
    } else {
        for (let item = 0; item < array1.length; item++) {
            if (typeof array1[item] === "object") {
                let obj1 = JSON.stringify(array1[item]);
                let obj2 = JSON.stringify(array2[item]);
                console.log(obj1, obj2);
                if (obj1 !== obj2) {
                    return false;
                }
            } else {
                if (array1[item] !== array2[item]) {
                    return false;
                }
            }
        }
        return true;
    }
}

/**
 * Calculates the sum of all elements in the array. If not every element is a number in the provided array, and failsafe is turned off, returns null
 * @param {Array} array
 * @param {boolean} failsafe - (Optional) If this is set to true, the function will try to sum all numeric elements and ignores faulty elements. Default is false
 * @return {number} - Sum of all numeric elements in the array
 */
function sumItems(array, failsafe) {
    let sum = null;
    for (item of array) {
        if (typeof item !== typeof 1 && !failsafe) {
            return null;
        } else {
            typeof item === 'number' ? sum += item : sum += 0;
        }
    }
    return sum;
}

/**
 * Deducts given value from all elements in the array. If not every element is a number in the provided array, and failsafe is turned off, returns null
 * @param {Array} array
 * @param {number} deduct - The value to be deducted from each item in the provided array
 * @param {boolean} failsafe - (Optional) If this is set to true, the function will try to sum all numeric elements and ignores faulty elements. Default is false
 * @return {Array}
 */
function deductFromItems(array, deduct, failsafe) {
    let arr = [];
    for (item of array) {
        if (typeof item !== typeof 1 && !failsafe) {
            return null;
        } else {
            typeof item === 'number' ? arr.push(item - deduct) : item += 0;
        }
    }
    return arr;
}

/**
 * Multiplies every item in given array by the given number. If not every element is a number in the provided array, or if the factor is not a number, returns null
 * @param {Array} array
 * @param {number} factor - Each item in the provided array will be multiplied by this factor
 * @param {boolean} failsafe - (Optional) If this is set to true, the function will try to multiply all numeric elements and ignores faulty elements. Default is false
 */
function multiplyItemsBy(array, factor, failsafe = false) {
    if (typeof factor !== typeof 1) {
        return null;
    }
    let arr = [];
    for (item of array) {
        if (typeof item !== typeof 1 && !failsafe) {
            return null;
        } else {
            typeof item === 'number' ? item *= factor : item = item;
            arr.push(item);
        }
    }
    return arr;
}

/**
 * Divides every item in given array by the given number. If not every element is a number in the provided array, or if the factor is not a number, returns null
 * @param {Array} array
 * @param {number} factor - The multiplication factor
 * @param {boolean} failsafe - (Optional) If this is set to true, the function will try to multiply all numeric elements and ignores faulty elements. Default is false
 */
function divideItemsBy(array, factor, failsafe) {
    if (factor === 0) {
        return 'Cannot divide by 0!';
    }
    if (typeof factor !== typeof 1) {
        return null;
    }
    let arr = [];
    for (item of array) {
        if (typeof item !== typeof 1 && !failsafe) {
            return null;
        } else {
            typeof item === 'number' ? item /= factor : item = item;
            arr.push(item);
        }
    }
    return arr;
}

// INSERTIONS

//HELPER FUNCTIONS FOR RANDOM GENERATORS
function getRandomInt(min, max) {
    let m = new MersenneTwister();
    let randomNum = m.real1();
    return randomNum;
}

function getRandomIntFloored(min, max) {
    let m = new MersenneTwister();
    let randomNum = m.real1();
    randomNum = Math.floor(randomNum * (max - min + 1)) + min;
    return randomNum;
}

/**
 * Fills up the array with random numbers 
 * @param {number} itemcount - The number of elements to be inserted. Default is between 1 and 10 
 * @param {number} rangeTop - Determines the lowest possible number to be inserted
 * @param {number} rangeBottom - Determines the highest possible number to be inserted
 * @return {Array}
 */
function fillRandomNumber(itemcount, rangeBottom, rangeTop) {
    if (itemcount === undefined) {
        itemcount = getRandomIntFloored(1, 10);
    }
    if (rangeTop === undefined) {
        rangeTop = 10;
    }
    if (rangeBottom === undefined) {
        rangeBottom = 0;
    }
    let array = [];
    for (let i = 0; i < itemcount; i++) {
        array.push(getRandomIntFloored(rangeTop, rangeBottom));
    }
    return array;
}

/**
 * Fills up an array with random string
 * @param {number} itemCount - The length of the returned array
 * @param {number} stringLength - The length of the random string to be inserted. Default is 5
 */
function fillRandomString(itemcount, stringLength) {
    let arr = [];
    for (let index = 0; index < itemcount; index++) {
        let el = getRandomInt(0, 1).toString(36).replace(/[^a-z]+/g, '').substr(0, stringLength);

        while (el.length < stringLength) {
            el += getRandomInt(0, 1).toString(36).replace(/[^a-z]+/g, '').substr(0, stringLength);
        }
        if (el.length % stringLength) {
            el = el.substring(0, stringLength)
        }
        arr.push(el);
    }
    return arr;
}

// MODIFICATIONS

/**
 * Converts all elements in array if possible, most likely used with strings and numbers. Functions will return as false
 * @param {Array} array
 * @param {string} convertTo - Elements of given array will be converted to this type: string, number
 * @return {Array}
 */
function convertElementsTo(array, convertTo) {
    try {
        for (let index = 0; index < array.length; index++) {
            if (convertTo === 'string') {
                if (typeof array[index] === "object") {
                    array[index] = JSON.stringify(array[index]);
                } else {
                    array[index] = array[index].toString();
                }
            }
            if (convertTo === 'number') {
                array[index] = parseInt(array[index]);
            }
        }
    } catch (error) {
        console.log('Conversion failed: ', error);
    }
    return array;
}

/**
 * Deletes an item in the array at given index. If the index is greater than the array's length, it will return null
 * @param {Array} array
 * @param {number} index - The element's index, which should be deleted. Returns the array when omitted
 * @return {Array}
 */
function deleteAt(array, index) {
    if (index > array.length) {
        return null;
    }
    let arr = [];
    array.splice(index, 1);
    arr = array;
    return arr;
}


/**
 * Deletes all items in an array between the provided indexes. If the startIndex is greater than the endIndex, it will be automatically swapped.
 * If the startIndex is greater than the array's length, it will set to 0. If the endIndex is greater than the array's length, the whole function will return null
 * @param {Array} array
 * @param {number} startIndex - The first element's index, which should be deleted.
 * @param {number} endIndex - The last element's index, which should be deleted.
 * @return {Array}
 */
function deleteFromTo(array, startIndex, endIndex) {
    if (endIndex > array.length) {
        return null;
    }
    if (startIndex > array.length) {
        startIndex = 0;
    }
    if (startIndex > endIndex) {
        let h = startIndex;
        startIndex = endIndex;
        endIndex = h;
    }
    if (startIndex === endIndex) {
        deleteAt(array, startIndex);
        return;
    }
    let arr = [];
    array.splice(startIndex, endIndex);
    arr = array;
    return arr;
}

let test = fillRandomNumber(7, 1, 30);
for (let index = 0; index < test.length; index++) {
    test[index] = test[index].toString();
}
