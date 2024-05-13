import { Alert } from "flowbite-react";

export function AlertCreateMovie() {
  return (
    <Alert color="success" onDismiss={() => alert('Alert dismissed!')}>
       La nueva pelicula se agrego exitosamente.
    </Alert>
  );
}