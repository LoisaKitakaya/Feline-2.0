import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="pt-36 pb-20">
        <h1 className="text-4xl font-bold text-center">
          Welcome to Finance Fluent
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <Link
          to="/accounts"
          className="bg-emerald-400 hover:bg-emerald-500 rounded-md"
        >
          <button
            className="px-2 py-1 cursor-pointer border rounded-md flex justify-between items-center"
            type="button"
          >
            Go to Dashboard
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
