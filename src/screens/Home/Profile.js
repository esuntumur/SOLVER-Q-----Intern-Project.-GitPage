import React from "react";
import "./profile.scss";
import "./logo192.png";

export class Profile extends React.Component {
    constructor() {
        super();
    }
    render() {        
        return(
            <div className="fluid-container" id="createProfile">
                <div className="form-bg">
                    <div className="card text-end">
                        <i className="fa fa-times-circle"></i>
                    </div>
                    <div className="card-group">
                        <div className="card">
                            <img src="./logo192.png"/>
                        </div>
                        <div className="card">
                            <div className="card-item mt-4">
                                <p><b>Username</b></p>
                                <input type="text" required minLength="1"></input>
                            </div>
                            <div className="card-item mt-4">
                                <p><b>Bio</b></p>
                                <input type="text" required minLength="1"></input>
                            </div>
                            <div className="card-item mt-4">
                                <p><b>Password</b></p>
                                <input type="text" required minLength="1"></input>
                            </div>
                            <div className="card-item">
                                <button className="btn btn-blue">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}