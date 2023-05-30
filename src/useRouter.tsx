import { useRoutes, useLocation, Outlet, Navigate } from 'react-router-dom'
import { AppContext } from './context'
import SignUpLayout from './layouts/signupLayout'
import ProductList from './pages/ProductList'
import AuthorPage from './pages/AuthorPage'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile/index'
import { useContext } from 'react'

const ProtectRoutes = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
const RejectRoutes = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
export default function useRouters() {
  const routers = useRoutes([
    {
      path: '',
      element: <RejectRoutes />,
      children: [
        {
          path: '/login',
          element: (
            <SignUpLayout>
              <AuthorPage />
            </SignUpLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectRoutes />,
      children: [
        {
          path: '/register',
          element: (
            <SignUpLayout>
              <AuthorPage />
            </SignUpLayout>
          )
        }
      ]
    },
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectRoutes />,
      children: [
        {
          path: '/profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    }
  ])
  return routers
}
