import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  errorCleanUp,
  messageCleanUp,
} from "../store/auth/auth.slice";
import {
  selectAuthError,
  selectAuthMessage,
} from "../store/auth/auth.selectors";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const registerMessage = useSelector(selectAuthMessage);
  const registerErrorMessage = useSelector(selectAuthError);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(messageCleanUp());
    dispatch(errorCleanUp());
    dispatch(createUser(form));
    console.log(form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (registerMessage === "Register successfully") {
      toast.success(registerMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      window.location.href = "/login";
    } else if (registerErrorMessage) {
      toast.error(registerErrorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [registerMessage, registerErrorMessage]);

  useEffect(() => {
    return () => {
      dispatch(messageCleanUp());
      dispatch(errorCleanUp());
    };
  }, []);

  return (
    <div>
      <div className="w-screen h-screen flex items-center justify-center">
        <Form className="md:w-1/4 sm:w-1/2 w-[400px]" onSubmit={handleSubmit}>
          <Form.Field>
            <label>Enter Your Name</label>
            <input
              placeholder="Enter Your Name"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </Form.Field>
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
            Register
          </Button>

          <div className="text-center mt-3">
            Already have an account? <a href="/login">Login</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
