import "./login.scss";
import React from "react";
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/authentication";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const success = () => toast("You're signed up!");
const fail = () => toast("Email has already been taken");

export function SignUp(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const handleSubmitSignUp = async (data) => {
    const payload = {
      user: {
        username: data.username,
        email: data.email2,
        password: data.password2,
      },
    };
    const res = await props.signupUser(payload);
    if (res) success();
    else fail();
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleSubmitSignUp)}>
      <ToastContainer />
      <h4 className="form__title">Sign Up</h4>
      {/* ---------------username--------------- */}
      <div className="form_div">
        <input type="text" className="form__input" placeholder=" " {...register("username", { required: true, minLength: 3 })} />
        <label className="form__label">Username</label>
      </div>
      {errors.username?.type === "required" && <span>Email is required</span>}
      {errors.username?.type === "minLength" && <span>password minLength is 7</span>}
      {/* ---------------Email------------- */}
      <div className="form_div">
        <input
          type="text"
          className="form__input"
          placeholder=" "
          {...register("email2", { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}
        />
        <label className="form__label">Email</label>
      </div>
      {errors.email2?.type === "required" && <span>Email is required</span>}
      {errors.email2?.type === "pattern" && <span>Email pattern is wrong.</span>}
      {/* ---------------Password--------------- */}
      <div className="form_div">
        <input type="password" className="form__input" placeholder=" " {...register("password2", { required: true, minLength: 6, maxLength: 30 })} />
        <label className="form__label">Password</label>
      </div>
      {errors.password2?.type === "required" && <span>password is required.</span>}
      {errors.password2?.type === "minLength" && <span>password minLength is 7</span>}
      {errors.password2?.type === "maxLength" && <span>password maxLength is 30</span>}
      {/* ---------------SUBMIT--------------- */}
      <input type="submit" className="form__button mb-3" value="Sign Up" />
    </form>
  );
}

const Container = connect(null, { signupUser })(SignUp);

export default Container;
