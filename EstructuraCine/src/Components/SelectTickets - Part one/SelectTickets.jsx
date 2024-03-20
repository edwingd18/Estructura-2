import './SelectTickets.css';
import { FaTicketSimple } from "react-icons/fa6";
import { PiArmchairFill } from "react-icons/pi";
import { GiPopcorn } from "react-icons/gi";
import { HiCash } from "react-icons/hi";
import { SelectChair, SelectChairPreferencial } from './SelectChair.jsx';

function SelectTickets() {
    return (
        <div className="contenedor-select-tickets">
            <div className="contenedor-tickets">
                <div className="contenedor-iconos">
                    <FaTicketSimple className="icon-ticket" />
                    <div className="linea-separadora"></div>
                    <PiArmchairFill className="icon-chair" />
                    <div className="linea-separadora"></div>
                    <GiPopcorn className="icon-popcorn" />
                    <div className="linea-separadora"></div>
                    <HiCash className="icon-cash" />
                </div>
                <div className="contenedor-seleccionar">
                    <div className="contenedor-fecha">
                        <input type="date" name="" id="" />
                    </div>
                    <div className="contenedor-sillas">
                        <SelectChair
                            nombre="SILLA GENERAL"
                            precio='13.350'
                            nombreTipo="GENERAL"
                            imagen='general' />

                        <SelectChairPreferencial
                            nombre="SILLA PREFERENCIAL"
                            precio='20000'
                            nombreTipo="PREFERENCIAL"
                            imagen='preferencial' />

                        <button className='btn-Siguiente'>Siguiente</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SelectTickets;