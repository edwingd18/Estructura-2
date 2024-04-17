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

function SelectTickets() {

    const navigate = useNavigate();

    // Fecha actual
    const today = new Date();

    // Fecha 7 días después de la fecha actual
    const nextWeek = addDays(today, 7);

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
                            imagen='general' />

                        <SelectChairPreferencial
                            nombre="SILLA PREFERENCIAL"
                            precio='20,000'
                            nombreTipo="PREFERENCIAL"
                            imagen='preferencial' />

                        <Button className="bg-black border border-whiter buttonComprar" onClick={() => navigate('/selectSeat')}>
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