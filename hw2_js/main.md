## JS 

1. Why are closures useful in JavaScript? Give an example use case. 
> Closures are useful in Javascript because they allow you to abstract / hide
> variables that you want to use to fulfill some kind of functionality without 
> polluting the outer scope with these variable declarations where the function is defined.
> This encapsulates properties or methods and makes them private. 
> 
> As someone who hasn't touched closures before, I think of these as private 
> fields in comparison to creating classes in JS. I guess the difference is we use
> closures to not define objects, but rather functions instead. Seems like preferring
> functional programming vs OOP.
> 
> An example use case could be a counter, as seen in lecture, or a primitive
> implementation of a stack object:
> ```js
> function stack() {
>   let arr = [];
>   return {
>     push(val){
>       arr.push(val);
>     },
>     pop(){
>       return arr.pop();
>     },
>     top(){
>       return arr[arr.length-1];
>     }
>   };
> }
> ```


2. When should you choose to use “let” or “const”
> I would use the let keyword if I want to declare a variable that I might want to reassign 
> a new value to it later, preferably of the same type as before. For const, I would use 
> that when I want to make sure that I am not able to re-assign a new value to that variable.
> 
> Since let and const both use block scope and don't hoist, it makes it easier for me to
> understand where I can access their values and that they aren't magically declared at the
> top of the current scope before I explicitly declare them. I would prefer no hoisting.
 

3. Give an example of a common mistake related to hoisting and explain how to fix it.
> I think one common mistake related to hoisting is declaring a function using the new
> arrow function syntax and expecting the function to be hoisted (i.e. accessible before its
> actual declaration). To fix this, you could either just declare the function using the 
> traditional `function` keyword or move your arrow function declaration before you want to
> use the function.


4. What will the outcome of each console.log() be after the function calls? Why?
```js
const arr = [1, 2];
function foo1(arg) {
  arg.push(3);
}
foo1(arr);
console.log(arr);

function foo2(arg) {
  arg = [1, 2, 3, 4];
}
foo2(arr);
console.log(arr);

function foo3(arg) {
  let b = arg;
  b.push(3);
}
foo3(arr);
console.log(arr);

function foo4(arg) {
  let b = arg;
  b = [1, 2, 3, 4];
}
foo4(arr);
console.log(arr);
```
> The console log outputs will be, in the order they are written:
> 1. `[1,2,3]` because foo1's argument `arg` gets assigned the reference to the outer scope's `arr` and using the method `.push()` on that accesses the array directly, pushing the new value 3 to the array.
> 2. `[1,2,3]` because although we initially get the reference to the outer scope's `arr` in the variable `arg` in foo2, `arg` is a local variable to the function. Setting something to `arg` just overrites the content of `arg` and not to the outside `arr`. We have effectively lost that reference by doing this.
> 3. `[1,2,3,3]` because in foo3 we are just using a new variable `b` to point to the same location that `arr` is pointing to, successfully modifying the array with another push of 3
> 4. `[1,2,3,3]` because in foo4 we see a similar thing to foo2, where we are not actually using the reference to `arr` that we initially get in the variable `arg`. We just assign a new array to the local variable `b` in foo4, which has nothing to do with the outer scope's `arr`.