import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Meteo</Navbar.Brand>
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex flex-grow-1">
            <InputGroup className="flex-grow-1">
              <Form.Control
                type="search"
                placeholder="Cerca il nome di una città..."
                aria-label="Search"
                aria-describedby="search-icon"
                className="flex-grow-1"
              />
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
