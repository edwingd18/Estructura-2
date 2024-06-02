import { useState, useRef } from 'react';
import { Modal, TextInput, Textarea, Button, Alert } from 'flowbite-react';
import { HiOutlinePlus } from "react-icons/hi";
import axios from 'axios';

const CreateCombo
 = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageLink, setImageLink] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (
      !titleRef.current.value ||
      !descriptionRef.current.value ||
      !priceRef.current.value ||
      !imageLink 

    ) {
      setShowAlert(true);
      return;
    }

    const formData = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      imageUrl: imageLink,

    };

    try {
      await axios.post('/api/api/crearCombo', formData);
      console.log('Combo guardado correctamente');
      setShowModal(false);
      setShowAlert(false);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        // Recargar la página para reflejar los cambios
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error al guardar el combo:', error);
    }
  };

  return (
    <>
      <div>
        <Button className='bg-blue-800 w-14 h-14 rounded-md hover:bg-black' onClick={() => setShowModal(true)}>
          <HiOutlinePlus className="inline-block rounded-full hover:bg mt-2 " />
        </Button>
        <Modal show={showModal} size="6xl" onClose={() => setShowModal(false)} className="fixed inset-0 z-50 overflow-y-auto">
  <Modal.Header>Agregar nuevo combo</Modal.Header>
  <Modal.Body>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Primera columna: campos de texto y selectores */}
      <div>
        <div className="mb-4">
          <TextInput
            id="title"
            placeholder="Título"
            required={true}
            ref={titleRef}
          />
        </div>
        <div className="mb-4">
          <Textarea
            id="description"
            placeholder="Descripción"
            rows={3}
            required={true}
            ref={descriptionRef}
          />
        </div>
        <div className="mb-4">
          <TextInput
            id="price"
            placeholder="Precio"
            type="number"
            required={true}
            ref={priceRef}
          />
        </div>
      </div>

      {/* Segunda columna: previsualizaciones */}
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 w-full max-w-xs">
          <TextInput
            id="imageLink"
            placeholder="Link de la imagen"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
        </div>
        <div className="w-full max-w-xs h-48 flex items-center justify-center">
          {imageLink && (
            <img
              src={imageLink}
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
        {showAlert && (
          <Alert color="failure" onDismiss={() => setShowAlert(false)} className="absolute top-3 right-3">
            Por favor, complete todos los campos.
          </Alert>
        )}
         {showSuccessAlert && (
          <Alert color="success" onDismiss={() => setShowSuccessAlert(false)} className="absolute top-3 right-3">
            La nueva combo se agregó exitosamente.
          </Alert>
         )}
        

      </div>
    </>
  );
};

export default CreateCombo
;
