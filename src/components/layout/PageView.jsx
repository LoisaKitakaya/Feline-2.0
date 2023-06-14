/* eslint-disable react/prop-types */
import Footer from "../nav/Footer";
import Navbar from "../nav/Navbar";
import PageTitle from "../effects/PageTitle";

const PageView = ({ view, subTitle }) => {
  PageTitle(subTitle);

  return (
    <>
      <Navbar />
      <div className="mx-4 body">{view}</div>
      <Footer />
    </>
  );
};

export default PageView;
