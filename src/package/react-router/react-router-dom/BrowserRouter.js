import React from "react"
import Router from "../react-router/Router"
import { createBrowserHistory } from "../history"

export default class BrowserRouter extends React.Component {
  history = createBrowserHistory(this.props)
  render() {
    return <Router history={this.history} children={this.props.children} />
  }
}
