import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import Dashboard from "../Dashboard/Dashboard";
import { useRouter } from "next/router";

function Auth() {
  const { state } = useContext(AuthContext);
  const router = useRouter();
  const toLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (!state.isAuthenticated) {
      toLogin();
    }
  }, [state]);

  return (
    <>
      {state.isAuthenticated && <Dashboard />}
    </>
  );
}

export default Auth;
