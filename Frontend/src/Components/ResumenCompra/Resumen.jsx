import React, { useState, useEffect } from 'react';
import { Card, Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const ResumenCompra = () => {
  const [Resumen, setResumen] = useState({
    movie: '',
    date: '',
    seat: '',
    foodDetails: [],
    total: ''
  });

  const navigate = useNavigate(); 
  useEffect(() => {
    // Aquí puedes reemplazar esto con la lógica para obtener tus datos de la fuente deseada
    const staticData = {
      movie: "The Batman",
      date: "2024-04-28 21:40:00",
      seat: "16A",
      foodDetails: [
        {
          combo: "Combo #1",
          details: "-1 Crispeta pequeña de sal 100g + 1 gaseosa mediana 350ml"
        },
        {
          combo: "Combo #2",
          details: "-2 Crispeta pequeña de sal 100g + 1 chocolatina jet pequeña"
        }
      ],
      total: "$22.000"
    };
    setResumen(staticData);
  }, []);

  return (
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
                <span>Película:</span>
                <span>Fecha:</span>
                <span>Silla:</span>
              </div>
              <div className="flex flex-col text-right">
                <span>{Resumen.movie}</span>
                <span>{Resumen.date}</span>
                <span>{Resumen.seat}</span>
              </div>
            </div>
          </div>
          <div>
            <h6 className="text-lg font-bold">Comida:</h6>
            {Resumen.foodDetails.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.combo}</span>
                <span>{item.details}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold">{Resumen.total}</span>
          </div>
          <div className="flex justify-center pt-4">
            <Button onClick={() => navigate('/allmovies')}>Cerrar</Button> {/* Agregar evento onClick */}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResumenCompra;