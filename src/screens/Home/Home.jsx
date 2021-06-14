import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authentication";

import "./home.scss";
const axios = require("axios").default;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }
  componentDidMount() {
    axios.get(`https://question0a.herokuapp.com/api/v1/questions`).then((res) => {
      this.setState({ questions: res.data });
      // console.log(res.data);
      // console.log(typeof res.data[1]);
    });
    console.log(this.props);
  }

  render() {
    const { logoutUser } = this.props;
    const questions = this.state.questions.map((i, idx) => {
      return (
        <Link to={"/question"} key={idx}>
          {i.id} {i.title}
          {i.state}
          {i.username}
        </Link>
      );
    });
    // console.log(typeof q);

    return (
      <div>
        Home Page
        <div className="container d-flex justify-content-center mt-20">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="card">
              <h5 className="card-header">Mobile Phones with their warranty</h5>
              <div className="card-body">
                <div className="list-group">
                  {/* start card */}

                  {questions}
                  {/* end card */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => logoutUser()}>logout</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      // dispatch(addMessage(message));
    },
  };
};

const Container = connect(null, { logoutUser })(Home);

export default Container;
