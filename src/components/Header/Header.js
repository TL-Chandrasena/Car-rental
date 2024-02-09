import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./Header.css";
import logo from "../../img/car-logo.jpg"; // Tell webpack this JS file uses this image

export const Header = () => {
  const { auth } = useContext(AuthContext);

  return (
    <header className="header">
      <nav>
        <Link to="/">
          <img
            src={logo}
            className="d-inline-block align-top logo-header"
            alt=""
          />
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalog">Car</Link>
          </li>

          {auth.accessToken ? (
            <>
              <li>
                <Link to="/create">Create Listing</Link>
              </li>
              <li>
                <Link to="/my-profile">My Profile</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
              {/* <div className="image-rounded-li">
                <img
                  src="https://lasu.edu.ng/home/img/avatar_circle_blue.png"
                  alt="https://lasu.edu.ng/home/img/avatar_circle_blue.png"
                  className="rounded-circle"
                />
              </div> */}
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
