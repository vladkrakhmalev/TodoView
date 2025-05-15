import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'

const meta = {
  title: 'Shared/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

// TODO Добавить декоратор для тестирования в контейнере

export const Default: Story = {
  args: {
    isOpen: true,
    children: <div>Modal</div>,
  },
}

export const WithTitle: Story = {
  args: {
    isOpen: true,
    title: 'Modal',
    children: <div>Modal</div>,
  },
}

export const WithLeftPosition: Story = {
  args: {
    isOpen: true,
    position: 'left',
    children: <div>Modal</div>,
  },
}

export const WithRightPosition: Story = {
  args: {
    isOpen: true,
    position: 'right',
    children: <div>Modal</div>,
  },
}

export const WithCenterPosition: Story = {
  args: {
    isOpen: true,
    position: 'center',
    children: <div>Modal</div>,
  },
}
