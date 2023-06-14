import { Routes, Route } from "react-router-dom";

import PageView from "./components/layout/PageView";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<PageView view={<Home />} subTitle={"Home"} />}
        />
      </Routes>
    </>
  );
};

export default App;
