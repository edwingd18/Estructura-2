import { useState, useEffect } from 'react';
import { Card, Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

initMercadoPago('TEST-bf107dd8-2b1a-4fc1-a249-b816c7d45c2d', {
  locale: 'es-CO',
});

const getLocalStorageItem = (key) => window.localStorage.getItem(key).replace(/"/g, '').trim();

const ticketPrices = {
  general: 13550,
  preferencial: 20000,
};

const ResumenCompra = () => {
  const [state, setState] = useState({
    preferenceId: null,
    resumen: {
      movieName: '',
      date: '',
      ticketType: '',
      ticketQuantity: '',
      selectedSeats: [],
      foodDetails: [],
      boletas: '',
      total: ''
    }
  });

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setState(prevState => ({ ...prevState, preferenceId: id }));
    }
  };

  useEffect(() => {
    const comboNombre = getLocalStorageItem('comboNombre');
    const comboPrecio = getLocalStorageItem('comboPrecio');
    const comboDescription = getLocalStorageItem('comboDescripcion');

    const ticketQuantity = Number(window.localStorage.getItem('ticketQuantity'));
    const date = getLocalStorageItem('date');
    const movieName = getLocalStorageItem('movieName');
    const selectedSeats = JSON.parse(window.localStorage.getItem('selectedSeats'));
    const ticketType = getLocalStorageItem('ticketType');

    const movieDate = new Date(date);

    const day = String(movieDate.getDate()).padStart(2, '0');
    const month = String(movieDate.getMonth() + 1).padStart(2, '0');
    const year = movieDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    const ticketPrice = ticketPrices[ticketType] || 0;

    const formattedSeats = selectedSeats.join(', ');

    let foodDetails = [];
    let comboPrecioNumber = 0;

    if (comboNombre !== 'Sin combo') {
      foodDetails = [
        {
          combo: comboNombre,
          description: comboDescription,
          price: comboPrecio
        }
      ];
      comboPrecioNumber = Number(comboPrecio);
    }

    const total = (ticketPrice * ticketQuantity) + comboPrecioNumber;

    setState(prevState => ({
      ...prevState,
      resumen: {
        movieName: movieName,
        date: formattedDate,
        ticketType: ticketType,
        ticketQuantity: ticketQuantity,
        selectedSeats: formattedSeats,
        foodDetails: foodDetails,
        boletas: ticketPrice * ticketQuantity,
        total: total
      }
    }));
  }, []);

  const createPreference = async () => {
    try {
      const { resumen } = state;
      const response = await axios.post("http://localhost:8000/api/payment/create_preference", {
        title: resumen.movieName,
        quantity: resumen.ticketQuantity,
        total: resumen.total,
      });

      const { id } = response.data;
      return id;

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <Card>
          <div className="flex flex-col gap-4 p-4">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Cine Magic
            </h5>
            <div className="border-b-2"></div>
            <div>
              <h6 className="text-lg font-bold text-center">Detalle de compra</h6>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span>Película: </span>
                  <span>Fecha: </span>
                  <span>Tipo de Boleta: </span>
                  <span>Cantidad de Boletas: </span>
                  <span>Sillas: </span>
                </div>
                <div className="flex flex-col text-right">
                  <span>{state.resumen.movieName}</span>
                  <span>{state.resumen.date}</span>
                  <span>{state.resumen.ticketType}</span>
                  <span>{state.resumen.ticketQuantity}</span>
                  <span>{state.resumen.selectedSeats}</span>
                </div>
              </div>
            </div>
            <div>
              <h6 className="text-lg font-bold">Comida:</h6>
              {state.resumen.foodDetails.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div>{item.combo}</div>
                  <div>{item.description}</div>
                  <div>Precio del Combo: {Number(item.price).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="text-lg font-bold">Precio boletas</span>
              <span className="text-lg font-bold">{state.resumen.boletas.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold">{state.resumen.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
            </div>

            <div className="flex flex-col justify-center items-center pt-4">
              <Button onClick={handleBuy} className='btn-pagar'>Pagar</Button>
              {state.preferenceId && <Wallet initialization={{ preferenceId: state.preferenceId }} />}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ResumenCompra;