import { FaTicketSimple } from 'react-icons/fa6';
import { PiArmchairFill } from 'react-icons/pi';
import { GiPopcorn } from 'react-icons/gi';
import { HiCash } from 'react-icons/hi';
import './ProgressLine.css'; // Asegúrate de definir tus estilos CSS aquí

const ProgressLine = ({ step }) => {
  // Define un array con las clases de color según el estado del progreso
  const steps = [
    step >= 1 ? 'text-blue-800' : 'text-gray-400',
    step >= 2 ? 'text-blue-800' : 'text-gray-400',
    step >= 3 ? 'text-blue-800' : 'text-gray-400',
    step >= 4 ? 'text-blue-800' : 'text-gray-400',
  ];

  return (
    <div className="contenedor-iconos mt-14">
      <FaTicketSimple className={`icon-ticket-1 ${steps[0]}`} />
      <div className={`linea-separadora ${steps[1]}`} />
      <PiArmchairFill className={`icon-chair-1 ${steps[2]}`} />
      <div className={`linea-separadora ${steps[2]}`} />
      <GiPopcorn className={`icon-popcorn-1 ${steps[3]}`} />
      <div className={`linea-separadora ${steps[3]}`} />
      <HiCash className={`icon-cash-1 ${steps[3]}`} />
    </div>
  );
};

export default ProgressLine;
