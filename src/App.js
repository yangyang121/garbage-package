import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "./package/react-redux";
import { addAction, resetAction } from "./index";
import "./App.css";

function App(props) {
  return (
    <div className="App">
      <p>{props.count}</p>
      <button onClick={props.actions.addAction}>add</button>
      <button onClick={props.actions.resetAction}>reset</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  count: state.count,
});

const mapDispatchToProps = (dispatch) => ({
  addAction: () => dispatch(addAction()),
  actions: bindActionCreators({ addAction, resetAction }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
