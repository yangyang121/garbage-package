import React, { useContext, useReducer } from "react";
import ReactContext from "./context";

export default function connect(mapStateToProps, mapDispatchToProps) {
  return function (WrappedComponent) {
    return React.forwardRef((props, ref) => {
      const store = useContext(ReactContext);
      // eslint-disable-next-line
      const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
      store.subscribe(forceUpdate);
      return (
        <WrappedComponent
          ref={ref}
          {...mapStateToProps(store.getState())}
          {...mapDispatchToProps(store.dispatch)}
          {...props}
        />
      );
    });
  };
}
