import { Navigate } from 'react-router-dom';

function withAuth(Component) {
    return function ProtectedRoute(props) {
        const token = localStorage.getItem('jwt');

        console.log('Token:', token); // Imprime el token

        if (!token) {
            // Si no hay token, redirige al usuario a la página de inicio de sesión
            return <Navigate to="/allmovies" replace />;
        }

        // Si hay un token, renderiza el componente
        return <Component {...props} />;
    };
}

export default withAuth;