import "./SeatMap.css";
import { FaTicketSimple } from "react-icons/fa6";
import { PiArmchairFill } from "react-icons/pi";
import { GiPopcorn } from "react-icons/gi";
import { HiCash } from "react-icons/hi";

function seatMap() {
  return (
    <div className="SeatMapWholeContainer">
      <div className="SeatMapContainer">
        <div className="contenedor-iconos">
          <FaTicketSimple className="icon-ticket" />
          <div className="linea-separadora"></div>
          <PiArmchairFill className="icon-chair" />
          <div className="linea-separadora"></div>
          <GiPopcorn className="icon-popcorn" />
          <div className="linea-separadora"></div>
          <HiCash className="icon-cash" />
        </div>

        <div className="SeatMap">
          <div className="screen">
            <h1>Pantalla</h1>
          </div>
          <div className="seats">
            {Array.from({ length: 90 }, (_, i) => (
              <div key={i} className="seat" id={`seat${i + 1}`}></div>
            ))}
          </div>
        </div>
        <button className='btn-Siguiente'>Siguiente</button>
      </div>
    </div>
  );
}

export default seatMap;
