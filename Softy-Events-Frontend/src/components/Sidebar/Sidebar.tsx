import SidebarItems from '@components/SidebarItems/SidebarItems'
import { Dispatch, SetStateAction } from 'react';

interface ISidebarProps {
  collapseSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.FC<ISidebarProps> = ({
  collapseSidebar,
  setShowSidebar,
}) => {
  return (
    <div className={`sidebar ${collapseSidebar ? 'collapse' : ''}`}>
      <div className='sidebar-logo-container'>
        {collapseSidebar ? 'S' : <><p>Softy<span>Events</span></p></>}
      </div>

      <div className='sidebar-content'>
        <div className='sidebar-nav-items'>
          <SidebarItems
            setShowSidebar={setShowSidebar}
            collapseSidebar={collapseSidebar}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar
