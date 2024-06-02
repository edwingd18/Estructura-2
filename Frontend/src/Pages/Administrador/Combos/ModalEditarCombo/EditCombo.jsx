import { useState, useEffect } from 'react';
import { Modal, TextInput, Button } from 'flowbite-react';
import { HiPencil } from "react-icons/hi";
import PropTypes from 'prop-types';
import axios from 'axios';

const EditCombo = ({ comboId }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState({}); 
 
  
  useEffect(() => {
    if (showModal) {
      // Realizar la solicitud para obtener los detalles de la combo
      axios.get(`/api/api/combos/${comboId}`)
        .then(response => {
          setFormData(response.data); // Establecer los detalles de la combo en el estado del formulario
          setImageUrl(response.data.imageUrl); // Establecer imageUrl del estado
        })
        .catch(error => {
          console.error('Error al obtener los detalles del combo:', error);
        });
    }
  }, [showModal, comboId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizar la solicitud de actualización con el ID de la combo
      await axios.put(`/api/api/combos/${comboId}`, {
        ...formData,
        imageUrl,
      });
      setShowModal(false); // Cerrar el modal después de enviar los datos
      // Recargar la página para reflejar los cambios
      window.location.reload();
    } catch (error) {
      console.error('Error al editar el combo:', error);
    }
  };

  return (
    <>
      <div>
        <Button className='bg-blue-800 w-14 h-14 rounded-md hover:bg-black' onClick={() => setShowModal(true)}>
          <HiPencil className="inline-block rounded-full hover:bg mt-2" />
        </Button>
        <Modal show={showModal} size="6xl" onClose={() => setShowModal(false)} className="fixed inset-0 z-50 overflow-y-auto">
  <Modal.Header>Editar combo</Modal.Header>
  <Modal.Body>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Primera columna: campos de texto y selectores */}
      <div>

        <TextInput id="title" name="title" placeholder="Título" className="mb-4" value={formData.title || ''} onChange={handleInputChange} />
        <TextInput id="description" name="description" placeholder="Descripción" rows={4} className="mb-4" value={formData.description || ''} onChange={handleInputChange} />
        <TextInput id="price" name="price" placeholder="Precio" className="mb-4" value={formData.price || ''} onChange={handleInputChange} />
   
      </div>

      {/* Segunda columna: previsualizaciones */}
      <div className="flex flex-col items-center justify-center">
          <TextInput
            className="mb-4 w-full max-w-xs"
            id="imageUrl"
            name='imageUrl'
            placeholder="Link de la imagen"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        <div className="w-full max-w-xs h-48 flex items-center justify-center">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview Imagen"
              className="w-auto h-full object-contain"
            />
          )}
        </div>
      </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={handleSubmit}>Enviar</Button>
  </Modal.Footer>
</Modal>
      </div>
    </>
    
  );
};
EditCombo.propTypes = {
  comboId: PropTypes.string.isRequired,
};


export default EditCombo;