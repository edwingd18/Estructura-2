import { useState, useEffect } from 'react';
import { Modal, TextInput, Button } from 'flowbite-react';
import { HiPencil } from "react-icons/hi";
import PropTypes from 'prop-types';
import axios from 'axios';

const EditMovie = ({ movieId }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [formData, setFormData] = useState({}); // Inicializa con un objeto vacío
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  
  useEffect(() => {
    if (showModal) {
      setIsLoading(true);
      // Realizar la solicitud para obtener los detalles de la película
      axios.get(`http://localhost:8000/api/movies/${movieId}`)
        .then(response => {
          setFormData(response.data); // Establecer los detalles de la película en el estado del formulario
          setImageUrl(response.data.imageUrl); // Establecer imageUrl del estado
          setBannerUrl(response.data.bannerUrl); // Establecer bannerUrl del estado
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error al obtener los detalles de la película:', error);
          setError('Error al cargar los detalles de la película');
          setIsLoading(false);
        });
    }
  }, [showModal, movieId]);

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
      // Realizar la solicitud de actualización con el ID de la película
      await axios.put(`http://localhost:8000/api/movies/${movieId}`, {
        ...formData,
        bannerUrl,
        imageUrl,
      });
      setShowModal(false); // Cerrar el modal después de enviar los datos
      setSuccessMessage('Película actualizada correctamente');
      // Recargar la página para reflejar los cambios
      window.location.reload();
    } catch (error) {
      console.error('Error al editar la película:', error);
      setError('Error al editar la película');
    }
  };

  return (
    <>
      <div>
        <Button className='bg-blue-800 w-14 h-14 rounded-md hover:bg-black' onClick={() => setShowModal(true)}>
          <HiPencil className="inline-block rounded-full hover:bg mt-2" />
        </Button>
        <Modal
          show={showModal}
          size="5xl"
          onClose={() => setShowModal(false)}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <Modal.Header>Editar película</Modal.Header>
          <Modal.Body>
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              <>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <TextInput id="title" name="title" placeholder="Título" className="mb-4" value={formData.title || ''} onChange={handleInputChange} />
                    <TextInput id="description" name="description" placeholder="Descripción" rows={4} className="mb-4" value={formData.description || ''} onChange={handleInputChange} />
                    <TextInput id="director" name="director" placeholder="Director" className="mb-4" value={formData.director || ''} onChange={handleInputChange} />
                    <TextInput id="duration" name="duration" placeholder="Duración" className="mb-4" value={formData.duration || ''} onChange={handleInputChange} />
                    <TextInput id="ageRange" name="ageRange" placeholder="Edad" className="mb-4" value={formData.ageRange || ''} onChange={handleInputChange} />
                    <TextInput
                      id="bannerUrl"
                      name="bannerUrl"
                      placeholder="Banner url"
                      className="mb-4"
                      value={bannerUrl}
                      onChange={(e) => setBannerUrl(e.target.value)}
                    />
                    {bannerUrl && <img src={bannerUrl} alt="Banner Preview" className='w-[500px]' />}
                  </div>
                  <div className='inset-3'>
                    <TextInput
                      id="imageUrl"
                      name="imageUrl"
                      placeholder="Link de la imagen"
                      className="mt-4 2xl:w-[500px]"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                    {imageUrl && <img src={imageUrl} alt="Image Preview" className="mt-4 2xl:w-[500px] 2xl:h-[650px]" />}
                  </div>
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSubmit}>Enviar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
    
  );
};
EditMovie.propTypes = {
  movieId: PropTypes.string.isRequired,
};


export default EditMovie;