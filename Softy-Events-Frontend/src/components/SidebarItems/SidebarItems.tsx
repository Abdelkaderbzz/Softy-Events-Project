import {  useLocation,  useNavigate } from 'react-router-dom';
import { SIDEBARITEMS } from '@components/Sidebar/items';
import { Dispatch, SetStateAction } from 'react';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';

interface ISidebarItemsProps {
  collapseSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const SidebarItems: React.FC<ISidebarItemsProps> = ({
  collapseSidebar,
  setShowSidebar,
}) =>
{
  const { user }:{user:any} = useSelector((state: RootState) => state.auth)
  const code = user?.role?.code
  const { pathname } = useLocation();
  const navigate = useNavigate()
  return (
    <div className='sidebar-items'>
      {SIDEBARITEMS?.map((route, index) =>
      {
        if (route.label === 'Admin-settings' && code !== 'ADMIN') {
          return null
        } else {
          return (
            <div
              onClick={() => {
                navigate(route?.link)
                setShowSidebar(false)
              }}
              key={index}
              className={`item ${'/' + pathname.split('/')[1] === route?.link && 'active'}`}
            >
              <div
                className={`link-icon-stroke-color ${
                  '/' + pathname.split('/')[1] === route?.link && 'link-icon-stroke-color-active'
                }`}
              >
                {route?.icon}
              </div>
              {!collapseSidebar ? route?.label.toUpperCase() : null}
            </div>
          )
        }
      })}
    </div>
  );
};

export default SidebarItems;
