import { useState } from 'react';
import { Sidebar as FlowbiteSidebar } from 'flowbite-react';
import { HiOutlineChatAlt2 , HiShoppingCart , HiUser,HiTicket  } from 'react-icons/hi';
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
      <FlowbiteSidebar aria-label="Menu de Cine" >
        <FlowbiteSidebar.Items>
        <FlowbiteSidebar.ItemGroup>
        <FlowbiteSidebar.Item href="#" icon={HiUser}>
          Perfil
        </FlowbiteSidebar.Item>
        <FlowbiteSidebar.Item href="#" icon={HiTicket}>
          Tiquetes
        </FlowbiteSidebar.Item>
        <FlowbiteSidebar.Item href="#" icon={HiShoppingCart}>
          Carrito
        </FlowbiteSidebar.Item>
      </FlowbiteSidebar.ItemGroup>
      <FlowbiteSidebar.ItemGroup>
        <FlowbiteSidebar.Item href="#" icon={HiOutlineChatAlt2 }>
          Mensajes
        </FlowbiteSidebar.Item>
      </FlowbiteSidebar.ItemGroup>
        </FlowbiteSidebar.Items>
      </FlowbiteSidebar>
    </div>
  );
}

export default Sidebar;
