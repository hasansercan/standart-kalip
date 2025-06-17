import React from "react";
import About from "../components/About/About";
import Blogs from "../components/Blogs/Blogs";
import Categories from "../components/Categories/Categories";
import ProgramDownload from "../components/ProgramDownload/ProgramDownload";
import References from "../components/References/References";
import Sliders from "../components/Slider/Sliders";

const HomePage = () => {
  return (
    <React.Fragment>
      <Sliders />
      <Categories />
      <About />
      <Blogs />
      <ProgramDownload />
      <References />
    </React.Fragment>
  );
};

export default HomePage;
