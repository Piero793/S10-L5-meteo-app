import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const API_KEY = "2cec432b452dfb21ac1220abe36c21b8";
const cities = ["Udine", "Rome", "Milan", "Florence", "Naples", "Bari"];

const HomePage = () => {
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    console.log("Fetching"); //non riesco a risolvere il problema per cui a volte al rendering del componente mi si duplicano le stesse città

    cities.forEach(async (city) => {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`);
      const data = await response.json();
      console.log("Data received for", city, ":", data);
      if (data.length > 0) {
        setCityData((prevData) => [...prevData, data[0]]);
      }
    });
  }, []);

  return (
    <Container className="mt-4 text-center">
      <h1>Meteo nelle principali città di oggi</h1>
      <Row>
        {cityData.map((city, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="my-3">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">{city.name}</Card.Title>
                <Card.Text>Latitude: {city.lat}</Card.Text>
                <Card.Text>Longitude: {city.lon}</Card.Text>
                <Link to={`/city/${city.name}`} className="btn btn-primary d-flex justify-content-center">
                  Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
