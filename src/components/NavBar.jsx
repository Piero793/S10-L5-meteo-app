import { useState } from "react";
import { Navbar, Container, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "react-bootstrap-icons";

function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/city/${searchQuery}`);
    }
  };

  return (
    <Navbar expand="lg" className="navBarColor sticky-top p-3">
      <Container fluid>
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://www.freeiconspng.com/uploads/weather-icon-png-2.png"
            alt="meteo"
            style={{ width: 50, height: 50 }}
          />
          <span className="ms-2">MeteoApp</span>
        </Link>

        <Navbar.Collapse id="navbarScroll" className="d-flex flex-grow-1 justify-content-center">
          <Form className="d-flex flex-grow-1" style={{ maxWidth: "400px" }}>
            <InputGroup className="flex-grow-1">
              <Form.Control
                type="search"
                placeholder="Cerca una città..."
                aria-label="Search"
                aria-describedby="search-icon"
                className="flex-grow-1 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
              <InputGroup.Text id="search-icon" className="bg-white border-0">
                <Search color="#1e3c72" size={20} />
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
