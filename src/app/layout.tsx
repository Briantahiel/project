import { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
// import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    // absolute ahora está definido en la misma página que se utiliza, por lo que no es necesario pasarlo aquí.
    // absolute: "",
    default: "MovieChat",
    template: "%s | NextJs Project",
  },
  description: "Movie Chat Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          {/* <p>Header</p> */}
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Movie Chat
              </a>
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
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link href="/movies" className="nav-link">Movies</Link>                  
                  </li>
                  <li className="nav-item">
                  <Link href="/login" className="nav-link">Login</Link>                  
                  </li>
                  <li className="nav-item">
                  <Link href="/about" className="nav-link">About us</Link>                  
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        {children}
        <footer>
          <p>Footer</p>
        </footer>
      </body>
    </html>
  );
}
