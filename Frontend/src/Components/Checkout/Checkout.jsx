import './Checkout.css'
import Img from '../../assets/react.svg'
import { Button } from 'flowbite-react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios'
import { useState } from 'react';

const CheckOut = () => {
    const [preferenceId, setPreferenceId] = useState(null);

    initMercadoPago('YOUR_PUBLIC_KEY', {
        locale: 'es-CO'
    });

    const createPreference = async () => {
        try {
            const response = await axios.post('http://localhost:3000/create-order', {
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

    return (
        <>
            <div className="card-product-container">
                <div className="card-product">
                    <div className="card">
                        <img src={Img} alt="" />
                        <h3>Bananita contenta</h3>
                        <p className="price">100 $</p>
                        <Button className="bg-black border border-whiter hola">
                            Comprar
                        </Button>
                        <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>' }} customization={{ texts: { valueProp: 'smart_option' } }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckOut;