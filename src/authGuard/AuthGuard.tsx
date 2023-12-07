// AuthGuard.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { selectAuthIsValidToken } from "../store/auth/auth.selectors";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../store/auth/auth.slice";
import { getUser } from "../store/user/user.slice";

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [token, setToken] = useState(true);

  const isValidToken = useSelector(selectAuthIsValidToken);

  useEffect(() => {
    const checkToken = async () => {
      if (!localStorage.getItem("taskManagerToken")) {
        setToken(false);
        navigate("/login");
      } else {
        // Log statement to see when token check is performed
        console.log("Checking token...");
        await dispatch(verifyToken());
        // Log statement to see when token verification is completed
        console.log("Token verification completed");
      }
    };

    checkToken();
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleUser = async () => {
      if (isValidToken) {
        // Log statement to see when user fetching is initiated
        console.log("Fetching user...");
        await dispatch(getUser());
        // Log statement to see when user fetching is completed
        console.log("User fetching completed");
        setToken(true);
      }
    };

    handleUser();
  }, [isValidToken, dispatch]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default AuthGuard;
