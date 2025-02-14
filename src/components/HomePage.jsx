import { Card, Col, Container, Row } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container>
      <Row xs={1} md={2} lg={4} xxl={6}>
        <Col>
          <Card>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title className="text-center">Card Title</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
