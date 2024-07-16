/*
1. Explain what is prototype and what is prototype chain in your own words
  A prototype is an object that is inheritted by all objects in JS and it is accessible 
  via the .__proto__ property. It enables inheritance of functions or properties on objects
  of specific types like Arrays or numbers, where all instantiations of those types will 
  inherit those functions/properties. 

  The prototype chain is a chain of prototypes that an object has that will eventually
  terminate when one of those prototypes points to null. The chain can be thought of like
  an inheritance chain of methods and properties that an object has -- that is, if a method
  is called on an object and it doesn't have it directly in its fields, JS will look into the
  prototype chain starting with the object's prototype's fields, then the object's prototype's prototype
  fields, and so on until it reaches the end. If a method/property is accessed and it can't find it
  in the object or in any of the objects in the prototype chain, then it will fail.

2. Implement your versions of the following Array methods (choose 6).
map, filter, reduce, every, find, includes, join, pop, push, reverse, slice, sort
*/

// 1. map
Array.prototype.myMap = function (cb, thisArg) {
  if (typeof cb !== "function") {
    throw new TypeError(`${typeof cb} ${JSON.stringify(cb)} is not a function`);
  }

  let ptr = this;
  if (thisArg !== undefined) {
    ptr = thisArg;
  }

  let newArr = [];
  for (let i = 0; i < ptr.length; i++) {
    newArr.push(cb(ptr[i], i, ptr));
  }
  return newArr;
};
testMyMap();

// 2. filter - returns shallow copy
Array.prototype.myFilter = function (cb, thisArg) {
  if (typeof cb !== "function") {
    throw new TypeError(`${typeof cb} ${JSON.stringify(cb)} is not a function`);
  }

  let ptr = this;
  if (thisArg !== undefined) {
    ptr = thisArg;
  }

  let arr = Array.from(ptr);
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (cb(arr[i], i, arr)) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};
testMyFilter();

// 3. reduce
Array.prototype.myReduce = function (cb, initialValue) {
  if (typeof cb !== "function") {
    throw new TypeError(`${typeof cb} ${JSON.stringify(cb)} is not a function`);
  }

  // precheck: consider list empty if all undefined values.
  let arrLen = 0;
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== undefined) {
      arrLen = this.length;
      break;
    }
  }

  // error if empty array and init val is not given
  if (arrLen === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let init = initialValue;
  let startIdx = 0;
  if (initialValue === undefined) {
    init = this[0];
    startIdx = 1;
  }
  let acum = init;

  for (let i = startIdx; i < arrLen; i++) {
    // prevent empty values from destroying result
    if (this[i] !== undefined) acum = cb(acum, this[i], i, this);
  }
  return acum;
};
testMyReduce();

// 4. every
Array.prototype.myEvery = function (cb, thisArg) {
  if (typeof cb !== "function") {
    throw new TypeError(`${typeof cb} ${JSON.stringify(cb)} is not a function`);
  }

  let ptr = this;
  if (thisArg !== undefined) {
    ptr = thisArg;
  }

  for (let i = 0; i < ptr.length; i++) {
    if (ptr[i] === undefined) continue; // skip undefined / empty values.
    if (!cb(ptr[i], i, ptr)) {
      return false;
    }
  }

  return true;
};
testMyEvery();

// 5. find
Array.prototype.myFind = function (cb, thisArg) {
  if (typeof cb !== "function") {
    throw new TypeError(`${typeof cb} ${JSON.stringify(cb)} is not a function`);
  }

  let ptr = this;
  if (thisArg !== undefined) {
    ptr = thisArg;
  }

  for (let i = 0; i < ptr.length; i++) {
    if (cb(ptr[i], i, ptr)) {
      return ptr[i];
    }
  }

  return undefined;
};
testMyFind();

// 6. join
Array.prototype.myJoin = function (separator) {
  let sep = ",";
  if (separator !== undefined) {
    sep = `${separator}`; // in case separator is not a string (e.g. number)
  }

  let res = "";
  let val;
  for (let i = 0; i < this.length; i++) {
    val = this[i] !== undefined ? this[i] : ""; // empty str if undefined/empty

    if (i === 0) {
      res = val;
      continue;
    }

    res += sep;

    if (val !== undefined && val !== null) {
      res += val;
    }
  }

  return res;
};
testMyJoin();

// ------------------------ TESTS ------------------------
// tests taken from the mdn docs examples

function testMyMap() {
  const numbers = [1, 4, 9];
  const roots = numbers.myMap((num) => Math.sqrt(num));
  console.log(JSON.stringify([1, 2, 3]) === JSON.stringify(roots));
  console.log(JSON.stringify([1, 4, 9]) === JSON.stringify(numbers));

  const kvArray = [
    { key: 1, value: 10 },
    { key: 2, value: 20 },
    { key: 3, value: 30 },
  ];
  const reformattedArray = kvArray.myMap(({ key, value }) => ({
    [key]: value,
  }));
  console.log(
    JSON.stringify(reformattedArray) ===
      JSON.stringify([{ 1: 10 }, { 2: 20 }, { 3: 30 }])
  );
  console.log(
    JSON.stringify([
      { key: 1, value: 10 },
      { key: 2, value: 20 },
      { key: 3, value: 30 },
    ]) === JSON.stringify(kvArray)
  );

  const numbers1 = ["1", "2", "3"];
  const parsedNumbers1 = numbers1.myMap((str) => parseInt(str, 10));
  console.log(JSON.stringify(parsedNumbers1) === JSON.stringify([1, 2, 3]));
  console.log(JSON.stringify(numbers1) === JSON.stringify(["1", "2", "3"]));

  const empty = [];
  console.log(
    JSON.stringify([]) === JSON.stringify(empty.myMap((value) => value + 1))
  );

  // empty callback function
  try {
    empty.myMap();
    console.log(false); // should not reach this point.
  } catch (err) {
    if (err instanceof TypeError) {
      console.log(true);
    } else {
      console.log(false);
    }
  }

  // non function callback function
  try {
    const x = [1, 2, 3, 4];
    x.myMap(12); // not a function input
    console.log(false); // should not reach this point.
  } catch (err) {
    if (err instanceof TypeError) {
      console.log(true);
    } else {
      console.log(false);
    }
  }

  // with empty values
  const x = [1, 2, , 3, 5];
  console.log(
    JSON.stringify(x.map((value) => value + 1)) ===
      JSON.stringify(x.myMap((value) => value + 1))
  );

  const y = [, , , ,];
  console.log(
    JSON.stringify(y.map((value) => value + 1)) ===
      JSON.stringify(y.myMap((value) => value + 1))
  );
}

function testMyFilter() {
  const words = ["spray", "elite", "exuberant", "destruction", "present"];
  const result = words.myFilter((word) => word.length > 6);
  console.log(
    JSON.stringify(words) ===
      JSON.stringify(["spray", "elite", "exuberant", "destruction", "present"])
  );
  console.log(
    JSON.stringify(result) ===
      JSON.stringify(["exuberant", "destruction", "present"])
  );

  function isBigEnough(value) {
    return value >= 10;
  }
  const beforeFilter = [12, 5, 8, 130, 44];
  const filtered = beforeFilter.myFilter(isBigEnough);
  console.log(
    JSON.stringify(beforeFilter) === JSON.stringify([12, 5, 8, 130, 44])
  );
  console.log(JSON.stringify(filtered) === JSON.stringify([12, 130, 44]));

  // empty
  try {
    [].myFilter();
    console.log(false); // shouldn't reach this
  } catch (err) {
    if (err instanceof TypeError) {
      console.log(true);
    } else {
      console.log(false);
    }
  }

  // empty values
  const x = [1, 2, , 3, 5];
  console.log(
    JSON.stringify(x.filter((value) => value > 2)) ===
      JSON.stringify(x.myFilter((value) => value > 2))
  );
  const y = [, , , ,];
  console.log(
    JSON.stringify(y.filter((value) => value > 2)) ===
      JSON.stringify(y.myFilter((value) => value > 2))
  );
}

function testMyReduce() {
  // with initial value
  const array1 = [15, 16, 17, 18, 19];
  const initialValue = 10;
  const sumWithInitial = array1.myReduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  console.log(sumWithInitial === 95);

  // without initial value
  const array = [15, 16, 17, 18, 19];
  const arrSum = array.myReduce((accum, curr) => accum + curr);
  console.log(arrSum === 85);

  const getMax = (a, b) => Math.max(a, b);
  // callback is invoked for each element in the array starting at index 0
  console.log([1, 100].myReduce(getMax, 50) === 100); // 100
  console.log([50].myReduce(getMax, 10) === 50); // 50

  // callback is invoked once for element at index 1
  console.log([1, 100].myReduce(getMax) === 100); // 100

  // callback is not invoked
  console.log([50].myReduce(getMax) === 50); // 50
  console.log([].myReduce(getMax, 1) === 1); // 1

  // empty
  try {
    [].reduce();
    console.log(false);
  } catch (err) {
    if (err instanceof TypeError) {
      console.log(true);
    } else {
      console.log(false);
    }
  }

  // empty values
  const x = [1, 2, , 3, 5];
  console.log(
    x.reduce((accum, value) => accum + value, 0) ===
      x.myReduce((accum, value) => accum + value, 0)
  );

  const y = [, , , ,];
  console.log(
    y.reduce((accum, value) => accum + value, 0) ===
      y.myReduce((accum, value) => accum + value, 0)
  );

  try {
    y.reduce((accum, value) => accum + value);
    console.log(false);
  } catch (err) {
    if (err instanceof TypeError) {
      console.log(true);
    } else {
      console.log(false);
    }
  }

  try {
    y.myReduce((accum, value) => accum + value);
    console.log(false);
  } catch (err) {
    if (err instanceof TypeError) {
      console.log(true);
    } else {
      console.log(false);
    }
  }
}

function testMyEvery() {
  function isBigEnough(element, index, array) {
    return element >= 10;
  }
  console.log([12, 5, 8, 130, 44].myEvery(isBigEnough) === false); // false
  console.log([12, 54, 18, 130, 44].myEvery(isBigEnough) === true); // true

  const isSubset = (array1, array2) =>
    array2.myEvery((element) => array1.includes(element));

  console.log(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 7, 6]) === true); // true
  console.log(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 8, 7]) === false); // false

  const numbers = [-2, 4, -8, 16, -32];
  const isIncreasing = numbers
    .filter((num) => num > 0)
    .myEvery((num, idx, arr) => {
      // Without the arr argument, there's no way to easily access the
      // intermediate array without saving it to a variable.
      if (idx === 0) return true;
      return num > arr[idx - 1];
    });
  console.log(isIncreasing === true);

  // empty
  try {
    [].myEvery();
    console.log(false);
  } catch (err) {
    if (err instanceof TypeError) {
      console.log(true);
    } else {
      console.log(false);
    }
  }

  // empty values
  const x = [1, 2, , 3, 5];
  console.log(
    x.every((value) => value > 0) === x.myEvery((value) => value > 0)
  );

  const y = [, , , ,];
  console.log(
    y.every((value) => value > 0) === y.myEvery((value) => value > 0)
  );
}

function testMyFind() {
  const inventory = [
    { name: "apples", quantity: 2 },
    { name: "bananas", quantity: 0 },
    { name: "cherries", quantity: 5 },
  ];
  function isCherries(fruit) {
    return fruit.name === "cherries";
  }
  console.log(
    JSON.stringify(inventory.myFind(isCherries)) ===
      JSON.stringify({ name: "cherries", quantity: 5 })
  );

  const numbers = [3, -1, 1, 4, 1, 5, 9, 2, 6];
  const firstTrough = numbers
    .filter((num) => num > 0)
    .myFind((num, idx, arr) => {
      // Without the arr argument, there's no way to easily access the
      // intermediate array without saving it to a variable.
      if (idx > 0 && num >= arr[idx - 1]) return false;
      if (idx < arr.length - 1 && num >= arr[idx + 1]) return false;
      return true;
    });
  console.log(firstTrough === 1);

  // empty
  try {
    [].myFind();
    console.log(false);
  } catch (err) {
    if (err instanceof TypeError) {
      console.log(true);
    } else {
      console.log(false);
    }
  }

  // empty values
  const x = [1, 2, , 3, 5];
  console.log(
    x.find((value) => value === 3) === x.myFind((value) => value === 3)
  );

  const y = [, , , ,];
  console.log(
    y.find((value) => value === 3) === y.myFind((value) => value === 3)
  );
  console.log(
    y.find((value) => value === undefined) ===
      y.myFind((value) => value === undefined)
  );
}

function testMyJoin() {
  const elements = ["Fire", "Air", "Water"];
  console.log(elements.myJoin() === "Fire,Air,Water");
  console.log(elements.myJoin("") === "FireAirWater");
  console.log(elements.myJoin("-") === "Fire-Air-Water");

  const a = ["Wind", "Water", "Fire"];
  console.log(a.myJoin(", ") === "Wind, Water, Fire");
  console.log(a.myJoin(" + ") === "Wind + Water + Fire");
  console.log(a.myJoin("") === "WindWaterFire");

  console.log([1, , 3].myJoin() === "1,,3");
  console.log([, , , ,].myJoin() === [, , , ,].join());
  console.log([1, undefined, 3].myJoin() === "1,,3");
  console.log([].myJoin() === "");
}
