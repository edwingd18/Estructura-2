import './Checkout.css'
import Img from '../../assets/react.svg'
import { Button } from 'flowbite-react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useState } from 'react';

const CheckOut = () => {
    const [preferenceId, setPreferenceId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    initMercadoPago('TEST-303fc671-a790-4c0b-9ffd-889324f64c69', {
        locale: 'es-CO'
    });

    const createPreference = async () => {
        try {
            const response = await fetch('payment/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: 'Numero de silla',
                    quantity: 1,
                    price: 100,
                    currency_id: 'COP',
                }),
                auto_return: "approved",
            });

            const data = await response.json();

            return data.preferenceId;

        } catch (error) {
            console.log(error);
        }
    }

    const handleBuy = async () => {
        setLoading(true);
        try {
            const id = await createPreference();
            if (id) {
                setPreferenceId(id);
            }
        } catch (error) {
            setError('Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="card-product-container">
                <div className="card-product">
                    <div className="card">
                        <img src={Img} alt="" />
                        <h3>Bananita contenta</h3>
                        <p className="price">100 $</p>
                        <Button className="bg-black border border-whiter hola" onClick={handleBuy} disabled={loading}>
                            {loading ? 'Procesando...' : 'Comprar'}
                        </Button>
                        {error && <p>{error}</p>}
                        {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckOut;