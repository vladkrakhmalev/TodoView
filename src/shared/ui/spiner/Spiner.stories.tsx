import type { Meta, StoryObj } from '@storybook/react'
import { Spiner } from './Spiner'

const meta = {
  title: 'Shared/Spiner',
  component: Spiner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spiner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Small: Story = {
  args: {
    size: 10,
  },
}

export const Medium: Story = {
  args: {
    size: 30,
  },
}

export const Large: Story = {
  args: {
    size: 50,
  },
}

export const Full: Story = {
  args: {
    full: true,
  },
}

export const FullScreen: Story = {
  args: {
    fullScreen: true,
  },
}

export const Contrast: Story = {
  args: {
    contrast: true,
  },
  render: args => (
    <div
      style={{
        backgroundColor: '#444',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <Spiner {...args} />
    </div>
  ),
}
