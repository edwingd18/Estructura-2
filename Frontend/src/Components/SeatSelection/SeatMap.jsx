import "./SeatMap.css";
import { FaTicketSimple } from "react-icons/fa6";
import { PiArmchairFill } from "react-icons/pi";
import { GiPopcorn } from "react-icons/gi";
import { HiCash } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "flowbite-react";
import ConfirmSeats from "../Modals/ConfirmSeats";

function SeatMap() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const columns = 12;

  const ticketQuantity = Number(window.localStorage.getItem('ticketQuantity'));

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
      window.localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats.filter(seat => seat !== seatId)));
    } else {
      if (selectedSeats.length < ticketQuantity) {
        setSelectedSeats([...selectedSeats, seatId]);
        window.localStorage.setItem('selectedSeats', JSON.stringify([...selectedSeats, seatId]));
      } else {
        setModalMessage('Ya has seleccionado el número máximo de asientos');
        setOpenModal(true);
        setIsError(true);
      }
    }
  };

  const handleNextClick = () => {
    if (selectedSeats.length === ticketQuantity) {
      navigate('/selectFood');
    } else {
      setModalMessage('Por favor, selecciona la cantidad correcta de asientos');
      setOpenModal(true);
      setIsError(true);
    }
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
            {rows.map((row) => (
              Array.from({ length: columns }, (_, j) => {
                const seatId = `${row}${j + 1}`;
                const isDisabledSeat = row === 'A' && j < 6;
                return (
                  <div
                    key={seatId}
                    className={`seat ${selectedSeats.includes(seatId) ? "selected" : ""} ${isDisabledSeat ? "disabled" : ""}`}
                    id={seatId}
                    onClick={() => handleSeatClick(seatId)}
                  >
                    {seatId}
                  </div>
                );
              })
            ))}
          </div>
        </div>

        <ConfirmSeats openModal={openModal} setOpenModal={setOpenModal} modalMessage={modalMessage} isError={isError} />

        <Button className="bg-black border border-whiter btn-Siguiente" onClick={handleNextClick}>
          Siguiente
        </Button>

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
