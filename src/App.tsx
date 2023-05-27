import useRouters from './useRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const routerElements = useRouters()
  return (
    <div>
      {routerElements}
      <ToastContainer />
    </div>
  )
}

export default App
