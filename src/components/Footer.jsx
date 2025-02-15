import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  return (
    <footer>
      <div className="row justify-content-center mt-5">
        <div className="col col-6">
          <div className="row"></div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4">
            <div className="col">
              <div className="row"></div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col footer-links">
                  <p>
                    <a href="#" alt="footer link" className="text-decoration-none text-dark">
                      Meteo Description
                    </a>
                  </p>
                  <p>
                    <a href="#" alt="footer link" className="text-decoration-none text-dark">
                      Cookies
                    </a>
                  </p>
                  <p>
                    <a href="#" alt="footer link" className="text-decoration-none text-dark">
                      Legal Notices
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="row">
                <div className="col footer-links">
                  <p>
                    <a href="#" alt="footer link" className="text-decoration-none text-dark">
                      Help Center
                    </a>
                  </p>
                  <p>
                    <a href="#" alt="footer link" className="text-decoration-none text-dark">
                      Jobs
                    </a>
                  </p>
                  <p>
                    <a href="#" alt="footer link" className="text-decoration-none text-dark">
                      Cookie Preferences
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row"></div>
          <div className="row"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
