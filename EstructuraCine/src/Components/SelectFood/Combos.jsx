import './Combos.css'

import Combo_1 from '../SelectFood/Imagenes/Combo-1.png'
// import Combo_2 from '../SelectFood/Imagenes/Combo-1.png'
// import Combo_3 from '../SelectFood/Imagenes/Combo-1.png'
// import Combo_4 from '../SelectFood/Imagenes/Combo-1.png'

import PropTypes from 'prop-types';

const Combos = ({ nombre, descripcion, precio, seleccionado }) => {
    return (
        <div className="card card-hover" onClick={seleccionado}>
            <div className="contenedor-imagen">
                <img src={Combo_1}
                    alt="Combo 1"
                    className='imagen-combo-1' />
            </div>
            <div className="contenedor-informacion-imagen">
                <h2>{nombre}</h2>
                <p>{descripcion}</p>
                <h3>${precio}</h3>
            </div>
        </div>
    )
}

Combos.propTypes = {
    nombre: PropTypes.string,
    descripcion: PropTypes.string,
    precio: PropTypes.number,
    seleccionado: PropTypes.func
}

export default Combos;