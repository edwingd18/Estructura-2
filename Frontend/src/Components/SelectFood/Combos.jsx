import  { Component } from 'react';
import './Combos.css';
import PropTypes from 'prop-types';

const URI = 'http://localhost:8000/api/combos';

class Combos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      combo: null,
    };
  }

  componentDidMount() {
    fetch(URI)
      .then(response => response.json())
      .then(data => {
        // Asumir que la API devuelve un arreglo de combos
        const combo = data[0];
        this.setState({ combo });
      })
      .catch(error => console.error('Error fetching combo:', error));
  }

  render() {
    const { combo } = this.state;

    if (!combo) {
      return <div>Cargando...</div>;
    }

    return (
      <div
        className="card card-hover"
        onClick={() => this.props.seleccionado(combo.title, combo.description, combo.price)}
      >
        <div className="contenedor-imagen">
          <img src={combo.imageUrl} alt={combo.title} className="imagen-combo-1" />
        </div>
        <div className="contenedor-informacion-imagen">
          <h2>{combo.title}</h2>
          <p>{combo.description}</p>
          <h3>${combo.price}</h3>
        </div>
      </div>
    );
  }
}

Combos.propTypes = {
  seleccionado: PropTypes.func.isRequired,
};

export default Combos;