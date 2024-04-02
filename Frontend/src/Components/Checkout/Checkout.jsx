import './Checkout.css'
import Img from '../../assets/react.svg'
import { Button } from 'flowbite-react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios'
import { useState } from 'react';

const CheckOut = () => {
    const [preferenceId, setPreferenceId] = useState(null);

    initMercadoPago('TEST-303fc671-a790-4c0b-9ffd-889324f64c69', {
        locale: 'es-CO'
    });

    const createPreference = async () => {
        try {
            const response = await axios.post('http://localhost:8000/payment/create-order', {
                title: "Bananita contenta",
                quantity: 1,
                price: 100,
            });
            const { id } = response.data;
            return id;
        } catch (error) {
            console.log(error);
        }
    }

    const handleBuy = async () => {
        const id = await createPreference();
        if (id) {
            setPreferenceId(id)
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
                        <Button className="bg-black border border-whiter hola" onClick={handleBuy}>
                            Comprar
                        </Button>
                        {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckOut;