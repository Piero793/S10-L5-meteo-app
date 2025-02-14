import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";

const API_KEY = "2cec432b452dfb21ac1220abe36c21b8";

const SingleCity = () => {
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      console.log(`Fetching ${cityName}...`);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
      console.log("Response:", response);
      const data = await response.json();
      console.log("dati:", data);
      setWeatherData(data);

      const { lat, lon } = data.coord;
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);

      setLoading(false);
    };

    fetchWeatherData();
  }, [cityName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const kelvinToCelsius = (kelvin) => {
    const celsius = (kelvin - 273.15).toFixed(2);
    return celsius;
  };

  return (
    <Container className="text-center">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Meteo di {weatherData.name}</Card.Title>
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
                    <Card.Text>
                      Clima:{" "}
                      {item.weather.map((weatherItem) => (
                        <span key={weatherItem.id}>
                          <img
                            src={`https://openweathermap.org/img/wn/${weatherItem.icon}.png`}
                            alt={weatherItem.description}
                            title={weatherItem.description}
                          />
                          {weatherItem.description}
                        </span>
                      ))}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </Container>
  );
};

export default SingleCity;
