import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { Alert } from 'flowbite-react';

function withAuth(Component) {
  return function ProtectedRoute(props) {
    const [isExpired, setIsExpired] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        // Si no hay token, redirige al usuario a la página de inicio de sesión
        console.log('No has iniciado sesión. Por favor, inicia sesión.');
        return;
      }

      try {
        // Se comprueba si el token ha expirado
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Obtén el tiempo actual en segundos
        if (decodedToken.exp < currentTime) {
          // Si el token ha expirado, borra el token del almacenamiento local y muestra la alerta
          localStorage.removeItem('jwt');
          setIsExpired(true);
          setShowAlert(true);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }, []);

    if (isExpired) {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Ocultar la alerta después de 3 segundos
      return <Navigate to="/" replace />;
    }

    return (
      <>
        {showAlert && (
          <div className="fixed top-0 right-0 mt-4 mr-4 z-50">
            <Alert color="failure" onDismiss={() => setShowAlert(false)}>
              Tu sesión ha expirado. Por favor, inicia sesión de nuevo.
            </Alert>
          </div>
        )}
        <Component {...props} />
      </>
    );
  };
}

export default withAuth;
