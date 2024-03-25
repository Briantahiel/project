import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          {/* <title>{metadata.title.default}</title> */}
          {/* <meta name="description" content={metadata.description} /> */}
        </Head>
        <body>
        <header>
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
          <Main />
          <footer>
            <p>Footer</p>
          </footer>
          <NextScript />
        </body>
      </Html>
    );
  }

