import "./login.scss";
import React from "react";
import { connect } from "react-redux";
import { loginUser, signupUser } from "../../redux/actions/authentication";
import LoginForm from "./LoginForm";
// email: "dannd@example.com",
// password: "238523a",

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const payload = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    this.props.loginUser(payload);
  }

  handleSubmitSignUp(event) {
    event.preventDefault();
    const payload = {
      user: {
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value,
      },
    };

    if (this.props.signupUser(payload)) console.log("sign up success");
    else console.log("sign up failed");
  }

  render() {
    return (
      <div id="login">
        <div className="l-form">
          <form className="form" onSubmit={this.handleSubmit}>
            <h4 className="form__title">Log In</h4>
            {/* ---------------Email------------- */}
            <div className="form_div">
              <input type="text" className="form__input" placeholder=" " name="email" />
              <label className="form__label">Email</label>
            </div>
            {/* ---------------Password--------------- */}
            <div className="form_div">
              <input
                type="password"
                className="form__input"
                placeholder=" "
                name="password"
              />
              <label className="form__label">Password</label>
            </div>
            {/* ---------------SUBMIT--------------- */}
            <input type="submit" className="form__button mb-3" value="Login" />

            {/* ---------------Social buttons--------------- */}
            <div className="dropdown-divider"></div>
            <p className="gray">or login with</p>
            <div className="social_icon2">
              <a href="/" className="fa fa-google form__button">
                {" "}
                  Continue with Google
              </a>
              <a href="/" className="fa fa-facebook form__button form__button">
                   Continue with Facebook
              </a>
            </div>
          </form>

          <form className="form" onSubmit={this.handleSubmitSignUp}>
            <h4 className="form__title">Sign Up</h4>
            {/* ---------------username--------------- */}
            <div className="form_div">
              <input
                type="text"
                className="form__input"
                placeholder=" "
                name="username"
              />
              <label className="form__label">Username</label>
            </div>
            {/* ---------------Email------------- */}
            <div className="form_div">
              <input type="text" className="form__input" placeholder=" " name="email" />
              <label className="form__label">Email</label>
            </div>
            {/* ---------------Password--------------- */}
            <div className="form_div">
              <input
                type="password"
                className="form__input"
                placeholder=" "
                name="password"
              />
              <label className="form__label">Password</label>
            </div>

            {/* ---------------SUBMIT--------------- */}
            <input type="submit" className="form__button mb-3" value="Sign Up" />

            {/* ---------------Social buttons--------------- */}
            <div className="dropdown-divider"></div>
            <p className="gray">or sign up with</p>
            <div className="social_icon2">
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
        <LoginForm message="hello world!" />
      </div>
    );
  }
}

const Container = connect(null, { loginUser, signupUser })(Login);

export default Container;
