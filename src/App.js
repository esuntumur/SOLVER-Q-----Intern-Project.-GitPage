import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./screens/Login/login";
import Home from "./screens/Home/Home";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
// export default connect((state) => ({}), {})(App);
