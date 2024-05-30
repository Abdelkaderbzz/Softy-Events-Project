import menuIcon from '../../assets/icons/navbar/menu.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import ThemeButton from '../ThemeButton/ThemeButton'
import { Avatar, Button, Dropdown, MenuProps, Space } from 'antd'
import enFlagIcon from '../../assets/icons/navbar/en-flag.png'
import frFlagIcon from '../../assets/icons/navbar/fr-flag.png'
import arFlagIcon from '../../assets/icons/navbar/ar-flag.png'
import { ReactComponent as ProfileIcon } from '../../assets/icons/sidebar/profile.svg'
import { ReactComponent as LogoutIcon } from '../../assets/icons/navbar/logout.svg'
import { useAppDispatch } from '../../store'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/index'
import { logout } from '@src/store/slices/auth/authSlice'

interface INavbarProps {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
  setCollapseSidebar: React.Dispatch<React.SetStateAction<boolean>>
  collapseSidebar: boolean
}

const Navbar: React.FC<INavbarProps> = ({
  setShowSidebar,
  setCollapseSidebar,
  collapseSidebar,
}) => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const { t, i18n } = useTranslation('translation')
  const navigate = useNavigate()
  const [lang, setLang] = useState(i18n?.language?.toString())
  const { user } = useSelector((state: RootState) => state.auth)
  
  const onChangeLanguage = (language: string) => {
    i18n.changeLanguage(language)
    setLang(language)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const languagesItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="navbar-flag-container" onClick={() => onChangeLanguage('en')}>
          <img src={enFlagIcon} alt="flag" className="navbar-flag" />
          <p>{t('language.en')}</p>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className="navbar-flag-container" onClick={() => onChangeLanguage('fr')}>
          <img src={frFlagIcon} alt="flag" className="navbar-flag" />
          <p>{t('language.fr')}</p>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div className="navbar-flag-container" onClick={() => onChangeLanguage('ar')}>
          <img src={arFlagIcon} alt="flag" className="navbar-flag" />
          <p>{t('language.ar')}</p>
        </div>
      ),
    },
  ]

  const accountInfoItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Space>
          {user?.avatar ? (
            <img src={`/users/${user?.avatar}`} alt="User" className="user-avatar" />
          ) : (
            <Avatar size={32} className="navbar-avatar">
              {/* {user?.name?.substring(0, 2)?.toUpperCase()} */}
            </Avatar>
          )}
          <div className="navbar-account-info">
            <p className="sidebar-accountinfo-item">{user?.email}</p>
            {/* <p>Name: {user?.name}</p> */}
          </div>
        </Space>
      ),

      disabled: true,
    },
    {
      key: '2',
      label: (
        <div className='dropdown-navigation-btn' onClick={() => navigate('/profile')}>
          <ProfileIcon style={{ stroke: 'black', width: '18px', height: '18px' }} />
          <span>Profile</span>
        </div>
      ),
    },

    {
      key: '4',
      label: (
        <div className='dropdown-navigation-btn' onClick={handleLogout}>
          <LogoutIcon style={{ stroke: 'black', width: '18px', height: '18px' }} />
          <span>logout</span>
        </div>
      ),
    },
  ]

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img
          src={menuIcon}
          alt="menu"
          className="navbar-left-menu-icon"
          onClick={() => {
            setCollapseSidebar(false)
            setShowSidebar(true)
          }}
        />
        <img
          src={menuIcon}
          alt="menu"
          className="navbar-left-menu-icon-collapse"
          onClick={() => setCollapseSidebar(!collapseSidebar)}
        />
        <p className="navbar-left-title">{pathname.split('/')[1]}</p>
      </div>
      <div className="navbar-right">
        <Space size={'middle'}>
          <Dropdown
            menu={{ items: languagesItems }}
            trigger={['click']}
            placement="bottomRight"
            arrow
          >
            <Button type="link" shape="circle">
              <div className="navbar-flag-container">
                <img
                  src={lang === 'en' ? enFlagIcon : lang === 'fr' ? frFlagIcon : arFlagIcon}
                  alt="flag"
                  className="navbar-flag"
                />
              </div>
            </Button>
          </Dropdown>

          <Dropdown
            menu={{ items: accountInfoItems }}
            trigger={['click']}
            placement="bottomRight"
            arrow
            className="navbar-dropdown-cursor"
          >
            <Space>
              {user?.avatar ? (
                <img src={`/users/${user?.avatar}`} alt="User" className="user-avatar" />
              ) : (
                <Avatar size={32} className="navbar-avatar">
                  {/* {user?.name.substring(0, 2).toUpperCase()} */}
                </Avatar>
              )}
            </Space>
          </Dropdown>
        </Space>

        <ThemeButton />
      </div>
    </div>
  )
}

export default Navbar
