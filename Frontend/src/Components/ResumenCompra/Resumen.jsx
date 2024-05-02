import { useState, useEffect } from 'react';
import { Card, Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const ResumenCompra = () => {
  const [Resumen, setResumen] = useState({
    movieName: '',
    date: '',
    ticketType: '',
    ticketQuantity: '',
    selectedSeats: [],
    foodDetails: [],
    total: ''
  });


  const navigate = useNavigate();


  useEffect(() => {
    const ticketQuantity = window.localStorage.getItem('ticketQuantity');
    const date = window.localStorage.getItem('date').replace(/"/g, '').trim();
    const movieName = window.localStorage.getItem('movieName').replace(/"/g, '').trim();
    const selectedSeats = JSON.parse(window.localStorage.getItem('selectedSeats'));
    const comboDescription = window.localStorage.getItem('comboDescripcion').replace(/"/g, '').trim();
    const ticketType = window.localStorage.getItem('ticketType').replace(/"/g, '').trim();
    const comboNombre = window.localStorage.getItem('comboNombre').replace(/"/g, '').trim();
    const comboPrecio = window.localStorage.getItem('comboPrecio');

    const movieDate = new Date(date);

    const day = String(movieDate.getDate()).padStart(2, '0');
    const month = String(movieDate.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript empiezan en 0, por lo que necesitas sumar 1
    const year = movieDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    console.log('Fecha:', formattedDate);

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
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold">{Resumen.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
            </div>
            <div className="flex justify-center pt-4">
              <Button onClick={() => navigate('/')}>Pagar</Button> {/* Agregar evento onClick */}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ResumenCompra;