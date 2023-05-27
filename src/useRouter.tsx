import { useRoutes, useLocation } from 'react-router-dom'
import { AppProvider } from './context'
import SignUpLayout from './layouts/signupLayout'
import ProductList from './pages/ProductList'
import AuthorPage from './pages/AuthorPage'

export default function useRouters() {
  const location = useLocation()
  const paths = ['/login', '/register']
  const context = {
    path_name: location.pathname
  }
  const routers = useRoutes([
    { path: '/', element: <ProductList /> },
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
  ])
  return routers
}
