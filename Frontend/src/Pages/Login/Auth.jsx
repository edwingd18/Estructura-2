import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';
import { Alert } from 'flowbite-react';

function withAuth(Component) {
  return function ProtectedRoute(props) {
    const [isExpired, setIsExpired] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [noToken, setNoToken] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        console.log('No has iniciado sesión. Por favor, inicia sesión.');
        setNoToken(true); // Si no hay token, establece noToken a true
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
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
      }, 3000);
      return <Navigate to="/" replace />;
    }

    if (noToken) {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
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