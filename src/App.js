import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Category from "./page/Category";
import BackButton from "./component/BackButton";
import HideElement from "./component/HideElement";
import Header from "./component/Header";

function App() {
  return (
    <div className="app-body">
      <Router>
        <HideElement hideOnPaths={["/"]}>
          <BackButton />
        </HideElement>

        <Header />

        <Routes>
          <Route path="/about"></Route>
          <Route path="/users"></Route>
          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<Category />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
