import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useRouter } from "next/router";
import { useGetItemsByNameQuery } from "../../graphql-generated/graphql";
const Login = () => {
  const route = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { authState, authLogin } = useAuth();

  useEffect(() => {
    authState.isAuthenticated && route.push("/");
  }, [authState.isAuthenticated, route]);

  const onLogin = async () => {
    const { data } = useGetItemsByNameQuery({ variables: { name: "apple" } });
    console.log(data);
    await authLogin(phone, password);
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Phone"
        onChange={(event) => {
          setPhone(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button
        onClick={() => {
          onLogin();
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
