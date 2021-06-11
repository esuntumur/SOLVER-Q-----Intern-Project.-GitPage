import React, { Component } from "react";
import "./home.scss";
class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Home Page
        <div className="container d-flex justify-content-center mt-20">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="card">
              <h5 className="card-header">Mobile Phones with their warranty</h5>
              <div className="card-body">
                <div className="list-group">
                  <a
                    href="/"
                    className="list-group-item list-group-item-action flex-column align-items-start active"
                    data-abc="true"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1 text-white">Iphone with extended warranty</h5>
                      <small>13 days ago</small>
                    </div>
                    <p className="mb-1">
                      You will get extended warranty with this mobile phone(Hurry limited
                      days left)
                    </p>
                    <small>Apple Mobile</small>
                  </a>
                  <a
                    href="/"
                    className="list-group-item list-group-item-action flex-column align-items-start"
                    data-abc="true"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Samsung C7 with extended warranty</h5>
                      <small className="text-muted">3 days ago</small>
                    </div>
                    <p className="mb-1">
                      You will get extended warranty with this mobile phone(Hurry limited
                      days left)
                    </p>
                    <small className="text-muted">Samsung Mobile</small>
                  </a>
                  <a
                    href="/"
                    className="list-group-item list-group-item-action flex-column align-items-start"
                    data-abc="true"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Nokia N9 with extended warranty</h5>
                      <small className="text-muted">12 days ago</small>
                    </div>
                    <p className="mb-1">
                      You will get extended warranty with this mobile phone(Hurry limited
                      days left)
                    </p>
                    <small className="text-muted">Nokia Mobile.</small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
