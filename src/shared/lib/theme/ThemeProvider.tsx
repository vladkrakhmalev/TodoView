import { FC, ReactNode, useMemo, useState } from "react"
import { LOCAL_STORAGE_THEME_KEY, TTheme, ThemeContext } from "./themeContext"

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as TTheme || 'light'

interface IProps {
  children: ReactNode
}

export const ThemeProvider: FC<IProps> = ({ children }) => {
  const [theme, setTheme] = useState<TTheme>(defaultTheme)

  const defaultProps = useMemo(() => ({ theme, setTheme }), [theme])

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}