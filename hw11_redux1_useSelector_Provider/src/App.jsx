import "./App.css";
import CarApp from "./components/CarApp";
import MyContexProvider from "./components/MyContexProvider";
import TodoApp from "./components/TodoApp";
import store from "./redux";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="horizontal">
      {/* <Provider store={store}> */}
      <MyContexProvider>
        <TodoApp />
        <CarApp />
      </MyContexProvider>
      {/* </Provider> */}
    </div>
  );
}

export default App;
