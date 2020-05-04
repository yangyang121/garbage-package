import React from "react";
import ReactContext from "./context";

export default function Provider(props) {
  return (
    <ReactContext.Provider value={props.store}>
      {props.children}
    </ReactContext.Provider>
  );
}
