import { useRoutes, Outlet, Navigate } from 'react-router-dom'
import { AppContext } from './context'
import SignUpLayout from './layouts/signupLayout'
import ProductList from './pages/ProductList'
import AuthorPage from './pages/AuthorPage'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile/index'
import { useContext } from 'react'
import path from './constants/path'
const ProtectRoutes = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}
const RejectRoutes = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}
export default function useRouters() {
  const routers = useRoutes([
    {
      path: path.home,
      element: <RejectRoutes />,
      children: [
        {
          path: path.login,
          element: (
            <SignUpLayout>
              <AuthorPage />
            </SignUpLayout>
          )
        }
      ]
    },
    {
      path: path.home,
      element: <RejectRoutes />,
      children: [
        {
          path: path.register,
          element: (
            <SignUpLayout>
              <AuthorPage />
            </SignUpLayout>
          )
        }
      ]
    },
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.home,
      element: <ProtectRoutes />,
      children: [
        {
          path: path.profile,
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
