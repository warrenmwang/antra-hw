# Todo List In Class Components

## Questions

1. What are some differences between class and functional components?

   > Class components have access to the component lifecycle methods while functional components do not; hooks are used in functional components to do the same thing that lifecycle methods can do but in a more declarative and intuitive method. Hooks are not meant to be used in class components, so you have to use the lifecycle methods to do stuff with side effects like fetch data or update state dynamically. To create a class component, you need to create a class that extends a React component class like `Component` or `PureComponent`. In class components, to access props or state in rendering or when you want to use a lifecycle method because you can't use hooks, you will be using the `this` keyword a lot and accessing your state as a property through the `this.state` object. In my opinion, this is messy and I can see why functional components with React hooks since v16.8 is the modern way to write and use components now.

2. Explain what lifecycle is in a simple way. How do you manage it in class and functional components?

   > The lifecycle of a component is the way React manages your component in discrete steps, depending on what's happening in your application to affect the end UI. In the modern functional components method of creating UI, the developer interacts with what happens to your component throughout the lifecycle (e.g. mounting, updating, unmounting) via hooks like `useEffect`. In the legacy class components method, the developer will need to make use of the lifecycle methods that are inherited from React's `Component` or `PureComponent` classes when you define your own component. Some of those lifecycle methods are `componentDidMount` which triggers when the component first mounts, `componentDidUpdate` which triggers when a re-render of the component occurs, and `componentWillUnmount` which triggers right before the component unmounts from the VDOM.

3. Explain immutability in one sentence.
   > Immutability is the concept of a variable not being able to be changed after its declaration.
