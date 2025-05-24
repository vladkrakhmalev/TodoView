import { useContext } from 'react'
import { LOCAL_STORAGE_THEME_KEY, TTheme, ThemeContext } from './themeContext'

interface IResult {
  theme: TTheme
  toggleTheme: () => void
}

export const useTheme = (): IResult => {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  return {
    theme,
    toggleTheme,
  }
}
