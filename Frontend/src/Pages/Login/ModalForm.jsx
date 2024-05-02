import { useState } from 'react';
import { Modal, TextInput, Button, Checkbox, Label } from 'flowbite-react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

export function ModalForm({ showModal, toggleModal }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] = useState(false);

    function handleCloseLoginModal() {
        setIsLoginModalOpen(false);
    }

    function handleCreateAccountClick() {
        toggleModal(); // Cierra el modal de inicio de sesión
        setIsCreateAccountModalOpen(true); // Abre el modal de "Create account"
    }

    function handleRegisterClick() {
        if (!isCheckboxChecked) {
            alert('Por favor, confirma el tratamiento de datos');
            return;
        }

        const userData = {
            name: name,
            lastname: lastname,
            email: email,
            password: password,
        };

        fetch('http://localhost:8000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.message === 'Usuario registrado exitosamente') {
                    alert(data.message);
                    setIsCreateAccountModalOpen(false); // Cierra el modal de registro
                    toggleModal(); // Abre el modal de inicio de sesión
                } else {
                    alert('Error al registrar el usuario: ' + data.error);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const customtema = {
        "root": {
            "base": "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full z-[199999] ",
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
            "base": "relative h-full w-full p-4 md:w-auto",
            "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-agua shadow dark:bg-gray-700"
        },
        "body": {
            "base": "flex-1 overflow-auto p-6",
            "popup": "pt-0"
        },
        "header": {
            "base": "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
            "popup": "border-b-0 p-2",
            "title": "text-xl font-medium text-white dark:text-white",
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
    }

    function handleError(error) {
        console.error("Error al iniciar sesión con Google: ", error);
    }

    return (
        <GoogleOAuthProvider clientId="529115021260-4lnijtikuumje6jkeo2i0pjiagn5i6o8.apps.googleusercontent.com">
            <Modal show={showModal} size="lg" onClose={toggleModal} theme={customtema} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-white text-center">Register in our plataform</h3>
                        <div>
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onFailure={handleError}
                                render={renderProps => (
                                    <Button onClick={renderProps.onClick} disabled={renderProps.disabled} className="w-full mt-4">
                                        <img src="https://i.ibb.co/8PtwPGS/image-removebg-preview.png" alt="Google" className="mr-2 h-6" />
                                        Register with Google
                                    </Button>
                                )}
                            />

                            <div className="text-white text-center mt-4 mb-4">or</div>
                        </div>

                        <div>
                            <TextInput
                                id="name"
                                type="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Name"
                                required
                            />
                        </div>

                        <div>
                            <TextInput
                                id="lastname"
                                type="lastname"
                                value={lastname}
                                onChange={(event) => setLastName(event.target.value)}
                                placeholder="Lastname"
                                required
                            />
                        </div>

                        <div>
                            <TextInput
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <TextInput
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>

                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" onChange={(event) => setIsCheckboxChecked(event.target.checked)} />
                                <Label className="text-white" htmlFor="remember">Confirmar Tratamiento de Datos</Label>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <Button onClick={handleRegisterClick} className="px-8">Register</Button>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-white mt-4">
                            Sign in?&nbsp;
                            <Link to={"#"}>
                                <a onClick={handleCreateAccountClick} className="text-cyan-700 hover:underline dark:text-cyan-500 ml-4">
                                    Sign in
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
        </GoogleOAuthProvider>
    );
}

ModalForm.propTypes = {
    showModal: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
};