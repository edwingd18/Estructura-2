import { jwtDecode } from "jwt-decode";
import { Navigate } from 'react-router-dom';

function withAuth(Component) {
    return function ProtectedRoute(props) {
        const token = localStorage.getItem('jwt');
        if (!token) {
            // Si no hay token, redirige al usuario a la página de inicio de sesión
            console.log('No has iniciado sesión. Por favor, inicia sesión.');
            return <Navigate to="/" replace />;
        }

        // Se comprueba si el token ha expirado
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Obtén el tiempo actual en segundos
        if (decodedToken.exp < currentTime) {
            // Si el token ha expirado, borra el token del almacenamiento local y redirige al usuario a la página de inicio de sesión
            localStorage.removeItem('jwt');
            alert('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
            return <Navigate to="/" replace />;
        }

        // Si hay un token y no ha expirado, renderiza el componente
        return <Component {...props} />;
    };
}

export default withAuth;