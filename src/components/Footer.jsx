import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4 mt-5">
      <Container className="text-center">
        <div className="row justify-content-center">
          <div className="col-md-4 mb-3">
            <h5>MeteoApp</h5>
            <p>La tua app meteo affidabile e aggiornata.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Link Utili</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Meteo Description
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Legal Notices
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Seguici</h5>
            <a href="#" className="text-light mx-2">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-light mx-2">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="text-light mx-2">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
        <p className="mt-3">© 2025 MeteoApp. Tutti i diritti riservati.</p>
      </Container>
    </footer>
  );
};

export default Footer;
