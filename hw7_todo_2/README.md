## Todo List

Todo list with add, delete, and edit features that sync to a `json-server`.
Dev with `npm run dev`.

## Questions

1. What is useEffect? What are the different behaviors of useEffect? What is a dependency array?
   > `useEffect` is a hook that lets you run a callback function commonly used to handle side effects in your components at specific times in your component's lifecycle. The `useEffect` function takes one mandatory argument, the callback function, and an optional argument, the dependency array. The dependency array is used to tell `useEffect` when to run the callback function. When passed no dependency array, the callback function will be run during mounting and whenever the component updates/re-renders. When passed an empty dependency array, the callback function will be run only at mounting. When passed one or more variables in the dependency array, `useEffect` will run the callback function whenever any of the variables changes. If you use objects in the dependency array, React will compare by reference. If you need to watch for changes to an object, it would be better to store that object in a state managed by the `useState` hook.
2. What is useRef and when do you want to use it?
   > `useRef` is a hook that lets you manage a mutable state object that has a single property called `current`. The function takes a single argument that is the initial value of the reference and returns a single value that is the reference. You would use `useRef` when you need to keep track of some kind of data that persists across re-renders that is not needed for rendering UI. An example is using a `useRef` to store a `setInterval` id that you would want to access later to cancel it for instance.
3. How to reuse hook logic in React?
   > To reuse hook logic, you want to wrap up the code that uses one or more hooks that you want to reuse into its own function whose name is prefixed with `use` to denote to React that you are creating a custom hook. Your function can take arguments and return whatever you want it to return, since they are just functions. You can run any number of different hooks in custom hook functions (e.g. `useState`, `useEffect`, `useRef`, etc.).
