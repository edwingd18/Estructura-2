import '../SelectTickets - Part one/SelectChair.css'
import PropTypes from 'prop-types';

import imagenSillaGeneral from '../SelectTickets - Part one/imagenes-sillas/Silla-general.png'
import imagenSillaPreferencial from '../SelectTickets - Part one/imagenes-sillas/Silla-preferencial.png'

export function SelectChair(props) {

    const handleChange = (event) => {
        props.setSelected(parseInt(event.target.value));
    };

    

    return (
        <div className='contenedor-silla'>
            <div className="titulo-silla">
                <h1 className='nombre-silla'>{props.nombre}</h1>
            </div>
            <div className="contenedor-informacion">
                <div className="contenedor-imagen-silla">
                    <img src={imagenSillaGeneral}
                        alt={`Foto de ${props.nombre}`}
                        className="imagen-silla" />
                </div>
                <div className="contenedor-informacion2">
                    <div className="precio-silla">
                        <h2>BOLETA {props.nombreTipo}</h2>
                        <h3>Valor ${props.precio}</h3>
                    </div>
                    <div className="cantidad-sillas">
                        <select id="genCombo" onChange={handleChange}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SelectChairPreferencial(props) {

    const handleChange = (event) => {
        props.setSelected(parseInt(event.target.value));
    };

    return (
        <div className='contenedor-silla'>
            <div className="titulo-silla">
                <h1 className='nombre-silla'>{props.nombre}</h1>
            </div>
            <div className="contenedor-informacion">
                <div className="contenedor-imagen-silla">
                    <img src={imagenSillaPreferencial}
                        alt={`Foto de ${props.nombre}`}
                        className="imagen-silla" />
                </div>
                <div className="contenedor-informacion2">
                    <div className="precio-silla">
                        <h2>BOLETA {props.nombreTipo}</h2>
                        <h3>Valor ${props.precio}</h3>
                    </div>
                    <div className="cantidad-sillas">
                        <select id="prefCombo" onChange={handleChange}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

SelectChair.propTypes = {
    nombre: PropTypes.string.isRequired,
    nombreTipo: PropTypes.string.isRequired,
    precio: PropTypes.string.isRequired,
    setSelected: PropTypes.func.isRequired,
};

SelectChairPreferencial.propTypes = {
    nombre: PropTypes.string.isRequired,
    nombreTipo: PropTypes.string.isRequired,
    precio: PropTypes.string.isRequired,
    setSelected: PropTypes.func.isRequired,
};
