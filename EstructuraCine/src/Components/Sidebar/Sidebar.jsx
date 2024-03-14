import { useState } from 'react';
import { Sidebar as FlowbiteSidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import './Sidebar.css'; // Importa tu archivo de estilos CSS para el Sidebar si lo tienes

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el Sidebar está abierto o cerrado

  // Función para abrir el Sidebar
  const openSidebar = () => {
    setIsOpen(true);
  };

  // Función para cerrar el Sidebar
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`sidebar-container ${isOpen ? 'open' : ''}`}
      onMouseEnter={openSidebar} // Abrir el Sidebar cuando el mouse entra
      onMouseLeave={closeSidebar} // Cerrar el Sidebar cuando el mouse sale
    >
      <FlowbiteSidebar aria-label="Default sidebar example">
        <FlowbiteSidebar.Items>
          <FlowbiteSidebar.ItemGroup>
            <FlowbiteSidebar.Item href="#" icon={HiChartPie}>
              Perfil
            </FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
              Pages
            </FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item href="#" icon={HiInbox} label="3">
              Inbox
            </FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item href="#" icon={HiUser}>
              Users
            </FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item href="#" icon={HiShoppingBag}>
              Products
            </FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item href="#" icon={HiArrowSmRight}>
              Sign In
            </FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item href="#" icon={HiTable}>
              Sign Up
            </FlowbiteSidebar.Item>
          </FlowbiteSidebar.ItemGroup>
        </FlowbiteSidebar.Items>
      </FlowbiteSidebar>
    </div>
  );
}

export default Sidebar;
