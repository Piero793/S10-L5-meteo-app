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
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.status}`);
        }
        const data = await response.json();
        setWeatherData(data);

        const { lat, lon } = data.coord;
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        if (!forecastResponse.ok) {
          throw new Error(`Errore nella richiesta: ${forecastResponse.status}`);
        }
        const forecastData = await forecastResponse.json();

        // Raggruppa le previsioni per giorno
        const groupedForecast = {};
        forecastData.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0]; // Prende solo la data senza l'orario
          if (!groupedForecast[date]) {
            groupedForecast[date] = [];
          }
          groupedForecast[date].push(item);
        });

        setForecastData(groupedForecast);
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

  const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

  return (
    <Container className="text-center mt-4">
      <Link to="/" className="navbar-brand d-block text-center text-light mb-4">
        Torna alla home
      </Link>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Meteo in {weatherData.name}</Card.Title>
              <Card.Text>Temperatura: {kelvinToCelsius(weatherData.main.temp)}°C</Card.Text>
              <Card.Text>Umidità: {weatherData.main.humidity}%</Card.Text>
              <Card.Text>Vento: {weatherData.wind.speed} m/s</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Container className="my-4">
        <h2>Previsioni per i prossimi 5 giorni</h2>
        <Row>
          {forecastData &&
            Object.keys(forecastData).map((date, index) => {
              const dailyForecasts = forecastData[date];
              const avgTemp = dailyForecasts.reduce((sum, item) => sum + item.main.temp, 0) / dailyForecasts.length;
              const mainWeather = dailyForecasts[0].weather[0];

              return (
                <Col key={index} sm={6} md={4} lg={3} xxl={2}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>{date}</Card.Title>
                      <Card.Text>Temperatura media: {kelvinToCelsius(avgTemp)}°C</Card.Text>
                      <img
                        src={`https://openweathermap.org/img/wn/${mainWeather.icon}.png`}
                        alt={mainWeather.description}
                        title={mainWeather.description}
                      />
                      <Card.Text>{mainWeather.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </Container>
  );
};

export default SingleCity;
