import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";

export function DeleteMovie() {
  const [openModal, setOpenModal] = useState(false); // Inicializado a false

  return (
    <>
      <div>
        <Button
          onClick={() => setOpenModal(true)} // Abre el modal
          className=" btn-eliminar bg-red-600 text-white w-14 h-14 rounded-md"
        >
          <HiOutlineTrash className="inline-block rounded-full hover:bg w-20" />
        </Button>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)} // Cierra el modal
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Estas seguro de eliminar esta pelicula?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                {"Si, Estoy seguro"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteMovie;