import android from "./img/googleplay.webp";
import apple from "./img/applestore.webp";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center py-2 px-4 border-t mt-8">
      <div className="flex justify-start items-center">
        <a href="">
          <img src={android} alt="app stickers" />
        </a>
        <div className="mx-2"></div>
        <a href="">
          <img src={apple} alt="app stickers" />
        </a>
      </div>
      <div className="flex justify-end items-center">
        <p>&copy; 2023 Finance Fluent. All rights reserver.</p>
        <i className="bi bi-dot mx-2"></i>
        <a href="" className="hover:text-emerald-600 hover:underline">T&C</a>
        <i className="bi bi-dot mx-2"></i>
        <a href="" className="hover:text-emerald-600 hover:underline">Blog</a>
        <i className="bi bi-dot mx-2"></i>
        <a href="" className="hover:text-emerald-600 hover:underline">Site Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
