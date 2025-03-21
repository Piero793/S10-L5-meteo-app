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
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching");

    const fetchCityData = async () => {
      try {
        const fetchedData = [];

        for (const city of cities) {
          const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`);
          if (!response.ok) {
            throw new Error(`Errore nella richiesta per ${city}: ${response.status}`);
          }
          const data = await response.json();
          console.log("Data ricevuti per", city, ":", data);
          if (data.length > 0) {
            fetchedData.push(data[0]);
          }
        }

        setCityData(fetchedData);
      } catch (error) {
        console.error("Errore:", error);
        setError(error.message);
      }
    };

    fetchCityData();
  }, []);

  if (error) {
    return <div>Errore: {error}</div>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submission prevented");
  };

  return (
    <Container className="mt-4 text-center">
      <h1>Meteo nelle principali città di oggi</h1>
      <form onSubmit={handleSubmit}>
        <Row>
          {cityData.map((city, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="my-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">{city.name}</Card.Title>
                  <Card.Text>Latitude: {city.lat}</Card.Text>
                  <Card.Text>Longitude: {city.lon}</Card.Text>
                  <Link to={`/city/${city.name}`} className="btn btn-info d-flex justify-content-center text-light">
                    Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </form>
    </Container>
  );
};

export default HomePage;
