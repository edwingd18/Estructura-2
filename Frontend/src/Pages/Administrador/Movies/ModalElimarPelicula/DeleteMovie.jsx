import { Button, Modal, Alert } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle, HiOutlineTrash } from "react-icons/hi";
import axios from 'axios';
import PropTypes from 'prop-types';


export function DeleteMovie({ movieId, onDeleteError }) {
  const [openModal, setOpenModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/${movieId}`);
      setShowSuccessAlert(true); // Mostrar la alerta de éxito dentro del modal
      setOpenModal(false); // Cerrar el modal después de eliminar la película
      setTimeout(() => {
        setShowSuccessAlert(false);
        // Recargar la página para reflejar los cambios
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error al eliminar la película:', error);
      setShowErrorAlert(true); // Mostrar la alerta de error
      onDeleteError(); // No necesitas manejar nada especial para el error aquí
    }
  };

  return (
    <>
      <div>
        <Button
          onClick={() => setOpenModal(true)}
          className="btn-eliminar bg-red-600 text-white w-14 h-14 rounded-md"
        >
          <HiOutlineTrash className="inline-block rounded-full hover:bg w-20 mt-2" />
        </Button>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Estás seguro de eliminar esta película?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Sí, estoy seguro
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {showSuccessAlert && (
        <Alert
          color="success"
          onDismiss={() => setShowSuccessAlert(false)}
          className="absolute top-3 right-3">
          La película se eliminó correctamente.
        </Alert>
      )}

      {showErrorAlert && (
        <Alert
          color="failure"
          onDismiss={() => setShowErrorAlert(false)}
          className="fixed top-3 right-3 transition-all duration-300"
        >
          Hubo un error al eliminar la película. Por favor, inténtalo de nuevo más tarde.
        </Alert>
      )}
    </>
  );
}
DeleteMovie.propTypes = {
  movieId: PropTypes.string,
  onDeleteError: PropTypes.string,
  onDeleteSuccess: PropTypes.string,
};

export default DeleteMovie;
