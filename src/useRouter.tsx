import { useRoutes, useLocation, Outlet, Navigate } from 'react-router-dom'
import { AppProvider } from './context'
import SignUpLayout from './layouts/signupLayout'
import ProductList from './pages/ProductList'
import AuthorPage from './pages/AuthorPage'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile/index'

const isAuthenticated = false
const ProtectRoutes = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
const RejectRoutes = () => {
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
export default function useRouters() {
  const location = useLocation()
  const paths = ['/login', '/register']
  const context = {
    path_name: location.pathname
  }
  const routers = useRoutes([
    {
      path: '',
      element: <RejectRoutes />,
      children: [
        ...paths.map((path) => ({
          path,
          element: (
            <AppProvider value={context}>
              <SignUpLayout>
                <AuthorPage />
              </SignUpLayout>
            </AppProvider>
          )
        }))
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
