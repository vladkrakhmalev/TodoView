import type { Preview } from '@storybook/react'
import { StyleDecorator, ThemeDecorator } from '../src/shared/config/storybook'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [StyleDecorator, ThemeDecorator('light')],
}

export default preview
