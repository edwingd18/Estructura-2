import { useState, useEffect } from 'react';
import axios from 'axios';
import MainCarousel from './MainCarousel';
import ThumbnailCarousel from './ThumbnailCarousel';
import { motion } from 'framer-motion';

// const URI = 'http://backend.ftfjfagraqa2hwfs.eastus.azurecontainer.io:8000/api/allMovies'; const URI = '/api/allMovies';
const URI = 'http://localhost:8000/api/allMovies';



const Carousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(0); // Inicializado con 0

  useEffect(() => {
    fetchCarouselItems();
  }, []);

  const fetchCarouselItems = async () => {
    try {
      const response = await axios.get(URI);
      setCarouselItems(response.data);
    } catch (error) {
      console.error('Error fetching carousel items:', error);
    }
  };

  const handleMovieClick = (index) => {
    setSelectedThumbnailIndex(index);
  };

  return (
    <motion.div
      className="contenedor-iconos"
      initial={{ opacity: 0, scale: 2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      <div className="carousel 2xl:ml-24 2xl:mb-2">
        {carouselItems.length > 0 && (
          <MainCarousel
            carouselItems={carouselItems}
            selectedThumbnailIndex={selectedThumbnailIndex}
            handleMovieClick={handleMovieClick}
          />
        )}
        <ThumbnailCarousel
          carouselItems={carouselItems}
          selectedThumbnailIndex={selectedThumbnailIndex}
          handleMovieClick={handleMovieClick}
        />
      </div>

      <div className='bg-zinc-800 w-full h-[150px] opacity-50 hover:opacity-100 transition-all'>
        <h1>About</h1>
<h1 className='ml-[150px] text-white w-60 text-2xl'>Sobre nosotros</h1>
<p className='text-white ml-[150px] normal-case text-wrap'>Somos un grupo de estudiantes de la universidad Autonoma de Occidente, nos dedicamos durante todos este semestre para poder sacar este proyecto adelante, si nos quieren conocer de <a  className ="normal-case text-sky-400" href="/About" target="_blank"> Click Aqui</a> .</p>
</div>
    </motion.div>
  );
};

export default Carousel;
