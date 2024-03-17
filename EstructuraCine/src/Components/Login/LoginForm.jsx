import { Button, Checkbox, Label, TextInput } from "flowbite-react";


function Login() {
  return (
    <div className="justify-center items-center bg-black mt-8 mx-auto p-4" style={{ maxWidth: '500px', width: '100%' }}>
      <form className="flex flex-col gap-4">
        <h1 className="text-center text-3xl font-bold tex text-white">Iniciar sesión</h1>
        <Button color="gray" className="w-full rounded-3xl">
      <img src="gmail.png" alt="Gmail" className="mr-2" />

          Sign in with Google
        </Button>
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
  );
}

export default Login;
