import './Food.css';
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

function Food() {
    const [modalMessage, setModalMessage] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedCombo, setSelectedCombo] = useState(null);
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const handleComboClick = (nombre, descripcion, precio) => {
        setSelectedCombo({ nombre, descripcion, precio });
        setModalMessage(`Has seleccionado el ${nombre} por un valor de ${precio}. ¿Deseas continuar o editar tu selección?`);
        setOpenModal(true);
        setIsError(false);
    };

    const handleLocalStorage = (nombre = 'Sin combo', precio = '0', descripcion = 'Sin combo') => {
        window.localStorage.setItem('comboNombre', nombre);
        window.localStorage.setItem('comboPrecio', precio);
        window.localStorage.setItem('comboDescripcion', descripcion);
    };

    const handleConfirm = () => {
        if (modalMessage === 'No has seleccionado un combo. ¿Deseas continuar de todos modos?') {
            handleLocalStorage();
        } else {
            handleLocalStorage(selectedCombo.nombre, selectedCombo.precio, selectedCombo.descripcion);
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
        handleLocalStorage();
    };

    const combos = [
        { nombre: 'Combo 1', descripcion: '1 Crispetas mediana de sal o caramelo 250 g', precio: '20000' },
        { nombre: 'Combo 2', descripcion: '2 Crispetas mediana de sal o caramelo 250 g', precio: '35000' },
        { nombre: 'Combo 3', descripcion: '3 Crispetas mediana de sal o caramelo 250 g', precio: '50000' },
        { nombre: 'Combo 4', descripcion: '4 Crispetas mediana de sal o caramelo 250 g', precio: '60000' },
        { nombre: 'Combo 5', descripcion: '5 Crispetas mediana de sal o caramelo 250 g', precio: '70000' },
    ];

    const renderSwiperSlides = () => {
        return combos.map((combo, index) => (
            <SwiperSlide key={index}>
                <Combos
                    nombre={combo.nombre}
                    descripcion={combo.descripcion}
                    precio={combo.precio}
                    seleccionado={handleComboClick} />
            </SwiperSlide>
        ));
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
                    <div className="contenedor-seleccionar-combo">
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={3.5}
                            centeredSlides={false}
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            style={{ width: '1000px', height: '327px' }}
                        >
                            {renderSwiperSlides()}
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
        </div>
    )
}

export default Food;