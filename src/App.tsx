import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";

import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <nav
        // style={{
        //   padding: 10,
        //   background: "#eee",
        //   display: "flex",
        //   gap: "15px",
        // }}
      >
        {/* <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link> */}
      </nav>

      <Routes>
    
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Home" element={<Home />} />

      </Routes>
    </Router>
  );
}

export default App;
