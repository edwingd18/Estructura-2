import "./SeatMap.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmSeats from "../Modals/ConfirmSeats";
import ProgressLine from "../ProgressLine/ProgressLine.jsx";
import { motion } from 'framer-motion';


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
    fetch("/api/api/transaction/reservedSeats")
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
          <motion.button
                                    className="buttonComidaSiguiente sm:text-sm sm:flex-col sm:h-9 text-white md:text-xs md:h-auto md:py-1.5 lg:text-sm lg:py-2 2xl:text-lg 2xl:h-11 2xl:py-2  items-center bg-blue-800 border rounded-full border-whiter  h-11 w-91  hover:bg-white hover:text-black hover:border-black py-2 px-4"
                                    onClick={handleNextClick}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.1 }}
                                
          >
            Siguiente
          </motion.button>
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
