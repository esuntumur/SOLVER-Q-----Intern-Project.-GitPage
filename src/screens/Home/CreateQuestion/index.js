import React, { Component } from "react";
import "./style.scss";
class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="form4 top">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-md-offset-2">
              <div className="form-bg">
                <form className="form">
                  <div className="form-group">
                    {" "}
                    <label className="sr-only">Name</label>{" "}
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="nameNine"
                      placeholder="Your Name"
                    />{" "}
                  </div>
                  <div className="form-group">
                    {" "}
                    <label className="sr-only">Email</label>{" "}
                    <input
                      type="email"
                      className="form-control"
                      required
                      id="emailNine"
                      placeholder="Email Address"
                    />{" "}
                  </div>
                  <div className="form-group">
                    {" "}
                    <label className="sr-only">Name</label>{" "}
                    <textarea
                      className="form-control"
                      required
                      rows={7}
                      id="messageNine"
                      placeholder="Write message"
                      defaultValue={""}
                    />{" "}
                  </div>{" "}
                  <button type="submit" className="btn text-center btn-blue">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateQuestion;
