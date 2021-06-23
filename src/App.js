import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./screens/Login/login";
import Home from "./screens/Home/Home";
import { connect } from "react-redux";
import NotFoundPage from "../src/screens/NotFoundPage";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { isSignedIn } = this.props;
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            {isSignedIn ? (
              <Route path="/" component={Home} />
            ) : (
              <Route path="/" component={Login} />
            )}
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, null)(App);
