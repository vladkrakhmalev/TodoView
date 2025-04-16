import { createContext } from "react"


export type TTheme = 'light' | 'dark'

interface IProps {
  theme: TTheme
  setTheme: (theme: TTheme) => void
}

export const ThemeContext = createContext<IProps>({
  theme: 'light',
  setTheme: () => {},
})

export const LOCAL_STORAGE_THEME_KEY = 'theme'