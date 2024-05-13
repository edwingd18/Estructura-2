import { useState, useEffect } from "react";
import { Sidebar as FlowbiteSidebar } from "flowbite-react"
import { MdMovie } from 'react-icons/md'
import {
  HiOutlineChatAlt2,
  HiShoppingCart,
  HiUser,
  HiTicket,

} from "react-icons/hi";
import { GiHotMeal } from 'react-icons/gi';
import { FaBars } from 'react-icons/fa';


import ModalLogin from "../../Pages/Login/Login";

import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // Estado para guardar el nombre de usuario
  const [isAdmin, setisAdmin] = useState(false);


  useEffect(() => {


  }, [])


  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoggedIn(true)
      const storedUsername = localStorage.getItem('username');
      const storedIsAdmin = localStorage.getItem('isAdmin') == 'true';
      setisAdmin(storedIsAdmin);
      setUsername(storedUsername);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username'); // Asegúrate de limpiar el nombre de usuario también
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setUsername("");
    setisAdmin(false);

  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const customtema = {
    root: {
      base: "h-full",
      collapsed: {
        on: "w-16",
        off: "w-64",
      },
      inner:
        "h-full overflow-y-auto overflow-x-hidden rounded bg-agua py-4 px-3 dark:bg-black",
    },
    collapse: {
      button:
        "group flex w-full items-center rounded-lg p-2 text-base font-normal text-white transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
      icon: {
        base: "h-6 w-6 text-white transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
        open: {
          off: "",
          on: "text-gray-900",
        },
      },
      label: {
        base: "ml-3 flex-1 whitespace-nowrap text-white",
        icon: {
          base: "h-6 w-6 transition ease-in-out delay-0",
          open: {
            on: "rotate-180",
            off: "",
          },
        },
      },
      list: "space-y-2 py-2",
    },
    cta: {
      base: "mt-6 rounded-lg p-4 bg-gray-100 dark:bg-gray-700",
      color: {
        blue: "bg-cyan-50 dark:bg-cyan-900",
        dark: "bg-dark-50 dark:bg-dark-900",
        failure: "bg-red-50 dark:bg-red-900",
        gray: "bg-alternative-50 dark:bg-alternative-900",
        green: "bg-green-50 dark:bg-green-900",
        light: "bg-light-50 dark:bg-light-900",
        red: "bg-red-50 dark:bg-red-900",
        purple: "bg-purple-50 dark:bg-purple-900",
        success: "bg-green-50 dark:bg-green-900",
        yellow: "bg-yellow-50 dark:bg-yellow-900",
        warning: "bg-yellow-50 dark:bg-yellow-900",
      },
    },
    item: {
      base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 my-3",
      active: "bg-gray-100 dark:bg-white",
      collapsed: {
        insideCollapse: "group w-full pl-8 transition duration-75",
        noIcon: "font-bold",
      },
      content: {
        base: "px-3 flex-1 whitespace-nowrap",
      },
      icon: {
        base: "h-6 w-6 flex-shrink-0 text-icon transition duration-75 group-hover:text-gray-900 dark:text-black dark:group-hover:text-black",
        active: "text-gray-700 dark:text-gray-100",
      },
      label: "",
      listItem: "",
    },
    items: {
      base: "",
    },
    itemGroup: {
      base: "space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700",
    },
    logo: {
      base: "mb-5 flex items-center pl-2.5",
      collapsed: {
        on: "hidden",
        off: "self-center whitespace-nowrap text-xl font-semibold dark:text-white",
      },
      img: "mr-3 h-6 sm:h-7",
    },
  };

  return (

    <div className={`sidebar-container ${isOpen ? "open" : "close"} flex flex-col top-0 w-[100px] h-full transition-[width_0.3s_ease_in_out] z-[199999]`}>
      <FlowbiteSidebar aria-label="Menu de Cine" theme={customtema} class="Sidebar fixed top-0 w-[110px] h-full transition-[width_0.5s_ease_in_out] z-[199999]">
        <div className="flex items-center justify-start">
          <button className="hamburger text-white text-2xl p-6" onClick={toggleSidebar}>
            <FaBars />
          </button>

          {isOpen && (
            <span className={`text-white font-semibold overflow-hidden text-ellipsis whitespace-nowrap ${!isOpen && 'hidden'}`}>Cine Magic</span>
          )}
        </div>
        <FlowbiteSidebar.Items>
          <FlowbiteSidebar.ItemGroup>

            {isAdmin && (

              <FlowbiteSidebar.Item href="#" className="hover:text-black icon">
                <GiHotMeal />
                <span className="icon-label">Combos</span>
              </FlowbiteSidebar.Item>
            )}
            {isAdmin && (

              <FlowbiteSidebar.Item href="#" className="hover:text-black icon">
                <MdMovie />
                <span className="icon-label">peliculas</span>
              </FlowbiteSidebar.Item>
            )}
            {!isAdmin && (
              <>
                <FlowbiteSidebar.Item href="#" className="hover:text-black icon">
                  <HiTicket />
                  <span className="icon-label">Boletas</span>
                </FlowbiteSidebar.Item>
                <FlowbiteSidebar.Item href="#" className="hover:text-black icon">
                  <HiShoppingCart />
                  <span className="icon-label">Carrito</span>
                </FlowbiteSidebar.Item>

              </>
            )}
               <FlowbiteSidebar.Item href="#" className="hover:text-black icon">
                  <HiOutlineChatAlt2 />
                  <span className="icon-label">Chat</span>
                </FlowbiteSidebar.Item>


          </FlowbiteSidebar.ItemGroup>
        </FlowbiteSidebar.Items>
        <div className="flex items-center mb-4 w-full" style={{ paddingLeft: '25px', marginTop: "44vh" }}>
          <div className="icon-container">
            <HiUser className="text-white" style={{ width: "40px", height: "40px" }} />
          </div>
          {isOpen && (
            <div>
              {isLoggedIn ? (
                <>
                  <span className="text-white font-semibold ml-2 overflow-hidden text-ellipsis whitespace-nowrap">{username || "Usuario"}</span>
                  <div
                    className="text-white font-semibold ml-2 overflow-hidden text-ellipsis whitespace-nowrap"
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                  >
                    Cerrar sesión
                  </div>
                </>
              ) : (
                <span
                  className="text-white font-semibold ml-2 overflow-hidden text-ellipsis whitespace-nowrap"
                  onClick={toggleModal}
                  style={{ cursor: "pointer" }}
                >
                  Iniciar sesión
                </span>
              )}
            </div>
          )}
        </div>
      </FlowbiteSidebar>
      <ModalLogin showModal={showModal} toggleModal={toggleModal} />
    </div>
  );
}
export default Sidebar;