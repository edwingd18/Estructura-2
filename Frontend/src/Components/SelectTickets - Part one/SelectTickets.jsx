import './SelectTickets.css';
import { FaTicketSimple } from "react-icons/fa6";
import { PiArmchairFill } from "react-icons/pi";
import { GiPopcorn } from "react-icons/gi";
import { HiCash } from "react-icons/hi";
import { SelectChair, SelectChairPreferencial } from './SelectChair.jsx';
import { Button, Datepicker } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { addDays } from 'flowbite-react/lib/esm/components/Datepicker/helpers.js';
import { HiShoppingCart } from "react-icons/hi";
import { useState } from 'react';
import ConfirmTickets from '../Modals/ConfirmTickets.jsx';

function SelectTickets() {
    const [generalSelected, setGeneralSelected] = useState(0);
    const [preferencialSelected, setPreferencialSelected] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    // Fecha actual
    const today = new Date();

    // Fecha 7 días después de la fecha actual
    const nextWeek = addDays(today, 7);

    const handleContinue = () => {
        let isError = false;
        if (generalSelected > 0 && preferencialSelected > 0) {
            setModalMessage('Solo puedes comprar un tipo de boleta a la vez.');
            setOpenModal(true);
            isError = true;
        } else if (generalSelected > 0 || preferencialSelected > 0) {
            const ticketType = generalSelected > 0 ? 'general' : 'preferencial';
            const ticketQuantity = generalSelected > 0 ? generalSelected : preferencialSelected;

            setModalMessage(`Has seleccionado ${ticketQuantity} boletas de tipo ${ticketType}. ¿Deseas continuar o editar tu selección?`);
            setOpenModal(true);
        } else {
            setModalMessage('Por favor selecciona al menos una boleta.');
            setOpenModal(true);
            isError = true;
        }

        setIsError(isError);
    };

    const handleConfirm = () => {
        const ticketType = generalSelected > 0 ? 'general' : 'preferencial';
        const ticketQuantity = generalSelected > 0 ? generalSelected : preferencialSelected;

        // Guardar la fecha seleccionada, la cantidad de boletas y el tipo de boleta en localStorage
        localStorage.setItem('date', JSON.stringify(selectedDate));
        localStorage.setItem('ticketQuantity', JSON.stringify(ticketQuantity));
        localStorage.setItem('ticketType', JSON.stringify(ticketType));

        // Navegar a la siguiente página
        navigate('/selectSeat');
    };

    return (
        <div className="contenedor-select-tickets">
            <div className="contenedor-tickets">
                <div className="contenedor-iconos">
                    <FaTicketSimple className="icon-ticket-1" />
                    <div className="linea-separadora"></div>
                    <PiArmchairFill className="icon-chair-1" />
                    <div className="linea-separadora"></div>
                    <GiPopcorn className="icon-popcorn-1" />
                    <div className="linea-separadora"></div>
                    <HiCash className="icon-cash-1" />
                </div>
                <div className="contenedor-seleccionar">
                    <div className="contenedor-fecha">
                        <Datepicker className='datepicker' minDate={today} maxDate={nextWeek} />
                    </div>
                    <div className="contenedor-sillas">
                        <SelectChair
                            nombre="SILLA GENERAL"
                            precio='13,350'
                            nombreTipo="GENERAL"
                            imagen='general'
                            setSelected={setGeneralSelected}
                        />

                        <SelectChairPreferencial
                            nombre="SILLA PREFERENCIAL"
                            precio='20,000'
                            nombreTipo="PREFERENCIAL"
                            imagen='preferencial'
                            setSelected={setPreferencialSelected}
                        />

                        <ConfirmTickets openModal={openModal} setOpenModal={setOpenModal} modalMessage={modalMessage} handleConfirm={handleConfirm} isError={isError} />

                        <Button className="bg-black border border-whiter buttonComprar" onClick={handleContinue}>
                            <HiShoppingCart className="mr-2 h-5 w-5" />
                            Siguiente
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SelectTickets;