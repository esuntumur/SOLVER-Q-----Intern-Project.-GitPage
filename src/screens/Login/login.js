import "./login.scss";
import React from "react";
import { connect } from "react-redux";
import { loginUser, signupUser } from "../../redux/actions/authentication";
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
        
        <div className="dropdown">
          <nav className="navbar navbar-expand-lg py-4 shadow rounded navbar-light bg-light">
            <div className="ms-auto">
              {/* ---------------LOG-IN-------------- */}
              <button
                className="navbar-brand btn log-btn rounded"
                id="logInDropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Log In
              </button>
              <div
                className="dropdown-menu dropdown-menu-lg-end"
                aria-labelledby="logInDropdown"
              >
                <button
                  className="btn dropdown-header"
                >
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
                  </form>
                </button>              
              </div>

              {/* ---------------SIGN-UP-------------- */}
              <button
                className="navbar-brand btn log-btn rounded"
                id="signUpDropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sign Up
              </button>
              <div
                className="dropdown-menu dropdown-menu-lg-end"
                aria-labelledby="signUpDropdown"
              >
                <button
                  className="btn dropdown-header"
                >
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
                  </form>

                </button>              
              </div>  
            </div>         
          </nav>
      </div>
    </div>
    );
  }
}

const Container = connect(null, { loginUser, signupUser })(Login);

export default Container;
