import React from "react";
import HeaderWidget from "./Header";
import { useHeader } from "./hook";

export const Header = () => {
  const { user, loading, login, logout } = useHeader();

  console.log("[RENDER HEADER]", user, loading);

  return (
    <HeaderWidget user={user} loading={loading} login={login} logout={logout} />
  );
};

export default Header;
