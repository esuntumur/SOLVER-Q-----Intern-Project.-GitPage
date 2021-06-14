import "./login.scss";
import React from "react";
// email: "dannd@example.com",
// password: "238523a",

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "dannd@example.com",
      password: "238523a",
      // email: "eve.holt@reqres.in",
      // password: "cityslicka",
      emailValid: false,
      passwordValid: false,
      formValid: false,
      isAuthenticated: false,
      token: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "fullName":
        errors.fullName = value.length < 5 ? "Full Name must be 5 characters long!" : "";
        break;
      case "email":
        // errors.email =
        //   "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" +
        //   "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$".test(value)
        //     ? ""
        //     : "Email is not valid!";
        break;
      case "password":
        errors.password = value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password,
    };

    // fetch("https://reqres.in/api/login", {
    fetch("https://question0a.herokuapp.com/api/v1/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(
        (data) => {
          console.log(data);
          this.setState({ token: data.token, isAuthenticated: true });
        },
        (error) => {
          console.log(error);
          this.setState({
            isAuthenticated: false,
            token: "No Data From Server",
          });
        }
      );
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

export default Login;
// Background Color: #f0f2f5
// Color: 	#1c1e21
// button Color: #1877f2, #4cd137
// Hover Color: #44bd32
