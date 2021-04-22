import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore,applyMiddleware } from "./package/redux";
import { Provider } from "./package/react-redux";

function loggerOne({ getState }) {
  return (next) => {
    console.log(1)
    return (action) => {
      console.log("will dispatch loggerOne", action);
  
      // 调用 middleware 链中下一个 middleware 的 dispatch。
      const returnValue = next(action);
  
      console.log("state after dispatch loggerOne", getState());
  
      // 一般会是 action 本身，除非
      // 后面的 middleware 修改了它。
      return returnValue;
    };
  }
}

function loggerTwo({ getState }) {
  return (next) => {
    console.log(2)
    return (action) => {
      console.log("will dispatch loggerTwo", action);
  
      // 调用 middleware 链中下一个 middleware 的 dispatch。
      const returnValue = next(action);
  
      console.log("state after dispatch loggerTwo", getState());
  
      // 一般会是 action 本身，除非
      // 后面的 middleware 修改了它。
      return returnValue;
    };
  }
}

function loggerThree({ getState }) {
  return (next) => {
    console.log(3)
    return (action) => {
      console.log("will dispatch loggerThree", action);
  
      // 调用 middleware 链中下一个 middleware 的 dispatch。
      const returnValue = next(action);
  
      console.log("state after dispatch loggerThree", getState());
  
      // 一般会是 action 本身，除非
      // 后面的 middleware 修改了它。
      return returnValue;
    };
  }
}

export const addAction = () => ({
  type: "add",
});

export const resetAction = () => ({
  type: "reset",
});

const initState = {
  count: 0,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case "add":
      return { ...state, count: state.count + 1 };
    case "reset":
      return { ...state, count: 0 };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  applyMiddleware(loggerOne, loggerTwo, loggerThree)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
