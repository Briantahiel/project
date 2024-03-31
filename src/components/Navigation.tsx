import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { auth } from "../firebaseConfig";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [isLoggedin, setIsLoggedin] = useState<boolean>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
        console.log("user is logged out");
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.error("Something went wrong", error);
      });
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid ">
          <p className="navbar-brand">
            FLICKTALK
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link href="/movies" className="nav-link text-white">
                  Movies
                </Link>
              </li>
              {!isLoggedin ? (
                <li className="nav-item">
                  <Link href="/login" className="nav-link text-white">
                    Login
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-link nav-link text-white"
                  >
                    Logout
                  </button>
                </li>
              )}

              <li className="nav-item">
                <Link href="/about" className="nav-link text-white">
                  About us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
