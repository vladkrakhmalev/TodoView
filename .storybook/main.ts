import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async config => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@app': path.resolve(__dirname, '../src/app'),
          '@pages': path.resolve(__dirname, '../src/pages'),
          '@widgets': path.resolve(__dirname, '../src/widgets'),
          '@features': path.resolve(__dirname, '../src/features'),
          '@entities': path.resolve(__dirname, '../src/entities'),
          '@shared': path.resolve(__dirname, '../src/shared'),
        },
      },
    })
  },
}
export default config
