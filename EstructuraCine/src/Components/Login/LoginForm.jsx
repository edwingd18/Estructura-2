import { Button, Checkbox, Label, TextInput } from "flowbite-react";

function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form className="max-w-md flex flex-col gap-4">
        <h1 className="text-center text-3xl font-bold">Iniciar sesión</h1>
        <div>
          <div className="mb-2 block"></div>
          <TextInput
            id="email1"
            type="email"
            placeholder="Correo electrónico"
            required
          />
        </div>
        <div>
          <div className="mb-2 block"></div>
          <TextInput
            id="password1"
            type="password"
            placeholder="Contraseña"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Recordarme</Label>
        </div>
        <Button type="submit" gradient="tealToLime">
          Iniciar sesión
        </Button>
        <div className="flex justify-between mt-4">
          <a href="#">¿Olvidaste tu contraseña?</a>
          <a href="#">¿No tienes una cuenta? Regístrate</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
