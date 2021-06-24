import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("firstName", { required: true, maxLength: 1 })}
        placeholder="First name"
      />
      {errors.firstName?.type === "required" && "First name is required"}
      <input {...register("lastName", { required: true })} placeholder="Last name" />
      <select {...register("category", { required: true })}>
        <option value="">Select...</option>
        <option value="A">Category A</option>
        <option value="B">Category B</option>
      </select>
      <input type="submit" />
      {errors.category?.type === "required" && "Category must be filled"}
    </form>
  );
};

export default LoginForm;
