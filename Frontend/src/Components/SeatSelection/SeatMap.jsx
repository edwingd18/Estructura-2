import "./SeatMap.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import ConfirmSeats from "../Modals/ConfirmSeats";
import ProgressLine from "../ProgressLine/ProgressLine.jsx";

function SeatMap() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [reservedSeats, setReservedSeats] = useState([]); // Nuevo estado para asientos reservados

  const navigate = useNavigate();

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const columns = 12;

  const ticketQuantity = Number(window.localStorage.getItem("ticketQuantity"));

  useEffect(() => {
    // Aquí debes cargar los asientos reservados desde tu servidor o base de datos
    // Por ahora, solo lo inicializaremos con un array vacío
    setReservedSeats([]);
  }, []);

  const handleSeatClick = (seatId) => {
    if (reservedSeats.includes(seatId)) {
      // Si el asiento ya está reservado, no permitas que se seleccione
      setModalMessage("Este asiento ya está reservado");
      setOpenModal(true);
      setIsError(true);
    } else if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
      window.localStorage.setItem(
        "selectedSeats",
        JSON.stringify(selectedSeats.filter((seat) => seat !== seatId))
      );
    } else {
      if (selectedSeats.length < ticketQuantity) {
        setSelectedSeats([...selectedSeats, seatId]);
        window.localStorage.setItem(
          "selectedSeats",
          JSON.stringify([...selectedSeats, seatId])
        );
      } else {
        setModalMessage("Ya has seleccionado el número máximo de asientos");
        setOpenModal(true);
        setIsError(true);
      }
    }
  };

  const handleNextClick = () => {
    if (selectedSeats.length === ticketQuantity) {
      navigate("/selectFood");
    } else {
      setModalMessage("Por favor, selecciona la cantidad correcta de asientos");
      setOpenModal(true);
      setIsError(true);
    }
  };

  return (
    <div className="SeatMapWholeContainer">
      <div className="contenedor-iconos">
        <ProgressLine step={2} />
      </div>
      <div className="SeatMapContainerxd">
        <div className="SeatMapContainer">
          <div className="SeatMap">
            <div className="screen">
              <h1>Pantalla</h1>
            </div>
            <div className="seats">
              {rows.map((row) =>
                Array.from({ length: columns }, (_, j) => {
                  const seatId = `${row}${j + 1}`;
                  const isDisabledSeat = row === "A" && j < 6;
                  const isReservedSeat = reservedSeats.includes(seatId); // Verifica si el asiento está reservado
                  return (
                    <div
                      key={seatId}
                      className={`seat ${
                        selectedSeats.includes(seatId) ? "selected" : ""
                      } ${isDisabledSeat || isReservedSeat ? "disabled" : ""}`}
                      id={seatId}
                      onClick={() => handleSeatClick(seatId)}
                    >
                      {seatId}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="seatTypes">
            <div className="seatType">
              <div className="seatMark available"></div>
              <span>Disponibles</span>
            </div>
            <div className="seatType">
              <div className="seatMark disabled"></div>
              <span>Discapacitados</span>
            </div>
            <div className="seatType">
              <div className="seatMark selected"></div>
              <span>Seleccionadas</span>
            </div>
            <div className="seatType">
              <div className="seatMark occupied"></div>
              <span>Ocupadas</span>
            </div>
          </div>
        </div>
        <div className="buttonContainer">
          <Button
            className="bg-black border border-whiter btn-Siguiente"
            onClick={handleNextClick}
          >
            Siguiente
          </Button>
        </div>
      </div>
      <ConfirmSeats
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalMessage={modalMessage}
        isError={isError}
      />
    </div>
  );
}

export default SeatMap;
