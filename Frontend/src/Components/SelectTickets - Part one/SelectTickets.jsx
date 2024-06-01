import './SelectTickets.css';
import { HiShoppingCart } from "react-icons/hi";
import { SelectChair, SelectChairPreferencial } from './SelectChair.jsx';
import { Button, Datepicker } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConfirmTickets from '../Modals/ConfirmTickets.jsx';
import ProgressLine from '../ProgressLine/ProgressLine.jsx';

// Función personalizada para agregar días a una fecha
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

function SelectTickets() {
    const [generalSelected, setGeneralSelected] = useState(0);
    const [preferencialSelected, setPreferencialSelected] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const today = new Date();
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

        localStorage.setItem('date', JSON.stringify(selectedDate));
        localStorage.setItem('ticketQuantity', JSON.stringify(ticketQuantity));
        localStorage.setItem('ticketType', JSON.stringify(ticketType));

        navigate('/selectSeat');
    };

    return (
        <div className="contenedor-select-tickets">
            <div className="contenedor-iconos">
                <ProgressLine step={1} />
            </div>
            <div className="contenedor-tickets ">
                <div className="contenedor-seleccionar class">
                    <div className="contenedor-fecha ">
                        <Datepicker className='datepicker object-right' minDate={today} maxDate={nextWeek} />
                    </div>
                    <div className="contenedor-sillas">

                        <div className='flex flex-row'>
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
                        </div>
                        <ConfirmTickets openModal={openModal} setOpenModal={setOpenModal} modalMessage={modalMessage} handleConfirm={handleConfirm} isError={isError} />
                        <Button className="bg-black border border-whiter object-right buttonComprar" onClick={handleContinue}>
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
