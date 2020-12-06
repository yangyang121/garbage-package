import React from "react"
import Link from "../package/react-router/react-router-dom/Link"
// import { Link } from "react-router-dom"

function Login(props) {
  console.log(props)
  return (
    <>
      <h1>登录页</h1>
      <Link to="/">回首页</Link>
    </>
  )
}

export default Login
