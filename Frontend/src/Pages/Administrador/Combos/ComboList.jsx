import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CreateCombo from './ModalCrearCombo/CreateCombo';
import DeleteCombo from './ModalEliminarCombo/DeleteCombo';
import EditCombo from './ModalEditarCombo/EditCombo';

// const URI = 'http://backend.ftfjfagraqa2hwfs.eastus.azurecontainer.io:8000/api/combos/';
const URI = '/api/api/allCombos/';

const ComboList = ({ combos, handleComboClick }) => {
  const [filter, setFilter] = useState('');

  const handleLinkClick = (e, index) => {
    e.preventDefault(); // Evita la navegación por defecto
    handleComboClick(index); // Maneja el clic en el enlace
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredCombos = combos.filter((combo) =>
    combo.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className='text-white ml-32 mr-10'>
      <h1 className=' mt-5 mb-5 text-4xl'>Combos</h1>
      <div className='flex flex-row'>
        <input
          className='w-[640px] h-14 rounded-md text-black'
          type="text"
          placeholder="Filtro"
          value={filter}
          onChange={handleFilterChange}
        />
        <div className="ml-3">
          <CreateCombo />
        </div>
      </div>
      <div className='grid grid-cols-4 gap-4 mt-5'>
        {filteredCombos.map((combo, index) => (
          <div key={index} className='mb-4 group relative'>
            <Link
              to={`/combo/${combo._id}`}
              onClick={(e) => handleLinkClick(e, index)}
            >
              <div className='max-w-sm'>
                <img
                  src={combo.imageUrl}
                  alt={combo.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/100x150?text=No+Image';
                  }}
                  className="combo-image shadow-md opacity-100 rounded-md group-hover:opacity-50 transition-opacity w-[400px] duration-300 ease-linear"
                />
                <div className='absolute flex flex-col top-[160px] left-[235px] items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='mb-2'>
                    <EditCombo comboId={combo._id} />
                  </div>
                  <DeleteCombo comboId={combo._id} />
                </div>
                <p className='text-l font-semibold mt-3'>{combo.title}</p>
                <p className='font-semibold mt-2'>${combo.price} .00 COP</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

ComboList.propTypes = {
  combos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleComboClick: PropTypes.func.isRequired,
};

const ComboListContainer = () => {
  const [combos, setCombos] = useState([]);

  const fetchCombos = async () => {
    try {
      const response = await axios.get(URI);
      setCombos(response.data);
    } catch (error) {
      console.error('Error fetching combos:', error);
    }
  };

  useEffect(() => {
    fetchCombos();
  }, []);

  const handleComboClick = (index) => {
    console.log('Clic en el combo:', combos[index].title);
    // Aquí puedes agregar la lógica para navegar a la página de detalles del combo
  };

  return <ComboList combos={combos} handleComboClick={handleComboClick} />;
};

export default ComboListContainer;