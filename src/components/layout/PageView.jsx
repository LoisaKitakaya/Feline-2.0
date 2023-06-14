/* eslint-disable react/prop-types */
import Footer from "../nav/Footer";
import Navbar from "../nav/Navbar";

const PageView = ({ view }) => {
  return (
    <>
      <Navbar />
      <div className="mx-4 body">{view}</div>
      <Footer />
    </>
  );
};

export default PageView;
