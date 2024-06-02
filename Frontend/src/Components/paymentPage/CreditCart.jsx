import "./CreditCard.css";
import cards from "./images/card_img.png";
import { useState } from "react";



  export const CreditCard = () => {
    const [name, setName] = useState("Juan Miguel");
    const [emailUser, setEmailUser] = useState(localStorage.getItem("email"));
    const [phone, setPhone] = useState("3154115206");
    const [city, setCity] = useState("Santiago de Cali");
    const [state, setState] = useState("Valle del Cauca");
    const [postalCode, setPostalCode] = useState("713005");
    const [cardHolder, setCardHolder] = useState("Juan Miguel");
    const [cardNumber, setCardNumber] = useState("1111222233334444");
    const [month, setMonth] = useState("30");
    const [year, setYear] = useState("30");
    const [cvv, setCvv] = useState("123");
  
    const getLocalStorageItem = (key) =>
      window.localStorage.getItem(key)?.replace(/"/g, "")?.trim();
  
    const date = getLocalStorageItem("date");
    const movieName = getLocalStorageItem("movieName");
    const selectedSeats = JSON.parse(window.localStorage.getItem("selectedSeats"));
    const ticketType = getLocalStorageItem("ticketType");
    const movieDate = new Date(date);
    const ticketQuantity = Number(localStorage.getItem("ticketQuantity"));
    
    const total = localStorage.getItem('total')

    
    const handleSubmit = async (event) => {
      event.preventDefault();
      const selectedCombos = JSON.parse(localStorage.getItem('selectedCombos')); // Using localStorage
   
   
      let foodDetails = [];
    
      if (selectedCombos && selectedCombos.length > 0) {
     
        foodDetails = selectedCombos.map(combo => JSON.stringify(combo)); 
      }
    
      const transactionDetails = {
        emailUser: emailUser,
        movieName: movieName,
        date: movieDate,
        ticketType: ticketType,
        ticketQuantity: ticketQuantity,
        selectedSeats: selectedSeats,
        foodDetails: foodDetails,
        boletas: "Boletas",
        total: total,
      };
   
      try {
        const response = await fetch("/api/api/transaction/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transactionDetails),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
          
        }else{
          alert("tu pago fue exitoso ")
          window.location.href = "/"
        }
  
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };


  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <h3 className="title">Dirección de Pago</h3>

              <div className="inputBox">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre Completo
                </label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>

              <div className="inputBox">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <input
                  value={emailUser}
                  onChange={(event) => setEmailUser(event.target.value)}
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.doe@company.com"
                  required
                />
              </div>

              <div className="inputBox">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Telefono
                </label>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  type="tel"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123-45-678"
                  required
                />
              </div>

              <div className="inputBox">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ciudad
                </label>
                <input
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  type="text"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cali"
                  required
                />
              </div>

              <div className="flex">
                <div className="inputBox">
                  <label
                    htmlFor="state"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Estado
                  </label>
                  <input
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                    type="text"
                    id="state"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Valle del Cauca"
                    required
                  />
                </div>
                <div className="inputBox">
                  <label
                    htmlFor="postal_code"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Codigo Postal
                  </label>
                  <input
                    value={postalCode}
                    onChange={(event) => setPostalCode(event.target.value)}
                    type="text"
                    id="postal_code"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="702167"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <h3 className="title">Metodo de Pago</h3>

              <div className="inputBox">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tarjetas Permitidas
                </label>
                <div className="img">
                  <img src={cards} alt="Tarjetas Permitidas" />
                </div>
              </div>

              <div className="inputBox">
                <label
                  htmlFor="card_holder"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre del Titular
                </label>
                <input
                  value={cardHolder}
                  onChange={(event) => setCardHolder(event.target.value)}
                  type="text"
                  id="card_holder"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>

              <div className="inputBox">
                <label
                  htmlFor="card_number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Número de Tarjeta
                </label>
                <input
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                  type="tel"
                  id="card_number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1111-2222-3333-4444"
                  required
                />
              </div>

              <div className="inputBox">
                <label
                  htmlFor="month"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mes
                </label>
                <input
                  value={month}
                  onChange={(event) => setMonth(event.target.value)}
                  type="text"
                  id="month"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="January"
                  required
                />
              </div>

              <div className="flex">
                <div className="inputBox">
                  <label
                    htmlFor="year"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Año
                  </label>
                  <input
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                    type="text"
                    id="year"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="2023"
                    required
                  />
                </div>
                <div className="inputBox">
                  <label
                    htmlFor="cvv"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    CVV
                  </label>
                  <input
                    value={cvv}
                    onChange={(event) => setCvv(event.target.value)}
                    type="text"
                    id="cvv"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <input
            value="Realizar Pago"


            type="submit"
            className="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          />
        </form>
      </div>
    </>
  );
};
