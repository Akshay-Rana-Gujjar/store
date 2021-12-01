import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Category from "./page/Category";
import BackButton from "./component/BackButton";
import HideElement from "./component/HideElement";
import Header from "./component/Header";
import Firebase from "./provider/firebase";

function App() {
  return (
    <Firebase>
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
            <Route path="/category/:id" element={<Category />} />
          </Routes>
        </Router>
      </div>
    </Firebase>
  );
}

export default App;
