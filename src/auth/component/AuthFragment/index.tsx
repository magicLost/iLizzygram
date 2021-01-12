import React from "react";
import AuthFragmentWidget from "./AuthFragment";
import { useHeader } from "./hook";

export const AuthFragment = () => {
  const { user, loading, login, logout } = useHeader();

  console.log("[RENDER AUTH FRAGMENT]", user, loading);

  return (
    <AuthFragmentWidget
      user={user}
      loading={loading}
      login={login}
      logout={logout}
    />
  );
};

export default AuthFragment;
