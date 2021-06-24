import React from "react";
import "./profile.scss";
import "./logo192.png";

export default function Profile(props) {
    const {
        user_name, 
        user_bio,
        user_email
    } = props;     
    return(
        <div id="createProfile" className="container-fluid rounded shadow-lg">
            <div>
                <div className="card ms-4 align-items-end">
                    <button className="btn btn-lg card-item"><i className="fa fa-times-circle"></i></button>
                </div>
            </div>
            <div className="card-group mt-5">
                <div className="profile-image">
                    <div className="card me-5 ms-5">
                        <img src="./logo192.png"/>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="card">
                        <div className="card-item">
                            <div>
                                <p><b>Username:</b></p>
                                <p className="text-secondary">{user_name}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="card-item">
                            <div>
                                <p><b>Email:</b></p>
                                <p className="text-secondary">{user_email}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="card-item">
                            {user_bio == "null" ? (
                                <div>
                                    <p><b>Bio:</b></p>
                                    <p className="text-secondary">Nothing to show.</p>
                                </div>
                            ): (<p><b>Bio: {user_bio}</b></p>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}