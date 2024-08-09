## Redux 2 HW

Research how to use thunk with RTK. https://redux-toolkit.js.org/api/createAsyncThunk

Answer the following questions:

1. What is FLUX?
   > Flux is a unidirectional data flow design/architecture pattern for creating web apps where you need to manage and use some states in many different components. Following flux, you organize your code into views, stores, and dispatchers. The view can subscribe to the store to get state data that changes what is rendered. The view can update states through the stores' dispatcher functions. Unlike the Redux library, flux allows for multiple stores.
2. What is Redux? How do you use it with React components?
   > Redux is a nodejs library used to manage global state for an application. The core library can be used in multiple different kinds of frontend libraries/frameworks like React or Svelte. In order to use Redux with React components, you will also need to add and install the `react-redux` library to your node dependencies. Then you will need to configure the store, define the initial state and reducer function(s), and create the provider that wraps your entire application to provide the store to all your React components.
3. What is a reducer?
   > A reducer is a pure function that updates an immutable state by returning a new object that represents the new state it is updating. To use reducers in Redux, you provide them when creating/configuring the store and use dispatches to call your reducers.
4. How do you choose between ContextAPI and Redux for global state management?
   > If your application will be on a relatively small scale and you don't have that many states that you need to pass around to components throughout the app and you don't update them that often, just use the ContextAPI. If you know you will have lots of state and complicated logic to update them, and you will update them frequently, use Redux.
5. What is redux thunk and why do you want to use it?
   > Redux thunk are middleware functions that you define to want to use whenever a dispatch is run and you want to run some code inbetween when the initial dispatch is called and when the state inside the store actually gets updated. The thunk middleware functions do not need to be pure, so they can have side effects like fetching data over the network. You would want to use it if you need to fetch some data to update a state in the store for a dispatch action, but you didn't want to write that logic inside the reducer function, since that would make the reducer impure, and maybe you don't want to make your component messy by manually making that call before the dispatch and passing the data into the action object as a payload. It may just make sense to abstract that detail away into a middleware function.
