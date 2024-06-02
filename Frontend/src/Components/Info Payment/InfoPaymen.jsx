import { FaCheckCircle } from "react-icons/fa";
import './InfoPayment.css';
import PropTypes from 'prop-types';

export const InfoPayment = () => {
    return (
        <>
            <div className="background">
                <div className="card-info">
                    <div className="top-card">
                        <div className="icon-ima    ge">
                            <div className="icon-check">
                                <FaCheckCircle />
                            </div>
                        </div>
                        <div className="info-top-page">
                            <h3 className="info-page">Su pago se ha realizado de manera exitosa</h3>
                        </div>
                    </div>
                    <div className="card-info-page">
                        <div className="info">
                            <h2>Numero de orden:</h2>
                            <h3>321231</h3>
                        </div>
                        <div className="info">
                            <h2>ID Organización:</h2>
                            <h3>CO-MERCADOPAGO</h3>
                        </div>
                        <div className="info">
                            <h2>Nombre de Compra:</h2>
                            <h3>Boletas de CineCalidad</h3>
                        </div>
                        <div className="info-p">
                            <h3>Sus boletas serán enviadas por el correo</h3>
                            <h3>en los proximos 5 minutos.</h3>
                        </div>
                        <div className="button-div">
                            <button type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Volver al Inicio</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
};

InfoPayment.propTypes = {
    showModal: PropTypes.bool,
    toggleModal: PropTypes.func
};
