import PageView from "./components/layout/PageView";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <PageView view={<Home />} />
    </>
  );
};

export default App;
