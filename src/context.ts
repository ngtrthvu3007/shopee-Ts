import { createContext } from 'react'
interface AppContextProps {
  path_name: string
}
const defaultAppContext: AppContextProps = {
  path_name: '' // Thay đổi giá trị mặc định tùy theo nhu cầu của bạn
}
const AppContext = createContext<AppContextProps>(defaultAppContext)
export const AppProvider = AppContext.Provider
export const AppConsumer = AppContext.Consumer
export default AppContext
