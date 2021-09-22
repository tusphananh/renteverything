import React, { useEffect } from "react";
import Dashboard from "../Dashboard/Dashboard";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/authContext";

function Auth() {
  const { authState } = useAuth();
  const router = useRouter();
  const toLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (!authState.isAuthenticated) {
      toLogin();
    }
  }, [authState]);

  return <>{authState.isAuthenticated && <Dashboard />}</>;
}

export default Auth;
