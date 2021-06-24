import React from "react";
import "./profile.scss";
import "./logo192.png";

export class Profile extends React.Component {
    constructor() {
        super();
    }
    render() {        
        return(
            <div id="createProfile" className="container-fluid">
                <div>
                    <div className="card text-end">
                        <i className="fa fa-times-circle"></i>
                    </div>
                </div>
                <div className="card-group row">
                    <div className="col-sm-2">
                        <div className="card">
                            <img src="./logo192.png"/>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-item">
                            <p><b>Username</b></p>
                            <input type="text" placeholder="New username"></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}