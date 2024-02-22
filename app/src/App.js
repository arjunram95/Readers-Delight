import "./App.css";
import RequireAuth from "./components/RequireAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";

import DiscussionBoard2 from "./components/DiscussionBoard2";
import Signin from "./components/Signin";
import Register from "./components/Register";
import Header from "./components/Header";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/" element={<Layout />}>
              <Route element={<RequireAuth />}>
                <Route
                  path="/dboard/:bookId/:bookTitle"
                  element={<DiscussionBoard2 />}
                />
                <Route path="/homepage" element={<Homepage />} />
              </Route>
              <Route path="/signin" element={<Signin />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
