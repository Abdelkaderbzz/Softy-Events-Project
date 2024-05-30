/* eslint-disable react-refresh/only-export-components */
import { ReactComponent as DashboardIcon } from '@assets/icons/sidebar/dashboard.svg'
import { ReactComponent as ProfileIcon } from '@assets/icons/sidebar/profile.svg'

export const SIDEBARITEMS = [
  {
    link: '/events',
    label: 'Events',
    icon: <DashboardIcon />,
  },
  {
    link: '/admin-settings',
    label: 'Admin-settings',
    icon: <ProfileIcon />,
  },


  {
    link: '/profile',
    label: 'Profile',
    icon: <ProfileIcon />,
  },
]
