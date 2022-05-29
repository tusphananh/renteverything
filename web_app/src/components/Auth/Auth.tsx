import { useRouter } from "next/router";
import React, { FC, Fragment, useEffect } from "react";
import { useAuthContext } from "../../contexts/authContext";
import Dashboard from "../Dashboard/Dashboard";

const Auth: FC = () => {
  const { authState } = useAuthContext();
  const router = useRouter();
  const toLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (!authState.isAuthenticated) {
      toLogin();
    }
  }, [authState]);

  return (
    <Fragment>
      {authState.isAuthenticated && !authState.isFetching && <Dashboard />}
    </Fragment>
  );
};

export default Auth;
