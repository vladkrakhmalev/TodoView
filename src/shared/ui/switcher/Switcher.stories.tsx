import type { Meta, StoryObj } from '@storybook/react'
import { Switcher } from './Switcher'

const meta = {
  title: 'Shared/Switcher',
  component: Switcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { value: '1', title: 'Option 1' },
      { value: '2', title: 'Option 2' },
      { value: '3', title: 'Option 3' },
    ],
    onChange: option => console.log(option),
  },
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: '2',
    options: [
      { value: '1', title: 'Option 1' },
      { value: '2', title: 'Option 2' },
      { value: '3', title: 'Option 3' },
    ],
    onChange: option => console.log(option),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    options: [
      { value: '1', title: 'Option 1' },
      { value: '2', title: 'Option 2' },
      { value: '3', title: 'Option 3' },
    ],
    onChange: option => console.log(option),
  },
}
