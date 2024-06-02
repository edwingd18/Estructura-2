import { useState, useEffect } from 'react';
import { Card, Button } from 'flowbite-react';
import axios from 'axios';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { useLocation } from 'react-router-dom';
import ProgressLine from '../ProgressLine/ProgressLine.jsx';
import { Spinner } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

initMercadoPago('TEST-bf107dd8-2b1a-4fc1-a249-b816c7d45c2d', {
 locale: 'es-CO',
});

const getLocalStorageItem = (key) => window.localStorage.getItem(key)?.replace(/"/g, '')?.trim();

const ticketPrices = {
 general: 13550,
 preferencial: 20000,
};

const ShoppingCart = () => {
 const location = useLocation();
 const { selectedCombos } = location.state || {};

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
 const navigate = useNavigate();
 const [cartItems, setCartItems] = useState([]);


 const handleBuy = async () => {
  navigate('/paymant');
};

 const createPreference = async (total) => {
   try {
     const response = await axios.post("http://localhost:8000/api/payment/create_preference", {
       title: "Compra de boletas de cine",
       quantity: 1,
       total: total,
     });

     const { id } = response.data;
     return id;
   } catch (error) {
     console.log(error);
   }
 };

 useEffect(() => {
   const storedCombos = JSON.parse(window.localStorage.getItem('selectedCombos')) || [];
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
   if (selectedCombos && selectedCombos.length > 0) {
     selectedCombos.forEach(({ nombre, descripcion, precio }) => {
       const existingItemIndex = foodDetails.findIndex(item => item.combo === nombre);
       if (existingItemIndex !== -1) {
         foodDetails[existingItemIndex].quantity += 1;
       } else {
         foodDetails.push({
           combo: nombre,
           description: descripcion,
           price: precio,
           quantity: 1,
         });
       }
     });
   }

   const total = (ticketPrice * ticketQuantity) + foodDetails.reduce((acc, item) => acc + item.price * item.quantity, 0);
localStorage.setItem("total", total)
   const updateStateAndPreference = async () => {
     const preferenceId = await createPreference(total);
     setState(prevState => ({
       ...prevState,
       preferenceId: preferenceId,
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
   };

   updateStateAndPreference();

   setCartItems([
     ...storedCombos,
     ...foodDetails,
     {
       combo: `Boleta (${ticketType})`,
       description: `Película: ${movieName}, Fecha: ${formattedDate}, Sillas: ${formattedSeats}`,
       price: ticketPrice,
       quantity: ticketQuantity
     }
   ]);
 }, [selectedCombos]);

 useEffect(() => {
   return () => {
     window.localStorage.setItem('selectedCombos', JSON.stringify(cartItems));
   };
 }, [cartItems]);

 const handleRemoveItem = (index) => {
   const newCartItems = cartItems.filter((_, i) => i !== index);
   setCartItems(newCartItems);
 };

 const handleQuantityChange = (index, quantity) => {
   const newCartItems = cartItems.map((item, i) =>
     i === index ? { ...item, quantity } : item
   );
   setCartItems(newCartItems);
 };

 const calculateTotal = () => {
   return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
 };

 return (
   <div className="contenedor-select-comida">
     <div className="contenedor-select-comida font-title">
       <div>
         <ProgressLine step={4} />
       </div>
       <Card className="flex flex-col gap-4 p-4 w-[1000px]">
         <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
           Carrito de Compras
         </h5>
         <div className="border-b-2"></div>
         {cartItems.length === 0 ? (
           <div className="text-center">El carrito está vacío</div>
         ) : (
           cartItems.map((item, index) => (
             <div key={index} className="flex justify-between items-center">
               <div className="flex flex-col">
                 <span>{item.combo}</span>
                 <span className='text-lg font-bold'>{item.combo}</span>
                 <span>{item.description}</span>
                 <span>
                   Precio: {Number(item.price).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                 </span>
               </div>
               <div className="flex items-center">
                 <input
                   type="number"
                   min="1"
                   value={item.quantity}
                   onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                   className="w-12 text-center"
                 />
                 <Button onClick={() => handleRemoveItem(index)}
                 color="failure"
                 pill
                  className="ml-4 ">
                   Eliminar
                 </Button>
               </div>
             </div>
           ))
         )}
         <div className="flex justify-between items-center pt-4">
           <span className="text-lg font-bold">Total</span>
           <span className="text-lg font-bold hola">
             {calculateTotal().toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
           </span>
         </div>
         <div className="flex flex-col justify-center items-center pt-4">
           {state.preferenceId ? (
             <Button onClick={handleBuy} 
             color="blue" pill
             className='btn-pagar'>Pagar</Button>
           ) : (
             <Spinner aria-label="Default status example" />
           )}
         </div>
       </Card>
     </div>
   </div>
 );
};

export default ShoppingCart;