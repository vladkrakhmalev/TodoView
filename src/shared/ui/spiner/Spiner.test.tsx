import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Spiner } from './Spiner'

describe('Spiner', () => {
  it('should render with default size', () => {
    render(<Spiner />)
    const spiner = screen.getByRole('status')
    expect(spiner).toHaveStyle({ width: '30px', height: '30px', borderWidth: '3.75px' })
  })

  it('should render with custom size', () => {
    render(<Spiner size={20} />)
    const spiner = screen.getByRole('status')
    expect(spiner).toHaveStyle({ width: '20px', height: '20px', borderWidth: '2.5px' })
  })

  it('should render with contrast class when contrast prop is true', () => {
    render(<Spiner contrast />)
    expect(screen.getByRole('status')).toHaveClass('spiner _contrast')
  })

  it('should not render with contrast class when contrast prop is false', () => {
    render(<Spiner contrast={false} />)
    expect(screen.getByRole('status')).not.toHaveClass('spiner _contrast')
  })

  it('should apply custom className', () => {
    render(<Spiner className="custom-class" />)
    expect(screen.getByRole('status')).toHaveClass('custom-class')
  })
}) 