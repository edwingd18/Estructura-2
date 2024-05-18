// Food.js
import { useState, useEffect } from 'react';
import './Food.css';
import { FaTicketSimple } from "react-icons/fa6";
import { PiArmchairFill } from "react-icons/pi";
import { GiPopcorn } from "react-icons/gi";
import { HiCash } from "react-icons/hi";
import Combos from './Combos';
import { motion } from 'framer-motion'; // Importa motion desde framer-motion
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import ConfirmFood from '../Modals/ConfirmFood';

function Food() {
  const [combos, setCombos] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/allCombos')
      .then(response => response.json())
      .then(data => {
        setCombos(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching combos:', error);
        setIsLoading(false);
      });
  }, []);

  const handleComboClick = (nombre, descripcion, precio) => {
    setSelectedCombo({ nombre, descripcion, precio });
    setModalMessage(`Has seleccionado el ${nombre} por un valor de ${precio}. ¿Deseas continuar o editar tu selección?`);
    setOpenModal(true);
    setIsError(false);
  };

  const handleConfirm = () => {
    if (modalMessage === 'No has seleccionado un combo. ¿Deseas continuar de todos modos?') {
      window.localStorage.setItem('comboNombre', 'Sin combo');
    } else {
      window.localStorage.setItem('comboNombre', selectedCombo.nombre);
      window.localStorage.setItem('comboPrecio', selectedCombo.precio);
      window.localStorage.setItem('comboDescripcion', selectedCombo.descripcion)
    }
    setOpenModal(false);
    navigate('/purchase-summary');
  };

  const handleNextClick = () => {
    if (!window.localStorage.getItem('comboNombre')) {
      setModalMessage('No has seleccionado un combo. ¿Deseas continuar de todos modos?');
      setOpenModal(true);
      setIsError(false);
    } else {
      navigate('/purchase-summary');
    }
  };

  const handleClearSelection = () => {
    setModalMessage('Se ha borrado la selección de combo.');
    setOpenModal(true);
    setIsError(true);
    window.localStorage.removeItem('comboNombre');
    window.localStorage.removeItem('comboPrecio');
    window.localStorage.removeItem('comboDescripcion');
  };

  return (
    <div className="contenedor-select-comida">
      <div className="contenedor-comida">
        <div className="contenedor-iconos">
          <FaTicketSimple className="icon-ticket" />
          <div className="linea-separadora"></div>
          <PiArmchairFill className="icon-chair " />
          <div className="linea-separadora"></div>
          <GiPopcorn className="icon-popcorn" />
          <div className="linea-separadora"></div>
          <HiCash className="icon-cash" />
        </div>
        <div className="contenedor-splide">
        <motion.div
  className="contenedor-seleccionar-combo"
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    duration: 1,
    delay: 0.5,
    ease: [0, 0.71, 0.2, 1.01]
  }}
>
            {isLoading ? (
              <div>Cargando combos...</div>
            ) : (
              <Swiper
                spaceBetween={20}
                slidesPerView={3.5}
                centeredSlides={false}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                style={{ width: '1300px', height: '487px' }}
              >
                {combos.map((combo, index) => (
                  <SwiperSlide key={index}>
                    <Combos
                    
                    img={combo.imageUrl}
                      nombre={combo.title}
                      descripcion={combo.description}
                      precio={combo.price}
                      seleccionado={handleComboClick}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
        </motion.div>
          <motion.div
  className="buttons-food"
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    duration: 0.5,
    delay: 1,
    ease: [0, 0.71, 0.2, 1.01]
  }}
>
  <motion.button
    className="buttonComidaSiguiente sm:text-sm sm:flex-col sm:h-9 text-white md:text-xs md:h-auto md:py-1.5 lg:text-sm lg:py-2 2xl:text-lg 2xl:h-11 2xl:py-2  items-center bg-blue-800 border rounded-full border-whiter  h-11 w-91  hover:bg-white hover:text-black hover:border-black py-2 px-4"
    onClick={handleNextClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    transition={{ duration: 0.2 }}
  >
    Siguiente
  </motion.button>
  <motion.button
    className="sm:text-sm sm:flex-col sm:h-9 text-white md:text-xs md:h-auto md:py-1.5 lg:text-sm lg:py-2 2xl:text-lg 2xl:h-11 2xl:py-2  items-center bg-red-800 border rounded-full border-white h-11 w-91  hover:bg-white hover:text-black hover:border-black py-2 px-4 buttonComidaSiguiente"
    onClick={handleClearSelection}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    transition={{ duration: 0.2 }}
  >
    Borrar selección
  </motion.button>
</motion.div>
         


          <ConfirmFood openModal={openModal} setOpenModal={setOpenModal} modalMessage={modalMessage} handleConfirm={handleConfirm} isError={isError} />
        </div>
      </div>
    </div>
  );
}

export default Food;