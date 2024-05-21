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
        <img src={img} alt="" />
        <h2>{nombre}</h2>
        <p>{descripcion}</p>
        <h3>${precio}</h3>
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