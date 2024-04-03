import React, { useState } from "react";
import { Sidebar as FlowbiteSidebar } from "flowbite-react";
import {
  HiOutlineChatAlt2,
  HiShoppingCart,
  HiUser,
  HiTicket,
} from "react-icons/hi";
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import "./Sidebar.css"; // Importa tu archivo de estilos CSS para el Sidebar si lo tienes

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el Sidebar está abierto o cerrado

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
      base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
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
      base: "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700",
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

  // Función para abrir/cerrar el Sidebar al hacer clic en la hamburguesa
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`sidebar-container ${isOpen ? "open" : "close"}`}>
      <FlowbiteSidebar aria-label="Menu de Cine" theme={customtema} className="Sidebar">
        <button className="hamburger" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <FlowbiteSidebar.Items>
          <FlowbiteSidebar.ItemGroup>
            <FlowbiteSidebar.Item
              className="hover:text-black icon"
              
            >
              <HiUser />
              <span className="icon-label "  >Perfil</span>
            </FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item
              href="#"
              
              className="hover:text-black icon"
            >
              <HiTicket  />
              <span className="icon-label " >Boletas</span>
            </FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item
              href="#"
              
              className="hover:text-black icon"
            >
              <HiShoppingCart />
              <span className="icon-label ">Carrito</span>
            </FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item
              href="#"
              
              className="hover:text-black icon"
            >
              <HiOutlineChatAlt2  />
              <span className="icon-label "  >Chat</span>
            </FlowbiteSidebar.Item>
          </FlowbiteSidebar.ItemGroup>
        </FlowbiteSidebar.Items>
      </FlowbiteSidebar>
    </div>
  );
}

export default Sidebar;