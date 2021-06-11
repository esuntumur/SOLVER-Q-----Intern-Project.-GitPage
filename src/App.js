import "./App.css";
import React from "react";
import Login from "./screens/Login/login";
import Home from "./screens/Home/Home";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      text: "",
    };
    this.addCount = this.addCount.bind(this);
  }
  addCount() {
    this.setState((state) => ({ count: state.count + 1 }));
  }
  render() {
    return (
      <div className="App">
        <Login />
        <Home />
      </div>
    );
  }
}

export default App;
