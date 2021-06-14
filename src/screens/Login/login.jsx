import "./login.scss";
import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authentication";
// email: "dannd@example.com",
// password: "238523a",

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    const payload = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    console.log(payload);
    this.props.loginUser(payload);
  }

  render() {
    return (
      <div>
        email: {this.state.email} <br />
        password: {this.state.password} <br />
        token: {this.state.token} <br />
        isAuthenticated: {this.state.isAuthenticated ? "true" : "false"} <br />
        {this.state.isAuthenticated ? (
          <h1>Welcome, You're logged in!</h1>
        ) : (
          <h1>Invalid user! please check your inputs are correct.</h1>
        )}
        <div className="l-form">
          <form action className="form" onSubmit={this.handleSubmit}>
            <h4 className="form__title">Welcome</h4>
            {/* ---------------Email------------- */}
            <div className="form_div">
              <input
                type="text"
                className="form__input"
                placeholder=" "
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label htmlFor className="form__label">
                Email
              </label>
            </div>
            {/* ---------------Password--------------- */}
            <div className="form_div">
              <input
                type="password"
                className="form__input"
                placeholder=" "
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <label htmlFor className="form__label">
                Password
              </label>
            </div>
            {/* ---------------SUBMIT--------------- */}
            <input type="submit" className="form__button mb-3" value="Log In" />

            {/* ---------------Social buttons--------------- */}
            <div class="dropdown-divider"></div>
            <p className="gray">or login with</p>
            <div class="social_icon2">
              <a href="/" className="fa fa-google form__button">
                {" "}
                  Continue with Google
              </a>
              <a href="/" className="fa fa-facebook form__button form__button">
                   Continue with Facebook
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const Container = connect(null, { loginUser })(Login);

export default Container;
// Background Color: #f0f2f5
// Color: 	#1c1e21
// button Color: #1877f2, #4cd137
// Hover Color: #44bd32
