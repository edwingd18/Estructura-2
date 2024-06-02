import { useState } from 'react';
import { Modal, TextInput, Button, Checkbox, Label, Alert } from 'flowbite-react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Link, Navigate } from 'react-router-dom';
import { ModalForm } from './ModalForm';

export function ModalLogin({ showModal, toggleModal, context }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('failure'); // default alert type

  function handleLoginClick() {
    setIsLoginModalOpen(true);
  }

  function handleCloseLoginModal() {
    setIsLoginModalOpen(false);
  }

  function handleLogin() {
    const userData = {
      email: email,
      password: password,
    };

    fetch('http://localhost:8000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('email', email);
          setAlertMessage('Inicio de sesión exitoso.');
          setAlertType('success');
          setShowAlert(true);

          setTimeout(() => {
            setShowAlert(false);
            window.location.reload();
          }, 1000);

          fetch(`http://localhost:8000/api/user/${email}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${data.token}`,
            },
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then(userData => {
              console.log("User data:", userData);
              localStorage.setItem('username', userData.name);
              const isAdmin = userData.isAdmin || false;
              localStorage.setItem('isAdmin', isAdmin);
              console.log('isAdmin: ', isAdmin);
            })
            .catch((error) => {
              console.error('Error:', error);
            });

          if (context === 'sidebar') {
            setIsLoggedIn('sidebar');
          } else if (context === 'tickets') {
            setIsLoggedIn('ticket');
          }

        } else {
          setAlertMessage('Error al iniciar sesión: ' + data.error);
          setAlertType('failure');
          setShowAlert(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  if (isLoggedIn === 'sidebar') {
    return <Navigate to="/" />;
  } else if (isLoggedIn === 'ticket') {
    return <Navigate to="/selectTickets" />;
  }

  const customtema = {
    "root": {
      "base": "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
      "show": {
        "on": "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
        "off": "hidden"
      },
      "sizes": {
        "sm": "max-w-sm",
        "md": "max-w-md",
        "lg": "max-w-lg",
        "xl": "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl"
      },
      "positions": {
        "top-left": "items-start justify-start",
        "top-center": "items-start justify-center",
        "top-right": "items-start justify-end",
        "center-left": "items-center justify-start",
        "center": "items-center justify-center",
        "center-right": "items-center justify-end",
        "bottom-right": "items-end justify-end",
        "bottom-center": "items-end justify-center",
        "bottom-left": "items-end justify-start"
      }
    },
    "content": {
      "base": "relative h-full w-full p-4 md:h-auto",
      "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
    },
    "body": {
      "base": "flex-1 overflow-auto p-6",
      "popup": "pt-0"
    },
    "header": {
      "base": "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
      "popup": "border-b-0 p-2",
      "title": "text-xl font-medium text-gray-900 dark:text-white",
      "close": {
        "base": "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
        "icon": "h-5 w-5"
      }
    },
    "footer": {
      "base": "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
      "popup": "border-t"
    }
  };

  async function handleSuccess(response) {
    console.log("Login Successful:", response);
    setIsLoggedIn(true);
  }

  function handleError(error) {
    console.error("Error al iniciar sesión con Google: ", error);
  }

  return (
    <GoogleOAuthProvider clientId="529115021260-4lnijtikuumje6jkeo2i0pjiagn5i6o8.apps.googleusercontent.com">
      <Modal show={showModal} size="lg" onClose={toggleModal} theme={customtema} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="max-w-md mx-auto space-y-6">
            <h3 className="text-xl font-medium text-black text-center">Sign in to our platform</h3>
            <div className="flex flex-col items-center">
              <GoogleLogin
                onSuccess={handleSuccess}
                onFailure={handleError}
                render={renderProps => (
                  <Button onClick={renderProps.onClick} disabled={renderProps.disabled} className="w-full mt-4">
                    <img src="https://i.ibb.co/8PtwPGS/image-removebg-preview.png" alt="Google" className="mr-2 h-6" />
                    Sign in with Google
                  </Button>
                )}
              />
              <div className="text-center mt-4 mb-4">or</div>
              <TextInput
                id="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full"
              />
            </div>
            <div>
              <TextInput
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500 ml-4">
                Lost Password?
              </a>
            </div>
            <div className="w-full flex justify-center">
              <Button onClick={handleLogin} className="px-8">Log in</Button>
            </div>
            <div className="flex justify-between text-sm font-medium mt-4">
              Not registered?&nbsp;
              <Link to={"#"}>
                <a onClick={handleLoginClick} className="text-cyan-700 hover:underline dark:text-cyan-500 ml-4">
                  Create account
                </a>
              </Link>
            </div>
          </div>
          {isLoginModalOpen && createPortal(
            <ModalForm showModal={isLoginModalOpen} toggleModal={handleCloseLoginModal} />,
            document.body
          )}
        </Modal.Body>
      </Modal>
      {showAlert && (
        <div className="fixed top-0 right-0 mt-4 mr-4 z-50">
          <Alert color={alertType} onDismiss={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        </div>
      )}
    </GoogleOAuthProvider>
  );
}

ModalLogin.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  context: PropTypes.string.isRequired,
};

export default ModalLogin;
