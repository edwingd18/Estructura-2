import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

const Carrusel = () => {
  return (
    <div className="car">
      <Splide
        options={{
          rewind: true,
          width: "1268px", // Cambia el ancho del carrusel al 80% del contenedor padre
          height: "327px",
          gap: "100px",
          perPage: "4",
        }}
      >
        <SplideSlide>
          <img
            src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hIEKzq0klqtz1H3S7QxzH4mMbvT.jpg"
            alt="Slide 1"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/37WcNMgNOMxdhT87MFl7tq7FM1.jpg"
            alt="Slide 2"
          />
          W
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6eHcR7zwvNSvkOl9jbctU0lvZQ1.jpg"
            alt="Slide 3"
          />
          W
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/mJypxc7GFS98v4GvlS6Z8EcXc9F.jpg"
            alt="Slide 4"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hIEKzq0klqtz1H3S7QxzH4mMbvT.jpg"
            alt="Slide 5"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ncKCQVXgk4BcQV6XbvesgZ2zLvZ.jpg"
            alt="Slide 6"
          />
        </SplideSlide>

        {/* Agrega más SplideSlides según sea necesario */}
      </Splide>
    </div>
  );
};

export default Carrusel;
