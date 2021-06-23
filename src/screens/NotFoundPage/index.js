import React, { Component } from "react";
import "./notFoundPage.scss";
import { Link } from "react-router-dom";
class NotFoundPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="notFoundPage" style={{ background: "#181828" }}>
        {/*dust particel*/}
        <div>
          <div className="starsec" />
          <div className="starthird" />
          <div className="starfourth" />
          <div className="starfifth" />
        </div>
        {/*Dust particle end-*/}
        <div className="lamp__wrap">
          <div className="lamp">
            <div className="cable" />
            <div className="cover" />
            <div className="in-cover">
              <div className="bulb" />
            </div>
            <div className="light" />
          </div>
        </div>
        {/* END Lamp */}
        <section className="error">
          {/* Content */}
          <div className="error__content">
            <div className="error__message message">
              <h1 className="message__title">Page Not Found</h1>
              <p className="message__text">
                We're sorry, the page you were looking for isn't found here. The link you
                followed may either be broken or no longer exists. Please try again, or
                take a look at our.
              </p>
            </div>
            <div className="error__nav e-nav">
              <Link to="/" className="e-nav__link" />
            </div>
          </div>
          {/* END Content */}
        </section>
      </div>
    );
  }
}

export default NotFoundPage;
