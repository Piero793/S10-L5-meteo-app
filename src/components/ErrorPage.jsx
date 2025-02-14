import { Alert, Container } from "react-bootstrap";

const ErrorPage = () => {
  return (
    <Container className="text-center mt-4">
      <Alert variant="danger">
        Pagina non trovata <Alert.Link href="/">Torna alla Home</Alert.Link>
      </Alert>
    </Container>
  );
};

export default ErrorPage;
