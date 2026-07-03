import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">GitHub Explorer</Link>
      <div className="nav-links">
        <Link to="/">Search</Link>
        <Link to="/favourites">Favourites</Link>
      </div>
    </nav>
  );
}

export default Navbar;