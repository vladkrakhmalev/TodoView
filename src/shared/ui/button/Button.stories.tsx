import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default button',
  },
}

export const Primary: Story = {
  args: {
    children: 'Primary button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary button',
    variant: 'secondary',
  },
}

export const Danger: Story = {
  args: {
    children: 'Danger button',
    variant: 'danger',
  },
}

export const Transparent: Story = {
  args: {
    children: 'Transparent button',
    variant: 'transparent',
  },
}

export const Loading: Story = {
  args: {
    children: 'Loading button',
    isLoading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled button',
    disabled: true,
  },
}

export const WithIconBefore: Story = {
  args: {
    children: 'Button with before Icon',
    iconBefore: 'pencil',
  },
}

export const WithIconAfter: Story = {
  args: {
    children: 'Button with after Icon',
    iconAfter: 'trash',
  },
}

export const SizeSmall: Story = {
  args: {
    children: 'Small Button',
    size: 'small',
  },
}

export const SizeMedium: Story = {
  args: {
    children: 'Medium Button',
    size: 'medium',
  },
}

export const SizeBig: Story = {
  args: {
    children: 'Big Button',
    size: 'big',
  },
}
