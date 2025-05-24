import '@app/style/index.css'
import { TTheme } from '@shared/lib/theme/themeContext'
import { Decorator } from '@storybook/react'

export const ThemeDecorator =
  (theme: TTheme): Decorator =>
  Story => (
    <div
      id='app'
      className='app'
      data-theme={theme}
      style={{ padding: 20, borderRadius: 10, minHeight: 'auto' }}
    >
      <Story />
    </div>
  )
