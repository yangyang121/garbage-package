import React from "react"
import HistoryContext from "./HistoryContext"
import RouterContext from "./RouterContext"

export default class Router extends React.Component {
  constructor(props) {
    super()
    this.state = {
      location: props.history.location,
    }
    this._isMount = false
    this._pendingLocation = null

    this.unlisten = props.history.listen((location) => {
      if (this._isMount) {
        this.setState({
          location,
        })
      } else {
        this._pendingLocation = location
      }
    })
  }

  static computeRootMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/",
    }
  }

  componentDidMount() {
    this._isMount = true
    if (this._pendingLocation) {
      this.setState({ location: this._pendingLocation })
    }
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten()
      this._isMount = false
      this._pendingLocation = null
    }
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.props.history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname),
        }}
      >
        <HistoryContext.Provider
          value={this.props.history}
          children={this.props.children || null}
        />
      </RouterContext.Provider>
    )
  }
}
