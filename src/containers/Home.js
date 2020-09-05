import React from "react";
import { bindActionCreators } from "../package/redux";
import { connect } from "../package/react-redux";
import { addAction, resetAction } from "../index";

const Home = React.forwardRef((props, ref) => {
  return (
    <div className="home">
      <p ref={ref} onClick={() => console.log("title clicked")}>
        {props.title}
      </p>
      <p>{props.count}</p>
      <button onClick={props.actions.addAction}>add</button>
      <button onClick={props.actions.resetAction}>reset</button>
    </div>
  );
});

const mapStateToProps = (state) => ({
  count: state.count,
});

const mapDispatchToProps = (dispatch) => ({
  addAction: () => dispatch(addAction()),
  actions: bindActionCreators({ addAction, resetAction }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
