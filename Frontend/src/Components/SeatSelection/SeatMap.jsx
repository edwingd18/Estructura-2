import "./SeatMap.css";
import { FaTicketSimple } from "react-icons/fa6";
import { PiArmchairFill } from "react-icons/pi";
import { GiPopcorn } from "react-icons/gi";
import { HiCash } from "react-icons/hi";
import { useState } from "react";

function SeatMap() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const maxSeats = 5;

  const handleSeatClick = (seatId) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((id) => id !== seatId);
      } else {
        if (prevSelectedSeats.length < maxSeats) {
          return [...prevSelectedSeats, seatId];
        } else {
          return [...prevSelectedSeats.slice(1), seatId];
        }
      }
    });
  };

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
              <div
                key={i}
                className={`seat ${selectedSeats.includes(`seat${i + 1}`) ? "selected" : ""
                  }`}
                id={`seat${i + 1}`}
                onClick={() => handleSeatClick(`seat${i + 1}`)}
              ></div>
            ))}
          </div>
        </div>
        <button className="btn-Siguiente">Siguiente</button>
        <h1 id="AvailableSeatsText">Disponibles</h1>
        <div id="availableSeatMark"></div>
        <h1 id="SpecialSeatsText">Discapacitados</h1>
        <div id="SpecialSeatsMark"></div>
        <h1 id="SelectedSeatsText">Seleccionadas</h1>
        <div id="SelectedSeatsMark"></div>
        <h1 id="OcuSeatsText">Ocupadas</h1>
        <div id="OcuSeatsMark"></div>
      </div>
    </div>
  );
}

export default SeatMap;
