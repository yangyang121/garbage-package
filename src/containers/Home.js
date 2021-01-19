import React from "react"
import Link from "../package/react-router/react-router-dom/Link"
// import { Link } from "react-router-dom"
import { bindActionCreators } from "../package/redux"
import { connect } from "../package/react-redux"
import { addAction, resetAction } from "../index"
// import _ from "lodash"

const Home = React.forwardRef((props, ref) => {
  console.log(props)
  return (
    <div className="home">
      <p>首页</p>
      <p>
        <Link to="/backend">后台</Link>
      </p>
      <p>
        <Link to="/admin">管理员</Link>
      </p>
      <p>
        <Link to="/login">登录</Link>
      </p>
      <p ref={ref} onClick={() => console.log("title clicked")}>
        {props.title}
      </p>
      <p>{props.count}</p>
      <button onClick={props.actions.addAction}>add</button>
      <button onClick={props.actions.resetAction}>reset</button>
    </div>
  )
})

const mapStateToProps = (state) => ({
  count: state.count,
})

const mapDispatchToProps = (dispatch) => ({
  addAction: () => dispatch(addAction()),
  actions: bindActionCreators({ addAction, resetAction }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
