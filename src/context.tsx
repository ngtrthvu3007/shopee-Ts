import { getAccessToken } from './utils/auths'
import React, { createContext, useState } from 'react'

interface AppContextProps {
  path_name: string
  setPathName: React.Dispatch<React.SetStateAction<string>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}
const defaultAppContext: AppContextProps = {
  path_name: '',
  setPathName: () => null,
  isAuthenticated: Boolean(getAccessToken()),
  setIsAuthenticated: () => null
}
export const AppContext = createContext<AppContextProps>(defaultAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultAppContext.isAuthenticated)
  const [path_name, setPathName] = useState<string>(defaultAppContext.path_name)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setPathName,
        setIsAuthenticated,
        path_name
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
