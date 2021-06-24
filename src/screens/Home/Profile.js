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
        <div id="createProfile" className="container-fluid rounded">
            <div>
                <div className="card ms-4 me-4 align-items-end">
                    <button className="btn btn-lg card-item"><i className="fa fa-times-circle"></i></button>
                </div>
            </div>
            <div className="card-group container-fluid">
                <div className="profile-image">
                    <div className="card">
                        <img src="./logo192.png"/>
                    </div>
                </div>
                <div className="ms-4 mt-4">
                    <div className="card">
                        <div className="card-item">
                            <p><b>Username:</b> {user_name}</p>
                        </div>
                        <div className="card-item">
                            <p><b>Gmail:</b> {user_email}</p>
                        </div>
                        <div className="card-item">
                            {user_bio == "null" ? (<p><b>Bio:</b> Nothing to show. Add bio.</p>): (<p><b>Bio: {user_bio}</b></p>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}