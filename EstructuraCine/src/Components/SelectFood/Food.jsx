import './Food.css';
// import { Button } from 'flowbite-react';
import { FaTicketSimple } from "react-icons/fa6";
import { PiArmchairFill } from "react-icons/pi";
import { GiPopcorn } from "react-icons/gi";
import { HiCash } from "react-icons/hi";


function Food() {
    return (
        <div className="contenedor-select-comida">
            <div className="contenedor-comida">
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
                    <h1>Menu</h1>
                </div>
            </div>
        </div>
    )
}

export default Food;