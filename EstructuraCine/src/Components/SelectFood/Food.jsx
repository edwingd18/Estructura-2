import './Food.css';
// import { Button } from 'flowbite-react';
import { FaTicketSimple } from "react-icons/fa6";
import { PiArmchairFill } from "react-icons/pi";
import { GiPopcorn } from "react-icons/gi";
import { HiCash } from "react-icons/hi";
import Combos from './Combos';

import { Splide, SplideSlide } from '@splidejs/react-splide';


function Food() {
    return (
        <div className="contenedor-select-comida">
            <div className="contenedor-comida">
                <div className="contenedor-iconos">
                    <FaTicketSimple className="icon-ticket" />
                    <div className="linea-separadora"></div>
                    <PiArmchairFill className="icon-chair " />
                    <div className="linea-separadora"></div>
                    <GiPopcorn className="icon-popcorn" />
                    <div className="linea-separadora"></div>
                    <HiCash className="icon-cash" />
                </div>
                <div className="contenedor-seleccionar-combo">
                    <Splide
                        options={{
                            rewind: true,
                            width: "1000px",
                            height: "327px",
                            gap: "20px",
                            perPage: "3.5",
                            autoplay: true,
                            focus: "center",
                            
                        }}
                    >
                        <SplideSlide>
                            <Combos
                                nombre={'Combo 1'}
                                descripcion={'1 Crispetas mediana de sal o caramelo 250 g'}
                                precio={'20.000'} />
                        </SplideSlide>
                        <SplideSlide>
                            <Combos
                                nombre={'Combo 2'}
                                descripcion={'2 Crispetas mediana de sal o caramelo 250 g'}
                                precio={'35.000'} />
                        </SplideSlide>
                        <SplideSlide>
                            <Combos
                                nombre={'Combo 3'}
                                descripcion={'3 Crispetas mediana de sal o caramelo 250 g'}
                                precio={'50.000'} />
                        </SplideSlide>
                        <SplideSlide>
                            <Combos
                                nombre={'Combo 4'}
                                descripcion={'4 Crispetas mediana de sal o caramelo 250 g'}
                                precio={'65.000'} />
                        </SplideSlide>
                        <SplideSlide>
                            <Combos
                                nombre={'Combo 5'}
                                descripcion={'4 Crispetas mediana de sal o caramelo 250 g'}
                                precio={'65.000'} />
                        </SplideSlide>
                        <SplideSlide>
                            <Combos
                                nombre={'Combo 6'}
                                descripcion={'4 Crispetas mediana de sal o caramelo 250 g'}
                                precio={'65.000'} />
                        </SplideSlide>
                    </Splide>
                </div>
            </div>
        </div>
    )
}

export default Food;