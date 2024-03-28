// pages/_app.js
import 'bootstrap/dist/css/bootstrap.css';

import "../styles/movies.css";
import "../styles/login.css";
import "../styles/module.css";
import { useEffect } from 'react';
import Navigation from "../components/Navigation"


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  return (
    <>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;