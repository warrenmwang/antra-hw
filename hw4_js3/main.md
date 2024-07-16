1. What is the difference between instance methods and static methods?
   > Instance methods are functions that you can only call on
   > an object that is an instantiation of a class. Static methods are functions
   > that you can call on the class prototype directly without needing to create an
   > object.
2. How does Javascript handle concurrency?
   > Javascript's runtime is single-threaded and has a single call stack to
   > keep track of the currently running code, so in order to run asynchronous and
   > synchronous code concurrently, it uses the event loop model.
   > The event loop model can be thought of in three parts:
   > call stack, Web API (for browsers, or Node API for server), and the callback queue.
   >
   > All synchronous code is executed in order via the call stack.
   > When we want to run asynchronous code, it first gets thrown
   > onto the call stack, then the JS runtime recognizes the async function method
   > and calls the Web API and it runs it there. Web APIs run in the browser separately
   > from the JS runtime, thus achieving concurrency and not blocking the JS call stack.
   > While the async operation is running, the JS runtime can continue to run synchronous
   > code by pushing them to the call stack.
   > Once an asynchronous operation has finished and its resulting value
   > is ready to be consumed (like a promise that has been fulfilled and ready to run a
   > callback function), the code that was prepared to use that result will be added to the
   > callback queue. The event loop has to wait until the call stack is empty (no
   > synchronous code is running right now) until it can dequeue from the callback queue
   > onto the call stack.
   >
   > This let's JS be able to handle user event actions and enable a smooth UI experience
   > while making network requests at the same time.
3. What is async/await? How does it differ from using the promise instance methods?
   > The usage of async/await keywords are syntax sugar that allows you to do the same
   > thing if we were consuming promises with the instance methods .then(), .catch(), and .finally().
   > The await keyword is used to block the current thread on the line in which
   > the await keyword is used on an asynchronous function call such that one can
   > directly get the value from the returned promise without using the promise instance
   > methods. This way of programming may be more intuitive for some people, as it
   > bypasses having to directly consume the promise yourself by providing a callback
   > function for when the promise is fulfilled.
4. Can you use await outside of an async function?
   > You cannot use await outside of an async function. If you try, you will receive
   > an error.
5. What is callback hell and why is it considered a problem?

   > Callback hell is when you need to make multiple asynchronous function calls where
   > some calls depend on others, like a direct chain of
   > `foo1 -> foo2 -> foo3`
   > where foo1 needs to call foo2 and foo2 needs to call foo3.
   > Without using promise instance method .then(), you would need to write
   > a callback pyramid structure that is not maintainable and is hard to read and
   > and understand.
   > Here's an example of 3 async calls that you could run in a chain with the
   > callback hell structure:

   ```js
   let id = 0;

   function someTransform(data) {
     return data + 1;
   }

   function foo1(input, cb) {
     console.log("foo1");
     setTimeout(() => {
       cb(input);
     }, 1000);
   }

   function foo2(input, cb) {
     console.log("foo2");
     setTimeout(() => {
       cb(input);
     }, 1000);
   }

   function foo3(input, cb) {
     console.log("foo3");
     setTimeout(() => {
       cb(input);
     }, 1000);
   }

   // growing pyramid structure
   foo1(id, (data) => {
     let input = someTransform(data);
     foo2(input, (data) => {
       let input = someTransform(data);
       foo3(input, (data) => {
         let result = someTransform(data);
         console.log(result);
       });
     });
   });
   ```

   > It would be cleaner and more maintainable if we wrote this using the
   > promise-based instance method .then():

   ```js
   let id = 0;

   function someTransform(data) {
     return data + 1;
   }

   const bar1 = async (input) => {
     console.log("bar 1");
     return new Promise((resolve, reject) => {
       setTimeout(() => {
         resolve(input);
       }, 1000);
     });
   };

   const bar2 = async (input) => {
     console.log("bar 2");
     return new Promise((resolve, reject) => {
       setTimeout(() => {
         resolve(input);
       }, 1000);
     });
   };

   const bar3 = async (input) => {
     console.log("bar 3");
     return new Promise((resolve, reject) => {
       setTimeout(() => {
         resolve(input);
       }, 1000);
     });
   };

   bar1(id)
     .then((data) => bar2(someTransform(data)))
     .then((data) => bar3(someTransform(data)))
     .then((data) => console.log(someTransform(data)));
   ```
