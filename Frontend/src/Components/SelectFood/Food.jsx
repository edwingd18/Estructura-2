import { useState, useEffect } from 'react';
import './Food.css';
import { motion } from 'framer-motion';
import ProgressLine from '../ProgressLine/ProgressLine.jsx';
import Combos from './Combos';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import ConfirmFood from '../Modals/ConfirmFood';

function Food() {
  const [combos, setCombos] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedCombos, setSelectedCombos] = useState([]); // Estado para almacenar los combos seleccionados
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedCombos = JSON.parse(window.localStorage.getItem('selectedCombos')) || [];
    setSelectedCombos(storedCombos);

    fetch('/api/api/allCombos')
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

  useEffect(() => {
    return () => {
      window.localStorage.setItem('selectedCombos', JSON.stringify(selectedCombos));
    };
  }, [selectedCombos]);

  const handleComboClick = (nombre, descripcion, precio) => {
    setSelectedCombos(prevSelectedCombos => [...prevSelectedCombos, { nombre, descripcion, precio }]); // Agregar combo al arreglo selectedCombos
  };

  const handleConfirm = () => {
    setOpenModal(false);
    navigate('/purchase-summary', { state: { selectedCombos } });
  };

  const handleNextClick = () => {
    if (selectedCombos.length === 0) {
      setModalMessage('No has seleccionado un combo. ¿Deseas continuar de todos modos?');
      setOpenModal(true);
      setIsError(false);
    } else {
      setModalMessage(`Has seleccionado ${selectedCombos.length} combo(s). ¿Deseas continuar o editar tu selección?`);
      setOpenModal(true);
      setIsError(false);
    }
  };

  const handleClearSelection = () => {
    setSelectedCombos([]); // Limpiar el arreglo selectedCombos
    setModalMessage('Se ha borrado la selección de combo(s).');
    setOpenModal(true);
    setIsError(true);
  };


   return (
        <div className="contenedor-select-comida">
            <div

            >
                <ProgressLine step={3} />
            </div>
            <div className="contenedor-comida">
                <div className="contenedor-splide">
                    <motion.div
                        className="contenedor-seleccionar-combo"
                        initial={{ opacity: 0, scale: 2 }}
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
                                slidesPerView={3.2}
                                centeredSlides={false}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                style={{ width: '900px', height: '380px' }}
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
                        <Button
                            className=" buttonComidaSiguiente"
                            color="failure" pill
                            onClick={handleClearSelection}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            Borrar
                        </Button>
                        <Button
                            className="buttonComidaSiguiente "
                            
                            onClick={handleNextClick}
                            color="blue" pill
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            Siguiente
                        </Button>
                    </motion.div>
                    <ConfirmFood openModal={openModal} setOpenModal={setOpenModal} modalMessage={modalMessage} handleConfirm={handleConfirm} isError={isError} />
                    </motion.div>

                </div>
            </div>
        </div>
    );
}

export default Food;