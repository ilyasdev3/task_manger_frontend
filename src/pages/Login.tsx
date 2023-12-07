import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  errorCleanUp,
  messageCleanUp,
} from "../store/auth/auth.slice";
import {
  selectAuthError,
  selectAuthMessage,
} from "../store/auth/auth.selectors";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const loginMessage = useSelector(selectAuthMessage);
  const loginErrorMessage = useSelector(selectAuthError);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(messageCleanUp());
    dispatch(errorCleanUp());
    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (loginMessage === "Login successfully") {
      toast.success(loginMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } else if (loginErrorMessage) {
      toast.error(loginErrorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [loginMessage, loginErrorMessage]);

  useEffect(() => {
    return () => {
      dispatch(messageCleanUp());
      dispatch(errorCleanUp());
    };
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Form className="md:w-1/4 sm:w-1/2 w-[400px]" onSubmit={handleSubmit}>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Enter Your Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="Enter Your Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </Form.Field>

        <Button fluid type="submit">
          Login
        </Button>

        <div className="text-center mt-3">
          Do not have an account? <a href="/register">Register</a>
        </div>
      </Form>
    </div>
  );
};

export default Login;
