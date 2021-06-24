import React from "react";
import PropTypes from "prop-types";

function Navigation(props) {
  const {
    backFromSelectedQuestion,
    getQuestionsByPageNumber,
    blurLogo,
    searchSubmitHandler,
    createProfileToggle,
    blurBackground,
    logoutUser,
    user_name,
  } = props;
  return (
    <nav className="navbar navbar-expand-lg py-4 shadow rounded navbar-light bg-light">
      <div className="container-fluid">
        {/* LOGO */}
        <button
          className="navbar-brand btn"
          onClick={() => {
            backFromSelectedQuestion();
            getQuestionsByPageNumber(1);
            blurLogo();
          }}
          id="logo"
        >
          <img src="./logo192.png" alt="Logo" width="50" height="50" />
        </button>
        {/* NAVBAR TOGGLER IN MOBILE -> BUTTON */}
        <button
          className="navbar-toggler toggler-btn"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <br />
          {/*//*-----Search BAR------ */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <form className="d-flex form-horizontal" onSubmit={searchSubmitHandler}>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search..."
                  aria-label="Search"
                  name="searchValue"
                />
                <input type="hidden" name="order" value={1} />
                <button className="btn btn-sm search-btn" type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </li>
          </ul>
          <br />
          {/* PROFILE -> DROPDOWN BUTTON */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <button
                className="navbar-brand btn dropdown-toggle profile rounded"
                id="navbarDropdownMenu"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Profile
              </button>
              <div
                className="dropdown-menu dropdown-menu-lg-end"
                aria-labelledby="navbarDropdownMenu"
              >
                <p className="dropdown-header text-dark">
                  <b>{user_name}</b>
                </p>
                <button
                  className="btn dropdown-item"
                  onClick={() => {
                    createProfileToggle();
                    blurBackground();
                  }}
                >
                  Profile
                </button>
                <button
                  className="btn dropdown-item"
                  onClick={() => {
                    logoutUser();
                  }}
                >
                  Log Out
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navigation.propTypes = {};

export default Navigation;
