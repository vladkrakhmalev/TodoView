import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('should render button with primary variant', () => {
    render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('button _primary')
  })

  it('should render button with secondary variant by default', () => {
    render(<Button>Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('button _secondary')
  })

  it('should render button with danger variant', () => {
    render(<Button variant="danger">Danger</Button>)
    expect(screen.getByRole('button')).toHaveClass('button _danger')
  })

  it('should render button with icon before text', () => {
    render(<Button iconBefore="check">With icon</Button>)
    expect(screen.getByRole('button')).toContainElement(screen.getByTestId('icon-before'))
  })

  it('should render button with icon after text', () => {
    render(<Button iconAfter="check">With icon</Button>)
    expect(screen.getByRole('button')).toContainElement(screen.getByTestId('icon-after'))
  })

  it('should render button with full width', () => {
    render(<Button fullWidth>Full width</Button>)
    expect(screen.getByRole('button')).toHaveClass('button _full')
  })

  it('should render loading spiner when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>)
    expect(screen.getByRole('button')).toContainElement(screen.getByTestId('spiner'))
  })

  it('should be disabled when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should apply custom className', () => {
    render(<Button className="custom-class">Custom class</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('should handle click event', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    screen.getByRole('button').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
}) 