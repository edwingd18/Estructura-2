import { Button, TextInput } from "flowbite-react";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

function Login() {

  async function handleSuccess(response) {
    try {
      const tokenId = response.tokenId;
      // const user = response.profileObj;

      // Aquí puedes enviar el tokenId al servidor para verificarlo y autenticar al usuario
      const serverResponse = await fetch('http://localhost:8000/user/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenId: tokenId
        })
      });

      if (!serverResponse.ok) {
        throw new Error('Error al iniciar sesión con Google');
      }

      const data = await serverResponse.json();

      // Si la respuesta es exitosa, guarda el token en el almacenamiento local
      localStorage.setItem('token', data.token);

      // Redirige al usuario a la página de boletas
      window.location.href = '/selectTickets';
    } catch (error) {
      console.error(error);
    }
  }

  function handleError(response) {
    console.error('Error al iniciar sesión con Google: ', response);
  }

  async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email1').value;
    const passwd = document.getElementById('password1').value;

    try {
      console.log('contando');
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: passwd
        })
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const data = await response.json();
      console.log(data);

      localStorage.setItem('token', data.token);

      window.location.href = '/selectTickets';
    } catch (error) {
      // Si hay un error, muestra el mensaje de error
      console.error(error);
    }
  }

  return (
    <GoogleOAuthProvider clientId="136154198457-j4u44us1bc9vhamgnpjlvb2k8dqjb7u9.apps.googleusercontent.com">
      <div className="justify-center items-center bg-black mt-8 mx-auto p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <form className="flex flex-col gap-4">
          <h1 className="text-center text-3xl font-bold tex text-white">Iniciar sesión</h1>
          <GoogleLogin
            onSuccess={handleSuccess}
            onFailure={handleError}
            render={renderProps => (
              <Button color="gray" className="w-full rounded-3xl" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <img src="https://i.ibb.co/8PtwPGS/image-removebg-preview.png" alt="Gmail" className="mr-2" width="20" />
                Sign in with Google
              </Button>
            )}
          />
          <div className="text-center mt-4 text-gray-500">or</div>
          <div>
            <div className="mb-2 block"></div>
            <TextInput
              id="email1"
              type="email"
              placeholder="Email"
              required
              className="w-full"
            />
          </div>
          <div>
            <div className="mb-2 block"></div>
            <TextInput
              id="password1"
              type="password"
              placeholder="Password"
              required
              className="w-full"
            />
          </div>
          <Button onClick={handleLogin} type="submit" gradient="tealToLime" className="w-full">
            Iniciar sesión
          </Button>
          <div className="flex justify-between mt-4">
            <a href="#" className="text-white">¿No tienes una cuenta? Crea una</a>
          </div>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
