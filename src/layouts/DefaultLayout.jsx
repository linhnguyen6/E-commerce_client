import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <div id="layout">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
