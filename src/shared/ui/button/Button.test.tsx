import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('should render button by default', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByTestId('button')).toHaveTextContent('Click me')
    expect(screen.getByTestId('button')).toHaveClass('_secondary')
    expect(screen.getByTestId('button')).toHaveClass('_medium')
  })

  it('should render button with primary variant', () => {
    render(<Button variant='primary'>Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('button _primary')
  })

  it('should render button with danger variant', () => {
    render(<Button variant='danger'>Danger</Button>)
    expect(screen.getByRole('button')).toHaveClass('button _danger')
  })

  it('should render button with icon before text', () => {
    render(<Button iconBefore='check'>With icon</Button>)
    expect(screen.getByRole('button')).toContainElement(
      screen.getByTestId('icon-before')
    )
  })

  it('should render button with icon after text', () => {
    render(<Button iconAfter='check'>With icon</Button>)
    expect(screen.getByRole('button')).toContainElement(
      screen.getByTestId('icon-after')
    )
  })

  it('should render button with small size', () => {
    render(<Button size='small'>Small</Button>)
    expect(screen.getByTestId('button')).toHaveClass('_small')
  })

  it('should render button with medium size by default', () => {
    render(<Button>Medium</Button>)
    expect(screen.getByTestId('button')).toHaveClass('_medium')
  })

  it('should render button with big size', () => {
    render(<Button size='big'>Big</Button>)
    expect(screen.getByTestId('button')).toHaveClass('_big')
  })

  it('should render button with full width', () => {
    render(<Button fullWidth>Full width</Button>)
    expect(screen.getByRole('button')).toHaveClass('button _full')
  })

  it('should render loading spiner when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>)
    expect(screen.getByRole('button')).toContainElement(
      screen.getByTestId('spiner')
    )
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
    render(<Button className='custom-class'>Custom class</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('should handle click event', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    screen.getByRole('button').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
