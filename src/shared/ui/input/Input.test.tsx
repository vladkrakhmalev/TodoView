import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('should render input with label', () => {
    render(<Input label='Test Label' onUpdate={vi.fn()} />)
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
  })

  it('should render input without label', () => {
    render(<Input onUpdate={vi.fn()} />)
    expect(screen.getByTestId('input')).toBeInTheDocument()
  })

  it('should handle value changes', () => {
    const handleUpdate = vi.fn()
    render(<Input onUpdate={handleUpdate} />)

    const input = screen.getByTestId('input')
    fireEvent.change(input, { target: { value: 'new value' } })

    expect(handleUpdate).toHaveBeenCalledWith('new value')
  })

  it('should set default date for date type when no value provided', () => {
    const handleUpdate = vi.fn()
    render(<Input type='date' onUpdate={handleUpdate} />)

    const today = new Date().toISOString().split('T')[0]
    const input = screen.getByTestId('input')
    expect(input).toHaveValue(today)
    expect(handleUpdate).toHaveBeenCalledWith(today)
  })

  it('should not set default date when value is provided', () => {
    const handleUpdate = vi.fn()
    render(<Input type='date' value='2024-04-11' onUpdate={handleUpdate} />)

    const input = screen.getByTestId('input')
    expect(input).toHaveValue('2024-04-11')
    expect(handleUpdate).not.toHaveBeenCalled()
  })

  it('should apply custom className', () => {
    render(<Input className='custom-class' onUpdate={vi.fn()} />)
    expect(screen.getByTestId('input').parentElement).toHaveClass(
      'custom-class'
    )
  })

  it('should handle different input types', () => {
    render(<Input type='number' onUpdate={vi.fn()} />)
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  })

  it('should handle ref prop', () => {
    const ref = { current: null }
    render(<Input inputRef={ref} onUpdate={vi.fn()} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('should handle disabled state', () => {
    render(<Input disabled onUpdate={vi.fn()} />)
    expect(screen.getByTestId('input')).toBeDisabled()
  })

  it('should handle placeholder', () => {
    render(<Input placeholder='Enter text' onUpdate={vi.fn()} />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })
})
