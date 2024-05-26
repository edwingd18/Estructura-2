import { motion } from 'framer-motion';
import { MdOutlineEventSeat } from "react-icons/md";
import { PiPopcorn } from "react-icons/pi";
import { HiOutlineCash,HiOutlineTicket } from 'react-icons/hi';
import './ProgressLine.css';

const ProgressLine = ({ step }) => {
  const steps = [
    step >= 1 ? 'text-red-600' : 'text-black',
    step >= 2 ? 'text-red-600' : 'text-black',
    step >= 3 ? 'text-red-600' : 'text-black',
    step >= 4 ? 'text-red-600' : 'text-black',

  ];


  const lineVariants = {
    initial: { width: 0 },
    animate: { width: '270px', transition: { duration: 0.2 } },
  };

  return (
    
    <div className="contenedor-iconos flex items-center content-center bottom-[20px] mb-5 mt-14 bg-white w-[1020px] h-[30px] justify-center rounded-xl">
      <HiOutlineTicket className={`icon-ticket-1 ${steps[0]}`} />
      <motion.div
        className={`linea-separadora ${steps[1]}`}
        variants={lineVariants}
        initial="initial"
        animate={step >= 2 ? "animate" : "initial"}
      />
      <MdOutlineEventSeat className={`icon-chair-1 ${steps[2]}`} />
      <motion.div
        className={`linea-separadora ${steps[2]}`}
        variants={lineVariants}
        initial="initial"
        animate={step >= 3 ? "animate" : "initial"}
      />
      <PiPopcorn className={`icon-popcorn-1 ${steps[3]}`} />
      <motion.div
        className={`linea-separadora ${steps[3]}`}
        variants={lineVariants}
        initial="initial"
        animate={step >= 4 ? "animate" : "initial"}
      />
      <HiOutlineCash  className={`icon-cash-1 ${steps[3]}`} />
    </div>
  );
};

export default ProgressLine;
