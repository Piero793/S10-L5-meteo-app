import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

const DetailPage = () => {
  const { id } = useParams();
  const [city, setCity] = useState(null);

  useEffect(() => {
    fetch(`URL_DELL_API_GRATUITA/${id}`)
      .then((response) => response.json())
      .then((data) => setCity(data))
      .catch((error) => console.error("Errore:", error));
  }, [id]);

  return (
    <Container className="mt-5">
      {city && (
        <Card className="mb-4">
          <Card.Img variant="top" src={city.weather[0].icon_url} alt={city.weather[0].description} />
          <Card.Body>
            <Card.Title className="text-center">{city.name}</Card.Title>
            <Card.Text>
              <strong>Temperatura:</strong> {city.main.temp}°C
            </Card.Text>
            <Card.Text>
              <strong>Umidità:</strong> {city.main.humidity}%
            </Card.Text>
            <Card.Text>
              <strong>Descrizione:</strong> {city.weather[0].description}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default DetailPage;
