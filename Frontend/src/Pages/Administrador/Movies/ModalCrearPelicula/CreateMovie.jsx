import { useState, useRef } from 'react';
import { Modal, TextInput, Textarea, Button, Alert } from 'flowbite-react';
import { HiOutlinePlus } from "react-icons/hi";
import axios from 'axios';

const CreateMovie = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageLink, setImageLink] = useState('');
  const [bannerLink, setBannerLink] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const directorRef = useRef(null);
  const durationRef = useRef(null);
  const ageRangeRef = useRef(null);

  const customTema = {
  
    "root": {
      "base": "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
      "show": {
        "on": "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
        "off": "hidden"
      },
      "sizes": {
        "sm": "max-w-sm",
        "md": "max-w-md",
        "lg": "max-w-lg",
        "xl": "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl"
      },
      "positions": {
        "top-left": "items-start justify-start",
        "top-center": "items-start justify-center",
        "top-right": "items-start justify-end",
        "center-left": "items-center justify-start",
        "center": "items-center justify-center",
        "center-right": "items-center justify-end",
        "bottom-right": "items-end justify-end",
        "bottom-center": "items-end justify-center",
        "bottom-left": "items-end justify-start"
      }
    },
    "content": {
      "base": "relative h-full w-full p-4 md:w-auto",
      "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-agua shadow dark:bg-gray-700"
    },
    "body": {
      "base": "flex-1 overflow-auto p-6",
      "popup": "pt-0"
    },
    "header": {
      "base": "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
      "popup": "border-b-0 p-2",
      "title": "text-xl font-medium text-white dark:text-white",
      "close": {
        "base": "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
        "icon": "h-5 w-5"
      }
    },
    "footer": {
      "base": "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
      "popup": "border-t"
    }
  };
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Validación de campos vacíos
      if (
        !titleRef.current.value ||
        !descriptionRef.current.value ||
        !directorRef.current.value ||
        !durationRef.current.value ||
        !ageRangeRef.current.value ||
        !imageLink ||
        !bannerLink
      ) {
        setShowAlert(true);
        return;
      }
  
      const formData = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        director: directorRef.current.value,
        duration: durationRef.current.value,
        ageRange: ageRangeRef.current.value,
        bannerUrl: bannerLink,
        imageUrl: imageLink,
      };
  
      try {
        await axios.post('http://localhost:8000/api/crearPeli', formData);
        console.log('Película guardada correctamente');
        setShowModal(false);
        setShowAlert(false); 
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 5000);
      } catch (error) {
        console.error('Error al guardar la película:', error);
      }
    };
  
    return (
      <>
        <div>
          <Button className='bg-blue-800 w-14 h-14 rounded-md hover:bg-black' onClick={() => setShowModal(true)}>
            <HiOutlinePlus className="inline-block rounded-full hover:bg" />
          </Button>
          <Modal
            show={showModal}
            theme={customTema}
            size="7xl"
            onClose={() => setShowModal(false)}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <Modal.Header>Agregar nueva película</Modal.Header>
            <Modal.Body>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <TextInput id="title" placeholder="Título" className="mb-4" ref={titleRef} />
                  <Textarea id="description" placeholder="Descripción" rows={4} className="mb-4" ref={descriptionRef} />
                  <TextInput id="director" placeholder="Director" className="mb-4" ref={directorRef} />
                  <TextInput id="duration" placeholder="Duración" className="mb-4" ref={durationRef} />
                  <TextInput id="age" placeholder="Edad" type="number" className="mb-4" ref={ageRangeRef} />
                  <TextInput
                    id="bannerUrl"
                    placeholder="Banner url"
                    className="mb-4"
                    value={bannerLink}
                    onChange={(e) => setBannerLink(e.target.value)}
                  />
                  {bannerLink && <img src={bannerLink} alt="Preview" className='w-[500px]' />}
                </div>
                <div className='inset-3'>
                  <TextInput
                    id="imageLink"
                    placeholder="Link de la imagen"
                    className="mt-4 2xl:w-[500px]"
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                  />
                  {imageLink && <img src={imageLink} alt="Preview" className="mt-4 2xl:w-[500px] 2xl:h-[650px]" />}
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
              La nueva película se agregó exitosamente.
            </Alert>
          )}
        </div>
      </>
    );
  };
  
  export default CreateMovie;