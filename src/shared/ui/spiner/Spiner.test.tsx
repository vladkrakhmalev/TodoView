import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Spiner } from './Spiner'

describe('Spiner', () => {
  it('should render with default size', () => {
    render(<Spiner />)
    const spinerIcon = screen.getByTestId('spiner').querySelector('.spiner__icon')
    expect(spinerIcon).toHaveStyle({ width: '30px', height: '30px', borderWidth: '3.75px' })
  })

  it('should render with custom size', () => {
    render(<Spiner size={20} />)
    const spinerIcon = screen.getByTestId('spiner').querySelector('.spiner__icon')
    expect(spinerIcon).toHaveStyle({ width: '20px', height: '20px', borderWidth: '2.5px' })
  })

  it('should render with contrast class when contrast prop is true', () => {
    render(<Spiner contrast />)
    const spinerIcon = screen.getByTestId('spiner').querySelector('.spiner__icon')
    expect(spinerIcon).toHaveClass('_contrast')
  })

  it('should not render with contrast class when contrast prop is false', () => {
    render(<Spiner contrast={false} />)
    const spinerIcon = screen.getByTestId('spiner').querySelector('.spiner__icon')
    expect(spinerIcon).not.toHaveClass('_contrast')
  })

  it('should apply custom className', () => {
    render(<Spiner className="custom-class" />)
    const spinerIcon = screen.getByTestId('spiner').querySelector('.spiner__icon')
    expect(spinerIcon).toHaveClass('custom-class')
  })

  it('should render full spiner', () => {
    render(<Spiner full />)
    const spiner = screen.getByTestId('spiner')
    expect(spiner).toHaveClass('_full')
  })
  
  it('should not render full spiner when full prop is false', () => {
    render(<Spiner full={false} />)
    const spiner = screen.getByTestId('spiner')
    expect(spiner).not.toHaveClass('_full')
  })
}) 