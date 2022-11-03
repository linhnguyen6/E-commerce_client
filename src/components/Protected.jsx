import React from "react";
import PageNotFound from "../pages/PageNotFound";

const Protected = ({ children }) => {
  const isAdmin = true;

  if (isAdmin) {
    return children;
  }
  return <PageNotFound />;
};

export default Protected;
