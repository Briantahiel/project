// components/Layout.js
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/globals.css'; // Aquí puedes importar estilos globales comunes a todas las páginas

const Layout = ({ children }) => {
  useEffect(() => {
    // Aquí puedes realizar cualquier inicialización que necesites para tu diseño
    console.log("El componente Layout se ha montado."); // Ejemplo de inicialización: un simple mensaje de registro
    // Puedes agregar aquí cualquier otra lógica de inicialización que necesites
    return () => {
      // Esta función se ejecutará cuando el componente se desmonte
      console.log("El componente Layout se ha desmontado."); // Ejemplo de limpieza: un simple mensaje de registro
      // Puedes agregar aquí cualquier otra lógica de limpieza que necesites
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default Layout;
