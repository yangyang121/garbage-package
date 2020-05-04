import React, { useContext, useReducer } from "react";
import ReactContext from "./context";

export default function connect(mapStateToProps, mapDispatchToProps) {
  return function (WrappedComponent) {
    return function () {
      const store = useContext(ReactContext);
      const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
      function handleClick() {
        forceUpdate();
      }
      store.subscribe(handleClick);
      return (
        <WrappedComponent
          {...mapStateToProps(store.getState())}
          {...mapDispatchToProps(store.dispatch)}
        />
      );
    };
  };
}
