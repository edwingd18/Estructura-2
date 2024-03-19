import { Button, TextInput } from "flowbite-react";
import { GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';

function Login() {

  const handleSuccess = (response) => {
    console.log(response);
  };

  const handleError = (error) => {
    console.log(error);
    // Aquí puedes manejar el error
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
          <Button type="submit" gradient="tealToLime" className="w-full">
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
