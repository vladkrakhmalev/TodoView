import type { Meta, StoryObj } from '@storybook/react'
import { Dialog } from './Dialog'

const meta = {
  title: 'Shared/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    trigger: <button>Открыть диалог</button>,
    children: <div>Содержимое</div>,
  },
}

export const LeftPosition: Story = {
  args: {
    trigger: <button>Открыть комонент слева</button>,
    children: <div>Содержимое</div>,
    position: 'left',
  },
}

export const RightPosition: Story = {
  args: {
    trigger: <button>Открыть компонент справа</button>,
    children: <div>Содержимое</div>,
    position: 'right',
  },
}

export const CenterPosition: Story = {
  args: {
    trigger: <button>Открыть по центру</button>,
    children: <div>Содержимое</div>,
    position: 'center',
  },
}
