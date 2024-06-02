import { useState, useEffect, useRef } from "react";
import { Sidebar as FlowbiteSidebar } from "flowbite-react";
import { MdOutlineFastfood } from 'react-icons/md';
import { BiSolidCameraMovie } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserLarge } from "react-icons/fa6";






import { Link } from "react-router-dom";
import ModalLogin from "../../Pages/Login/Login";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isAdmin, setisAdmin] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const sidebarRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoggedIn(true);
      const storedUsername = localStorage.getItem('username');
      const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
      setisAdmin(storedIsAdmin);
      setUsername(storedUsername);
    }
  }, []);

  const logout = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
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

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 500); // El tiempo debe coincidir con la transición CSS de cierre del sidebar
    }
  };

  const handleButtonClick = (callback) => {
    if (!isClosing) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      startCloseTimer();
    }
  }, [isOpen]);

  const startCloseTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 5000);
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
    <div className={`sidebar-container ${isOpen ? "open" : "close"} flex flex-col top-0 w-[100px] h-full transition-[width_0.3s_ease_in_out] z-[199999]`} ref={sidebarRef}>
      <FlowbiteSidebar aria-label="Menu de Cine" theme={customtema} className="Sidebar fixed top-0 w-[110px] h-full transition-[width_0.5s_ease_in_out] z-[199999]">
        <div className="flex items-center justify-start">
          <button className="hamburger text-white text-2xl p-6" onClick={() => handleButtonClick(toggleSidebar)}>
            <GiHamburgerMenu style={{ width: "30px", height: "30px" }}/>
          </button>

          {isOpen && (
          <Link to="/" className={`text-white font-semibold overflow-hidden text-ellipsis whitespace-nowrap ${!isOpen && 'hidden'}`}>
          Cine Magic
        </Link>          )}
        </div>
        <FlowbiteSidebar.Items>
          <FlowbiteSidebar.ItemGroup>

            {isAdmin && (
              <FlowbiteSidebar.Item href="allMovies" className="hover:text-black icon" onClick={() => handleButtonClick(() => {/* Tu lógica aquí */})}>
                <BiSolidCameraMovie style={{ width: "30px", height: "30px" }}/>
                <span className="icon-label ml-10">Peliculas</span>
              </FlowbiteSidebar.Item>
            )}
                        {isAdmin && (
              <FlowbiteSidebar.Item href="allCombos" className="hover:text-black icon" onClick={() => handleButtonClick(() => {/* Tu lógica aquí */})}>
                <MdOutlineFastfood  style={{ width: "30px", height: "30px" }} />
                <span className="icon-label ml-10">Combos</span>
              </FlowbiteSidebar.Item>
            )}
            {!isAdmin && (
              <>
                <FlowbiteSidebar.Item href="/listMovies" className="hover:text-black icon" onClick={() => handleButtonClick(() => {/* Tu lógica aquí */})}>
                  <BiSolidCameraMovie style={{ width: "30px", height: "30px" }}/>
                  <span className="icon-label ml-10">Peliculas</span>
                </FlowbiteSidebar.Item>
                <FlowbiteSidebar.Item href="/purchase-summary" className="hover:text-black icon" onClick={() => handleButtonClick(() => {/* Tu lógica aquí */})}>
                  <FaShoppingCart style={{ width: "30px", height: "30px" }} />
                  <span className="icon-label ml-10">Carrito</span>
                </FlowbiteSidebar.Item>
              </>
            )}
            <FlowbiteSidebar.Item href="/chat" className="hover:text-black icon" onClick={() => handleButtonClick(() => {/* Tu lógica aquí */})}>
              <IoChatbox style={{ width: "30px", height: "30px" }} />
              <span className="icon-label ml-10">Chat</span>
            </FlowbiteSidebar.Item>
          </FlowbiteSidebar.ItemGroup>
        </FlowbiteSidebar.Items>
        <div className="flex items-center mb-4 w-full" style={{ paddingLeft: '25px', marginTop: "46vh" }}>
          <div className="icon-container">
            <FaUserLarge  className="text-white" style={{ width: "30px", height: "30px" }} />
          </div>
          {isOpen && (
            <div>
              {isLoggedIn ? (
                <>
                  <span className="text-white font-semibold ml-2 overflow-hidden text-ellipsis whitespace-nowrap">{username || "Usuario"}</span>
                  <button
                    className="text-black bg-white font-semibold ml-3 overflow-hidden text-ellipsis whitespace-nowrap w-[130px] h-[40px] rounded-md "
                    onClick={() => handleButtonClick(logout)}
                    style={{ cursor: "pointer" }}
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <button
                  className="text-black ml-5 font-semibold soverflow-hidden text-ellipsis whitespace-nowrap  bg-white rounded-lg w-[130px] h-[40px]"
                  onClick={() => handleButtonClick(toggleModal)}
                  style={{ cursor: "pointer" }}
                >
                  Iniciar sesión
                </button>
              )}
            </div>
          )}
        </div>
      </FlowbiteSidebar>
      <ModalLogin showModal={showModal} toggleModal={toggleModal} context='sidebar' />
    </div>
  );
}

export default Sidebar;
