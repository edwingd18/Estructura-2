import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle, HiOutlineTrash } from "react-icons/hi";
import axios from 'axios';
import PropTypes from 'prop-types';

export function DeleteCombo({ comboId, onDeleteError }) {
  const [openModal, setOpenModal] = useState(false);


  const handleDelete = async () => {
    try {
      await axios.delete(`/api/api/combo/${comboId}`);
      setOpenModal(false); // Cerrar el modal después de eliminar la película
      setTimeout(() => {
        // Recargar la página para reflejar los cambios
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error al eliminar el combo:', error);
      onDeleteError(); // No necesitas manejar nada especial para el error aquí
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className="btn-eliminar bg-red-600 text-white w-14 h-14 rounded-md">
        <HiOutlineTrash className="inline-block rounded-full hover:bg w-20 mt-2" />
      </Button>
      <Modal show={openModal} size="sm" onClose={() => setOpenModal(false)} popup>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Estás seguro de eliminar este combo?
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
    </div>
  );
}

DeleteCombo.propTypes = {
  comboId: PropTypes.string,
  onDeleteError: PropTypes.string,
  onDeleteSuccess: PropTypes.string,
};

export default DeleteCombo;