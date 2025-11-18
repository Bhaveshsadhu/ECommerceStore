import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";

const NavbarComp = () => {
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const isDark = theme === "dark";

  return (
    <nav
      className="navbar navbar-expand-lg app-navbar sticky-top py-3"
      data-bs-theme={isDark ? "dark" : "light"}
    >
      <div className="container-xxl px-3 px-md-4">
        <Link className="navbar-brand fw-bold text-decoration-none d-flex align-items-center gap-2" to="/">
          <span className="badge-soft">UrbanCart</span>
          <span className="text-muted small d-none d-sm-inline">Modern Commerce</span>
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse mt-3 mt-lg-0" id="mainNavbar">
          <ul className="navbar-nav gap-lg-3 me-lg-4">
            <li className="nav-item">
              <NavLink className="nav-link fw-medium" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium" to="/admin">
                Admin
              </NavLink>
            </li>
          </ul>

          <form
            className="d-flex flex-column flex-lg-row align-items-stretch gap-2 flex-grow-1 me-lg-3"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.65" y1="16.65" x2="21" y2="21" />
                </svg>
              </span>
              <input
                className="form-control border-start-0"
                type="search"
                placeholder="Search for products, brands, or collections"
              />
            </div>
          </form>

          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            <button
              className="btn btn-outline-secondary d-flex align-items-center gap-2"
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  Dark
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  Light
                </>
              )}
            </button>
            <Link className="btn btn-primary position-relative d-flex align-items-center gap-2" to="/cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Cart
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComp;
