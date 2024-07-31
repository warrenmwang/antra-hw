## Todo List

Add and delete implemented.

## Questions

1. What is useState?

   > `useState` is a React hook that is a function provided by React to allow a functional component to create and set some data as state that persists across the component's re-renders as long as the component doesn't move away from or get removed from its current position in the UI tree. The function itself is used like this:

   ```js
   const [todo, setTodo] = useState({});
   ```

   where the function takes one argument, the default value of the state, and it returns two variables, the variable containing the state and a function that lets you update the state. If you want your view to be re-rendered to match your state changes correctly when using objects for your state, you need to use the setter function with a new shallow copy of the object. If you use the same reference to the object and you have just mutated the object directly, React will think that the object has not changed and it won't consider that a state change, so it won't re-render when you might have expected it to. Therefore, always use the setter function with a new shallow copy of the object if dealing with objects in state. You can do this with a quick combination of a callback function and the rest operator like:

   ```js
   setTodo((prev) => ({
     ...prev,
     newThing: newThing,
   }));
   ```

2. What is props drilling and state lifting?

   > Props drilling refers to the pattern of creating and managing a state variable in some parent component and then passing that state as props through multiple nested child components in order to get the data to flow from some ancestor to the lowest child where the data is needed. The pattern becomes hard to maintain very quickly and is not a good pattern to use to pass data from higher level components to far down child components if there are many multiple levels to go through in a non-trivial project. One alternative is to use the useContext hook to create a context that you can wrap around your components at a higher level and it will be able to provide states that you set in the context to any child component at any level without needing to do the prop drilling pattern.
   > State lifting is the pattern of finding out that you need to share state from one component to another one that is not a child of the current component where the state was declared in. We know in React that data can only from top to down, parent to child components. Therefore, we will need to move the state to be maintained at the two components' closest common ancestor if we want to share that state. This act of restructuring is called state lifting.

3. What is the ‘key’ attribute?

   > The key attribute is a unique attribute for elements in a list that helps React keep track of what elements have changed or not, thus knowing what elements need to be re-rendered in the list. This helps React be efficient with re-rendering and only updating the elements that have changed in the list instead of re-rendering the entire list and its elements. It is advised to NOT use the index of the element in the position of the list because if we just had all the same components but moved them around, the keys would change if you create the list with a map operation and then React would think that all the components themselves changed and would need to re-render them all, when instead React just needs to move them around in the list. Using unique keys would make that operation more efficient.

4. What is synthetic event?

   > A synthetic event is a React cross-browser wrapper object around the browser's native `Event` object that gets thrown when an event is triggered for some reason such as a button click. React does this in order to make the process of dealing with events independent of the actual browser type, because native browser events can differ depending on which browser and version you use.

5. What is virtual dom?

   > The virtual dom is an in-memory mirror of the actual DOM that React uses to keep track of what the UI should look like. React uses a process call reconciliation that uses a diffing algorithm to sync the virtual DOM to the DOM and update only the necessary parts of the DOM to get the most up to date UI. Technically it is the React DOM package that does the reconciliation process and updates the actual DOM. The first time reconciliation runs is after all the components are mounted into the Virtual DOM for the first time, which is done by the React package.
