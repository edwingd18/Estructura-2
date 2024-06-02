// Combos.js
import PropTypes from 'prop-types';
import './Combos.css';

function Combos({ nombre,img, descripcion, precio, seleccionado }) {
  return (
    <div
      className="card card-hover"
      onClick={() => seleccionado(nombre, descripcion, precio)}
    >
      <div className="contenedor-informacion-imagen">
        <img className=' rounded-t-[15px] ' src={img} alt="" />
        <div className='ml-4'>
        <h2 className='text-[17px] font-semibold mt-3'>{nombre}</h2>
        <p className='text-[14px] line-clamp-2 text-gray-500'>{descripcion}</p>
        <h3 className='text-[17px] font-semibold mb-2 mt-4'>${precio}</h3>
        </div>
      </div>
    </div>
  );
}

Combos.propTypes = {
  nombre: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  seleccionado: PropTypes.func.isRequired,
};

export default Combos;