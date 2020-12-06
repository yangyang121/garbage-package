import React from "react"
import Link from "../package/react-router/react-router-dom/Link"
// import { Link } from "react-router-dom"

function Backend() {
  return (
    <>
      <h1>后台页</h1>
      <Link to="/">回首页</Link>
    </>
  )
}

export default Backend
