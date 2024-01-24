import React from "react";
import BarTwo from "../components/nav/BarTwo";
import FeedSearch from "../components/FeedSearch";

export const metadata = {
  title: "Home",
  description: "View all entries",
};

const HomePage = () => {
  return (
    <>
      <BarTwo />

      <FeedSearch />
    </>
  );
};

export default HomePage;
