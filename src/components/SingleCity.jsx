import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";

const API_KEY = "2cec432b452dfb21ac1220abe36c21b8";

const SingleCity = () => {
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        console.log(`Fetching ${cityName}...`);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.status}`);
        }
        console.log("Response:", response);
        const data = await response.json();
        console.log("dati:", data);
        setWeatherData(data);

        const { lat, lon } = data.coord;
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        if (!forecastResponse.ok) {
          throw new Error(`Errore nella richiesta: ${forecastResponse.status}`);
        }
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);

        setLoading(false);
      } catch (error) {
        console.error("Errore:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [cityName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Errore: {error}</div>;
  }

  // Conversione unità di misura
  const kelvinToCelsius = (kelvin) => {
    const celsius = (kelvin - 273.15).toFixed(2);
    return Math.round(celsius);
  };

  // Gestione del form per evitare il comportamento predefinito
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submission prevented");
  };

  return (
    <Container className="text-center mt-4">
      <Link to="/" className="navbar-brand d-block text-center text-light mb-4">
        Torna alla home
      </Link>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Meteo in {weatherData.name}</Card.Title>
                <Card.Text>Temperatura: {kelvinToCelsius(weatherData.main.temp)}°C</Card.Text>
                <Card.Text>Temperatura percepita: {kelvinToCelsius(weatherData.main.feels_like)}°C</Card.Text>
                <Card.Text>Temperatura Minima: {kelvinToCelsius(weatherData.main.temp_min)}°C</Card.Text>
                <Card.Text>Temperatura Massima: {kelvinToCelsius(weatherData.main.temp_max)}°C</Card.Text>
                <Card.Text>Pressione atmosferica: {weatherData.main.pressure} hPa</Card.Text>
                <Card.Text>Umidità: {weatherData.main.humidity}%</Card.Text>
                <Card.Text>Velocità del vento: {weatherData.wind.speed} m/s</Card.Text>
                <Card.Text>
                  Clima:{" "}
                  {weatherData.weather.map((item) => (
                    <span key={item.id}>
                      <img
                        src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                        alt={item.description}
                        title={item.description}
                      />
                      {item.description}
                    </span>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Container className="my-4">
          <h2>Previsioni per i prossimi 5 giorni</h2>
          <Row>
            {forecastData &&
              forecastData.list.map((item, index) => (
                <Col key={index} sm={6} md={4} lg={3} xxl={2}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Text>Data e ora: {item.dt_txt}</Card.Text>
                      <Card.Text>Temperatura: {kelvinToCelsius(item.main.temp)}°C</Card.Text>
                      <Card.Text>Clima:</Card.Text>
                      {item.weather.map((weatherItem) => (
                        <div key={weatherItem.id}>
                          <div>
                            <img
                              src={`https://openweathermap.org/img/wn/${weatherItem.icon}.png`}
                              alt={weatherItem.description}
                              title={weatherItem.description}
                            />
                          </div>
                          <Card.Text>{weatherItem.description}</Card.Text>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </form>
    </Container>
  );
};

export default SingleCity;
