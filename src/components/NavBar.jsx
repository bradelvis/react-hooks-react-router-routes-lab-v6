import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">

      <NavLink to="/" className="navbar">Home</NavLink>

      <NavLink to="/actors" className="navbar">Actors</NavLink>
      
      <NavLink to="/directors" className="navbar">Directors</NavLink>
    </nav>
    );
};

export default NavBar;
