import { createStore } from "redux";

const initialState = {
  todos: [
    {
      id: 1,
      content: "water the plants",
    },
    {
      id: 2,
      content: "do laundry",
    },
    {
      id: 3,
      content: "wash the dishes",
    },
  ],
  cars: [
    {
      id: 1,
      name: "toyota",
      quantity: 10,
    },
    {
      id: 2,
      name: "nissan",
      quantity: 10,
    },
    {
      id: 3,
      name: "ford",
      quantity: 10,
    },
  ],
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "TODOS_DELETE": {
      // payload is just id
      return {
        ...state,
        todos: state.todos.filter((val) => val.id !== payload),
      };
    }
    case "TODOS_ADD": {
      // payload is a todo obj
      return {
        ...state,
        todos: [...state.todos, payload],
      };
    }
    case "CARS_DECREMENT": {
      // payload is the id of the car object to decrement count of
      const newCars = state.cars.map((car) => {
        if (car.id === payload) {
          return {
            ...car,
            quantity: car.quantity - 1,
          };
        } else {
          return car;
        }
      });
      return { ...state, cars: newCars };
    }
    case "CARS_INCREMENT": {
      // payload is the id of the car object to increment count of
      const newCars = state.cars.map((car) => {
        if (car.id === payload) {
          return {
            ...car,
            quantity: car.quantity + 1,
          };
        } else {
          return car;
        }
      });
      return { ...state, cars: newCars };
    }
    default:
      return state;
  }
};

const store = createStore(reducer, initialState);
export default store;
