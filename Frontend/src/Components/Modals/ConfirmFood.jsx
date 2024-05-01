import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import PropTypes from "prop-types";

export function ConfirmFood({ openModal, setOpenModal, modalMessage, handleConfirm, isError }) {
    return (
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
                        {modalMessage}
                    </h3>
                    <div className="flex justify-center gap-4">
                        {isError ? (
                            <Button color="failure" onClick={() => setOpenModal(false)}>
                                Cerrar
                            </Button>
                        ) : (
                            <>
                                <Button color="failure" onClick={handleConfirm}>
                                    {"Si, Estoy seguro"}
                                </Button>
                                <Button color="gray" onClick={() => setOpenModal(false)}>
                                    No, cancelar
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

ConfirmFood.propTypes = {
    openModal: PropTypes.bool,
    setOpenModal: PropTypes.func,
    modalMessage: PropTypes.string,
    handleConfirm: PropTypes.func,
    isError: PropTypes.bool.isRequired,
};

export default ConfirmFood;