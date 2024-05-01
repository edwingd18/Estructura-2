import { Component } from 'react';
import './Combos.css';
import PropTypes from 'prop-types';

const URI = 'http://localhost:8000/api/combos';

class Combos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      combos: [],
    };
  }

  componentDidMount() {
    fetch(URI)
      .then(response => response.json())
      .then(data => {
        // Filtrar elementos duplicados
        const uniqueCombos = data.filter(
          (combo, index, self) =>
            index === self.findIndex(c => c.id === combo.id)
        );
        this.setState({ combos: uniqueCombos });
      })
      .catch(error => console.error('Error fetching combos:', error));
  }

  render() {
    const { combos } = this.state;

    return (
      <div>
        {combos.map(combo => (
          <div
            key={combo.id}
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
        ))}
      </div>
    );
  }
}

Combos.propTypes = {
  seleccionado: PropTypes.func.isRequired,
};

export default Combos;