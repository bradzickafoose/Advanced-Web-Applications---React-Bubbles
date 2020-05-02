import React from "react";
import LoginForm from './LoginForm';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <LoginForm />
    </>
  );
};

export default Login;
