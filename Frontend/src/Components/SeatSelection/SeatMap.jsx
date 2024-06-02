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
  const [reservedSeats, setReservedSeats] = useState([]);

  const navigate = useNavigate();

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const columns = 12;

  useEffect(() => {
    fetch("http://localhost:8000/api/transaction/reservedSeats")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setReservedSeats(data);
        } else {
          console.error('API response is not an array');
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const ticketQuantity = Number(window.localStorage.getItem("ticketQuantity"));

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
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
                  const isDisabledSeat = row === "A" && j < 8;
                  return (
                    <div
                      key={seatId}
                      className={`seat ${
                        selectedSeats.includes(seatId) ? "selected" : ""
                      } ${isDisabledSeat ? "disabled" : ""} ${
                        reservedSeats.includes(seatId) ? "reserved" : ""
                      }`}
                      id={seatId}
                      onClick={() =>
                        !reservedSeats.includes(seatId) &&
                        handleSeatClick(seatId)
                      }
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
