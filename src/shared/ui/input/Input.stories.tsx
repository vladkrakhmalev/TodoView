import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Shared/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: '',
    onUpdate: value => console.log(value),
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Имя пользователя',
    value: '',
    onUpdate: value => console.log(value),
  },
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Введите текст',
    value: '',
    onUpdate: value => console.log(value),
  },
}

export const WithValue: Story = {
  args: {
    value: 'Предустановленное значение',
    onUpdate: value => console.log(value),
  },
}

export const DateType: Story = {
  args: {
    type: 'date',
    label: 'Выберите дату',
    onUpdate: value => console.log(value),
  },
}

export const NumberType: Story = {
  args: {
    type: 'number',
    label: 'Количество',
    value: 0,
    onUpdate: value => console.log(value),
  },
}

export const Disabled: Story = {
  args: {
    value: 'Недоступное поле',
    disabled: true,
    onUpdate: value => console.log(value),
  },
}
