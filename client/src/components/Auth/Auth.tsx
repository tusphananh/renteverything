import React, { useEffect, FC } from "react";
import Dashboard from "../Dashboard/Dashboard";
import { useRouter } from "next/router";
import { useAuthContext } from "../../contexts/authContext";

const Auth: FC = () => {
  const { authState } = useAuthContext();
  const router = useRouter();
  const toLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (!authState.isAuthenticated && !authState.isFetching) {
      toLogin();
    }
  }, [authState]);

  return <>{authState.isAuthenticated && <Dashboard />}</>;

};

export default Auth;
