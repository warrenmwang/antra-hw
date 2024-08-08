import React from "react";
import MyContext from "./MyContext";
import store from "../redux";

export default function MyContexProvider({ children }) {
  return <MyContext.Provider value={{ store }}>{children}</MyContext.Provider>;
}
