import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Navigation(props) {
  const {
    backFromSelectedQuestion,
    getQuestionsByPageNumber,
    searchSubmitHandler,
    createProfileToggle,
    blurBackground,
    logoutUser,
    user_name,
    user_photo,
  } = props;

  return (
    <nav className="navbar navbar-expand-lg py-4 shadow rounded navbar-light bg-light">
      <div className="container-fluid">
        {/* LOGO */}
        <button
          className="navbar-brand btn me-0"
          onClick={() => {
            backFromSelectedQuestion();
            getQuestionsByPageNumber(1);
          }}
          id="logo"
        >
          <img src="https://svgsilh.com/svg_v2/341059.svg" alt="Logo" width="50" height="50" />
        </button>
        {/* NAVBAR TOGGLER IN MOBILE -> BUTTON */}
        <p className="navbar-brand mt-3 me-5 ms-0">SOLVER-Q</p>
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
                <input className="form-control" type="text" placeholder="Search..." aria-label="Search" name="searchValue" id="searchValue" />
                <input type="hidden" name="order" value={1} />
                <button className="btn btn-sm search-btn" type="submit">
                  <FontAwesomeIcon icon={faSearch} />
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
                <img src={user_photo} width="50px" height="50px" />
              </button>
              <div className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="navbarDropdownMenu">
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
