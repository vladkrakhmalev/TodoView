import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { Switcher } from './Switcher'

describe('Switcher', () => {
  const options = [
    { value: 'option1', title: 'Option 1' },
    { value: 'option2', title: 'Option 2' },
    { value: 'option3', title: 'Option 3' }
  ]

  it('should render all options', () => {
    render(<Switcher options={options} onChange={vi.fn()} />)
    options.forEach(option => {
      expect(screen.getByText(option.title)).toBeInTheDocument()
    })
  })

  it('should set default value when provided', () => {
    render(<Switcher options={options} defaultValue="option2" onChange={vi.fn()} />)
    const option2 = screen.getByText('Option 2')
    expect(option2.parentElement).toHaveClass('switcher__item')
    expect(option2.parentElement).toHaveClass('_active')
  })

  it('should not have active item when no default value', () => {
    render(<Switcher options={options} onChange={vi.fn()} />)
    options.forEach(option => {
      const element = screen.getByText(option.title).parentElement
      expect(element).toHaveClass('switcher__item')
      expect(element).not.toHaveClass('_active')
    })
  })

  it('should handle option selection', () => {
    const handleChange = vi.fn()
    render(<Switcher options={options} onChange={handleChange} />)
    
    const option2 = screen.getByText('Option 2')
    act(() => {
      option2.click()
    })
    
    expect(handleChange).toHaveBeenCalledWith(options[1])
    expect(option2.parentElement).toHaveClass('switcher__item')
    expect(option2.parentElement).toHaveClass('_active')
  })

  it('should update active state when selecting different options', () => {
    const handleChange = vi.fn()
    render(<Switcher options={options} onChange={handleChange} />)
    
    const option1 = screen.getByText('Option 1')
    const option3 = screen.getByText('Option 3')
    
    act(() => {
      option1.click()
    })
    expect(option1.parentElement).toHaveClass('switcher__item')
    expect(option1.parentElement).toHaveClass('_active')
    
    act(() => {
      option3.click()
    })
    expect(option1.parentElement).toHaveClass('switcher__item')
    expect(option1.parentElement).not.toHaveClass('_active')
    expect(option3.parentElement).toHaveClass('switcher__item')
    expect(option3.parentElement).toHaveClass('_active')
  })

  it('should handle empty options array', () => {
    render(<Switcher options={[]} onChange={vi.fn()} />)
    expect(screen.getByTestId('switcher')).toBeEmptyDOMElement()
  })
}) 