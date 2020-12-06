import React from "react"
import Link from "../package/react-router/react-router-dom/Link"
// import { Link } from "react-router-dom"

function Admin() {
  return (
    <>
      <h1>管理员页</h1>
      <Link to="/">回首页</Link>
    </>
  )
}

export default Admin
