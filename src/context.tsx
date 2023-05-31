import { getAccessToken, getProfileUser } from './utils/auths'
import React, { createContext, useState } from 'react'
import { User } from 'src/types/user.type'

interface AppContextProps {
  path_name: string
  setPathName: React.Dispatch<React.SetStateAction<string>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}
const defaultAppContext: AppContextProps = {
  path_name: '',
  setPathName: () => null,
  isAuthenticated: Boolean(getAccessToken()),
  setIsAuthenticated: () => null,
  user: getProfileUser(),
  setUser: () => null
}
export const AppContext = createContext<AppContextProps>(defaultAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultAppContext.isAuthenticated)
  const [path_name, setPathName] = useState<string>(defaultAppContext.path_name)
  const [user, setUser] = useState<User | null>(defaultAppContext.user)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setPathName,
        setIsAuthenticated,
        path_name,
        user,
        setUser
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
