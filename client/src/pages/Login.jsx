import React from "react";
import { SignUp, SignIn, useUser } from "@clerk/react";
import { Navigate } from "react-router-dom";

const Login = ({ mode = "login" }) => {
  const isRegister = mode === "register";
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen w-full animate-gradient-flow text-white p-4 md:p-6 lg:p-8 flex items-center justify-center font-snas">
      {isRegister ? (
        <SignUp routing="path" path="/register" signInUrl="/login" fallbackRedirectUrl="/dashboard" />
      ) : (
        <SignIn routing="path" path="/login" signInUrl="/register" fallbackRedirectUrl="/dashboard" />
      )}
    </div>
  );
};

export default Login;
