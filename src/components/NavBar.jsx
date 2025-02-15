import { useState } from "react";
import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === "Enter" && searchQuery.trim() !== "") {
      console.log(`Navigating to /city/${searchQuery}`);
      navigate(`/city/${searchQuery}`);
    }
  };

  return (
    <Navbar expand="lg" className="navBarColor">
      <Container fluid>
        <Link to="/" className="navbar-brand d-none d-lg-block">
          Meteo{" "}
          <span>
            <i className="bi bi-search ms-2"></i>
          </span>
        </Link>

        <Navbar.Collapse id="navbarScroll" className="d-flex flex-grow-1">
          <Form className="d-flex flex-grow-1">
            <InputGroup className="flex-grow-1">
              <Form.Control
                type="search"
                placeholder="Cerca il nome di una città..."
                aria-label="Search"
                aria-describedby="search-icon"
                className="flex-grow-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
