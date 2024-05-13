import { useState, useRef } from 'react';
import { Modal, TextInput, Textarea, Button, Alert, Select } from 'flowbite-react';
import { HiOutlinePlus } from "react-icons/hi";
import axios from 'axios';

const CreateMovie = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageLink, setImageLink] = useState('');
  const [bannerLink, setBannerLink] = useState('');
  const [trailerLink, setTrailerLink] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const directorRef = useRef(null);
  const durationRef = useRef(null);
  const ageRangeRef = useRef(null);
  const typeRef = useRef(null);
  const formatRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (
      !titleRef.current.value ||
      !descriptionRef.current.value ||
      !directorRef.current.value ||
      !durationRef.current.value ||
      !ageRangeRef.current.value ||
      !typeRef.current.value||
      !formatRef.current.value||
      !imageLink ||
      !bannerLink ||
      !trailerLink
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
      trailerUrl: trailerLink,
      type: typeRef.current.value,
      format: formatRef.current.value,
    };

    try {
      await axios.post('http://localhost:8000/api/crearPeli', formData);
      console.log('Película guardada correctamente');
      setShowModal(false);
      setShowAlert(false);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        // Recargar la página para reflejar los cambios
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error al guardar la película:', error);
    }
  };

  return (
    <>
      <div>
        <Button className='bg-blue-800 w-14 h-14 rounded-md hover:bg-black' onClick={() => setShowModal(true)}>
          <HiOutlinePlus className="inline-block rounded-full hover:bg mt-2 " />
        </Button>
        <Modal
          show={showModal}
          size="7xl"
          onClose={() => setShowModal(false)}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <Modal.Header>Agregar nueva película</Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-2 gap-8">
              {/* Primera columna: campos de texto y selectores */}
              <div className="flex flex-col">
                <TextInput id="title" placeholder="Título" className="mb-4" ref={titleRef} />
                <Textarea id="description" placeholder="Descripción" rows={4} className="mb-4" ref={descriptionRef} />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <TextInput id="director" placeholder="Director" ref={directorRef} />
                  <TextInput id="duration" placeholder="Duración" ref={durationRef} />
                </div>
                <TextInput id="age" placeholder="Edad" type="number" className="mb-4" ref={ageRangeRef} />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Select
                    id="type"
                    placeholder="Selecciona el tipo"
                    ref={typeRef}
                  >
                    <option value="Comedia">Comedia</option>
                    <option value="Suspenso">Suspenso</option>
                    <option value="Acción">Acción</option>
                    <option value="Drama">Drama</option>
                    <option value="Ciencia ficción">Ciencia ficción</option>
                    <option value="Animación">Animación</option>
                    <option value="Romance">Romance</option>
                    {/* Agrega más opciones según tus necesidades */}
                  </Select>
                  <Select
                    id="format"
                    placeholder="Selecciona el formato"
                    ref={formatRef}
                  >
                    <option value="2D">2D</option>
                    <option value="3D">3D</option>
                    <option value="4D">4D</option>
                  </Select>
                </div>
                <TextInput
                  id="trailerLink"
                  placeholder="Trailer URL"
                  className="mb-4"
                  value={trailerLink}
                  onChange={(e) => setTrailerLink(e.target.value)}
                />
                <TextInput
                  id="bannerUrl"
                  placeholder="Banner url"
                  value={bannerLink}
                  onChange={(e) => setBannerLink(e.target.value)}
                />
                {bannerLink && <img src={bannerLink} alt="Preview Banner" className='w-[500px] pt-4' />}
              </div>

              {/* Segunda columna: previsualizaciones */}
              <div className="flex flex-col items-center">
                <TextInput
                  id="imageLink"
                  placeholder="Link de la imagen"
                  className="mb-4 w-full"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                />
                <div className="flex">
                  {imageLink && <img src={imageLink} alt="Preview Imagen" className=" 2xl:w-[500px] 2xl:h-[750px]" />}
                </div>
              </div>
              {showSuccessAlert && (
          <Alert color="success" onDismiss={() => setShowSuccessAlert(false)} className="absolute top-3 right-3">
            La nueva película se agregó exitosamente.
          </Alert>
        )}
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

      </div>
    </>
  );
};

export default CreateMovie;
