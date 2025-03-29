// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/browse">Browse</Link></li>
//         <li><Link to="/about">About</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
import { NavLink } from "react-router-dom";
import "./Navbar.css"; 

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><NavLink to="/" className="nav-item" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/browse" className="nav-item" activeClassName="active">Browse</NavLink></li>
        <li><NavLink to="/about" className="nav-item" activeClassName="active">About</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
