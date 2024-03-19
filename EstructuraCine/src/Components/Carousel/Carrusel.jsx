import React, { useEffect, useRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

const Carrusel = () => {
  const splideRef = useRef(null);

  useEffect(() => {
    if (splideRef.current) {
      // Configurar el carrusel
      new Splide(splideRef.current, {
        type: 'loop',
        perPage: 5,
        autoplay: true,
      }).mount();
    }
  }, []);

  return (
    <div className='car'>
    <Splide
        options={{
          rewind: true,
          width: '268px', // Cambia el ancho del carrusel al 80% del contenedor padre
          height: '327px',
          pagination: true,
          autoplay: true,
          gap: '200px',
          
        }}
    >
      <SplideSlide>
        <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hIEKzq0klqtz1H3S7QxzH4mMbvT.jpg" alt="Slide 1" />
      </SplideSlide>
      <SplideSlide>
              <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hIEKzq0klqtz1H3S7QxzH4mMbvT.jpg" alt="Slide 1" />
W
      </SplideSlide>
      <SplideSlide>
              <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hIEKzq0klqtz1H3S7QxzH4mMbvT.jpg" alt="Slide 1" />
W
      </SplideSlide>
      <SplideSlide>
        <img src="https://via.placeholder.com/250x200" alt="Slide 2" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://via.placeholder.com/250x200" alt="Slide 3" />
      </SplideSlide>
      <SplideSlide>
              <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hIEKzq0klqtz1H3S7QxzH4mMbvT.jpg" alt="Slide 1" />
W
      </SplideSlide>
      <SplideSlide>
        <img src="https://via.placeholder.com/250x200" alt="Slide 3" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://via.placeholder.com/250x200" alt="Slide 3" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://via.placeholder.com/250x200" alt="Slide 3" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://via.placeholder.com/250x200" alt="Slide 3" />
      </SplideSlide>
      {/* Agrega más SplideSlides según sea necesario */}
    </Splide>
    </div>
  );
};


export default Carrusel;
