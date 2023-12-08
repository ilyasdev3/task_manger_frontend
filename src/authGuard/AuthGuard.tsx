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
        await dispatch(verifyToken());
      }
    };

    checkToken();
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleUser = async () => {
      if (isValidToken) {
        await dispatch(getUser());

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
