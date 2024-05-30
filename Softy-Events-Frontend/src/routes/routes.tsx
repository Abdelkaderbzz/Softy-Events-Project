/* eslint-disable react-refresh/only-export-components */
import { Fragment, lazy } from 'react'
import { Navigate, RouteProps } from 'react-router-dom'

const GuestLayout = lazy(() => import('../layout/GuestLayout/GuestLayout'))
const MainLayout = lazy(() => import('../layout/MainLayout/MainLayout'))

import GuestGuard from './guards/GuestGuard'
import AuthGuard from './guards/AuthGuard'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment | any
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  // GuestGuard Routes
  {
    exact: true,
    path: '/',
    guard: GuestGuard,
    component: () => <Navigate to="/login" />,
  },
  {
    exact: true,
    path: '/register',
    guard: GuestGuard,
    component: lazy(() => import('../pages/Register')),
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('../pages/Login')),
    layout: GuestLayout,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/verification',
    component: lazy(() => import('../pages/EmailConfirm')),
    layout: GuestLayout,
  },

  // AuthGuard Routes
  {
    exact: true,
    guard: AuthGuard,
    path: '/events',
    component: lazy(() => import('../pages/Events')),
    layout: MainLayout,
  },

  {
    exact: true,
    guard: AuthGuard,
    path: '/profile',
    component: lazy(() => import('../pages/Profile')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/admin-settings',
    component: lazy(() => import('../pages/AdminSettings')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/role',
    component: lazy(() => import('./../pages/Role')),
    layout: MainLayout,
  },

  {
    exact: true,
    guard: AuthGuard,
    path: '/role/create',
    component: lazy(() => import('./../features/Admin//RoleForm/RoleForm')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/role/:id',
    component: lazy(() => import('./../features/Admin//RoleForm/RoleForm')),
    layout: MainLayout,
  },

  // Public Routes
  {
    exact: true,
    path: '*',
    component: lazy(() => import('../pages/NotFound')),
  },
]

export default routes
