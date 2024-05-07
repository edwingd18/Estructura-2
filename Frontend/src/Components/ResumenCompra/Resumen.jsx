import { useState, useEffect } from 'react';
import { Card, Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'


const ResumenCompra = () => {

  const [preferenceId, setPreferenceId] = useState(null)

  initMercadoPago('TEST-bf107dd8-2b1a-4fc1-a249-b816c7d45c2d', {
    locale: 'es-CO',

  });

  const [Resumen, setResumen] = useState({
    movieName: '',
    date: '',
    ticketType: '',
    ticketQuantity: '',
    selectedSeats: [],
    foodDetails: [],
    boletas: '',
    total: ''
  });

  const createPreference = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/payment/create_preference", {
        title: "Compra de boletas de cine",
        quantity: 1,
        total: 10000,
      });

      const { id } = response.data;
      return id;

    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const ticketQuantity = window.localStorage.getItem('ticketQuantity');
    const date = window.localStorage.getItem('date').replace(/"/g, '').trim();
    const movieName = window.localStorage.getItem('movieName').replace(/"/g, '').trim();
    const selectedSeats = JSON.parse(window.localStorage.getItem('selectedSeats'));
    const comboDescription = window.localStorage.getItem('comboDescripcion').replace(/"/g, '').trim();
    const ticketType = window.localStorage.getItem('ticketType').replace(/"/g, '').trim();
    const comboNombre = window.localStorage.getItem('comboNombre').replace(/"/g, '').trim();
    const comboPrecio = window.localStorage.getItem('comboPrecio').replace(/"/g, '').trim();

    const movieDate = new Date(date);

    const day = String(movieDate.getDate()).padStart(2, '0');
    const month = String(movieDate.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript empiezan en 0, por lo que necesitas sumar 1
    const year = movieDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    let ticketPrice = 0;

    if (ticketType === 'general') {
      ticketPrice = 13550;
    } else if (ticketType === 'preferencial') {
      ticketPrice = 20000;
    }

    const formattedSeats = selectedSeats.join(', ');

    const total = (ticketPrice * ticketQuantity) + Number(comboPrecio);

    setResumen({
      movieName: movieName,
      date: formattedDate,
      ticketType: ticketType,
      ticketQuantity: ticketQuantity,
      selectedSeats: formattedSeats,
      foodDetails: [
        {
          combo: comboNombre,
          description: comboDescription,
          price: comboPrecio
        }
      ],
      boletas: ticketPrice * ticketQuantity,
      total: total
    });
  }, []);

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
                  <span>{Resumen.movieName}</span>
                  <span>{Resumen.date}</span>
                  <span>{Resumen.ticketType}</span>
                  <span>{Resumen.ticketQuantity}</span>
                  <span>{Resumen.selectedSeats}</span>
                </div>
              </div>
            </div>
            <div>
              <h6 className="text-lg font-bold">Comida:</h6>
              {Resumen.foodDetails.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div>{item.combo}</div>
                  <div>{item.description}</div>
                  <div>Precio del Combo: {Number(item.price).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="text-lg font-bold">Precio boletas</span>
              <span className="text-lg font-bold">{Resumen.boletas.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold">{Resumen.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
            </div>

            <div className="flex flex-col justify-center items-center pt-4">
              <Button onClick={handleBuy} className='btn-pagar'>Pagar</Button>
              {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ResumenCompra;