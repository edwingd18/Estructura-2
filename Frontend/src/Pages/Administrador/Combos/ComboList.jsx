import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const URI = 'http://backend.ftfjfagraqa2hwfs.eastus.azurecontainer.io:8000/api/combos/';

const ComboList = ({ combos, handleComboClick }) => {

  const handleLinkClick = (e, index) => {
    e.preventDefault(); // Evita la navegación por defecto
    handleComboClick(index); // Maneja el clic en el enlace
  };

  return (
    <div className='text-white ml-32 mr-10'>
      <h1 className=' mt-5 mb-5 text-4xl'>Combos</h1>
      <input className='w-[740px] h-14 rounded-md' type="text" placeholder="Filtro" />
      <div className='grid grid-cols-4 gap-4 mt-5'>
        {combos.map((combo, index) => (
          <div key={index} className='mb-4 group relative'>
            <Link
              to={`/combo/${combo._id}`}
              onClick={(e) => handleLinkClick(e, index)}
            >
              <img
                src={combo.imageUrl}
                alt={combo.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/100x150?text=No+Image';
                }}
                className="combo-image shadow-md opacity-100 rounded-md group-hover:opacity-50 transition-opacity duration-300 ease-linear"
              />
              <p className='text-xl font-semibold mt-3'>{combo.title}</p>
              <p>{combo.description}</p>
              <p>{combo.price}</p>
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
