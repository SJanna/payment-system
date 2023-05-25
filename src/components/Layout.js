import { Outlet, Link } from "react-router-dom";
import "../Layout.css"; // Importa el archivo de estilos CSS
import { Nav, Navbar } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';


function hasToken() {
  const token = localStorage.getItem('token');
  return token !== null && token !== undefined;
}
function hasTokenEBank() {
  const etoken = localStorage.getItem('eastbankToken');
  const wtoken = localStorage.getItem('westernbankToken');
  return (etoken !== null && etoken !== undefined) || (wtoken !== null && wtoken !== undefined);
}

const Layout = () => {
  const isAuthenticated = hasToken(); // Verifica si el usuario está autenticado
  const isBankAuthenticated = hasTokenEBank(); // Verifica si el usuario está autenticado en el EastBank

  return (
    <>
      <nav className="navbar">
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link to="/" className="navbar__link">Home</Link>
            <Link to="/api_status_checker" className="navbar__link">API Status Checker</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="navbar__item">
                <Link to="/logout" className="navbar__link">Logout</Link>
              </li>
              <li className="navbar__item">
                <Link to="/profile" className="navbar__link">Profile</Link>
              </li>
              <li className="navbar__item">
                <Link to="/transaction_history" className="navbar__link">Transaction History</Link>
              </li>
              {isBankAuthenticated && isAuthenticated ? (
                <>
                  <li className="navbar__item">
                    <Link to="/payment_form" className="navbar__link">Payment Form</Link>
                  </li>
                  <li className="navbar__item">
                    <Link to="/bank_account_info" className="navbar__link">Bank Account Info</Link>
                  </li>
                  <li className="navbar__item">
                    <Link to="/bank_login" className="navbar__link">Bank Login Form</Link>
                  </li>
                </>
              ) : (

                <li className="navbar__item">
                  <Link to="/bank_login" className="navbar__link">Bank Login Form</Link>
                </li>
              )}
            </>
          ) : (
            <>
              <li className="navbar__item">
                <Link to="/login" className="navbar__link">Login</Link>
              </li>
              <li className="navbar__item">
                <Link to="/register" className="navbar__link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
