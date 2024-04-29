import './Food.css';
// import { Button } from 'flowbite-react';
import { FaTicketSimple } from "react-icons/fa6";
import { PiArmchairFill } from "react-icons/pi";
import { GiPopcorn } from "react-icons/gi";
import { HiCash } from "react-icons/hi";
import Combos from './Combos';
import { Button } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import ConfirmFood from '../Modals/ConfirmFood';
import { useState } from 'react';
import ConfirmTickets from '../Modals/ConfirmTickets';

function Food() {
    const [modalMessage, setModalMessage] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedCombo, setSelectedCombo] = useState(null);
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const handleComboClick = (nombre, precio) => {
        setSelectedCombo({ nombre, precio });
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
        }
        setOpenModal(false);
        navigate('/checkout');
    };

    const handleNextClick = () => {
        if (!window.localStorage.getItem('comboNombre')) {
            setModalMessage('No has seleccionado un combo. ¿Deseas continuar de todos modos?');
            setOpenModal(true);
            setIsError(false);
        } else {
            navigate('/checkout');
        }
    };

    const handleClearSelection = () => {
        setModalMessage('Se ha borrado la selección de combo.');
        setOpenModal(true);
        setIsError(true);
        window.localStorage.removeItem('comboNombre');
        window.localStorage.removeItem('comboPrecio');
    };

    return (
        < div className="contenedor-select-comida" >
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
                    <div className="contenedor-seleccionar-combo">
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={3.5}
                            centeredSlides={false}
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            style={{ width: '1000px', height: '327px' }}
                        >
                            <SwiperSlide>
                                <Combos
                                    nombre={'Combo 1'}
                                    descripcion={'1 Crispetas mediana de sal o caramelo 250 g'}
                                    precio={'20.000'}
                                    seleccionado={handleComboClick} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Combos
                                    nombre={'Combo 2'}
                                    descripcion={'2 Crispetas mediana de sal o caramelo 250 g'}
                                    precio={'35.000'}
                                    seleccionado={handleComboClick} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Combos
                                    nombre={'Combo 3'}
                                    descripcion={'3 Crispetas mediana de sal o caramelo 250 g'}
                                    precio={'50.000'}
                                    seleccionado={handleComboClick} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Combos
                                    nombre={'Combo 4'}
                                    descripcion={'4 Crispetas mediana de sal o caramelo 250 g'}
                                    precio={'60.000'}
                                    seleccionado={handleComboClick} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Combos
                                    nombre={'Combo 5'}
                                    descripcion={'5 Crispetas mediana de sal o caramelo 250 g'}
                                    precio={'70.000'}
                                    seleccionado={handleComboClick} />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="buttons-food">
                        <Button className="bg-black border border-whiter buttonComidaSiguiente" onClick={handleNextClick}>
                            Siguiente
                        </Button>
                        <Button className="bg-black border border-whiter buttonComidaSiguiente" onClick={handleClearSelection}>
                            Borrar selección
                        </Button>
                    </div>

                    <ConfirmFood openModal={openModal} setOpenModal={setOpenModal} modalMessage={modalMessage} handleConfirm={handleConfirm} isError={isError} />
                </div>
            </div>
        </div >
    )
}

export default Food;