import * as React from "react";
import Create from "./pages/Create";
import Home from "./pages/Home";
import Images from "./pages/Images";
import History from "./pages/History";

export const HomePage = () => {
  return (
    <>
      <Home />
    </>
  );
};
export const CreatePage = () => {
  return (
    <>
      <Create />
    </>
  );
};
export const ImagesPage = () => {
  return (
    <>
      <Images />
    </>
  );
};

export const HistoryPage = () => (<History />)