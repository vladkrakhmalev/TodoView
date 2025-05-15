import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Modal } from './Modal'

describe('Modal', () => {
  it('should render modal by default', () => {
    render(<Modal isOpen>Content</Modal>)

    expect(screen.getByTestId('modal')).toHaveClass('_open')
    expect(screen.getByTestId('modal')).toHaveClass('_center')
    expect(screen.queryByTestId('modal-title')).not.toBeInTheDocument()
  })

  it('should not render when isOpen is false', () => {
    render(<Modal isOpen={false}>Content</Modal>)
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('should render when isOpen is true', () => {
    render(<Modal isOpen>Content</Modal>)
    expect(screen.getByTestId('modal')).toBeInTheDocument()
  })

  it('should render children', () => {
    render(
      <Modal isOpen>
        <div data-testid='test-content'>Test Content</div>
      </Modal>
    )
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
  })

  it('should render modal with title', () => {
    render(
      <Modal isOpen title='Test Title'>
        Content
      </Modal>
    )

    expect(screen.getByTestId('modal-title')).toHaveTextContent('Test Title')
  })

  it('should render with left position', () => {
    render(
      <Modal isOpen position='left'>
        Content
      </Modal>
    )
    expect(screen.getByTestId('modal')).toHaveClass('modal _left')
  })

  it('should render with right position', () => {
    render(
      <Modal isOpen position='right'>
        Content
      </Modal>
    )
    expect(screen.getByTestId('modal')).toHaveClass('modal _right')
  })

  it('should call onClose when clicking close button', () => {
    const handleClose = vi.fn()
    render(
      <Modal isOpen onClose={handleClose}>
        Content
      </Modal>
    )

    screen.getByTestId('modal-close').click()
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when clicking outside modal', () => {
    const handleClose = vi.fn()
    render(
      <Modal isOpen onClose={handleClose}>
        Content
      </Modal>
    )

    screen.getByTestId('modal').click()
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('should not call onClose when clicking inside modal', () => {
    const handleClose = vi.fn()
    render(
      <Modal isOpen onClose={handleClose}>
        Content
      </Modal>
    )

    screen.getByTestId('modal-container').click()
    expect(handleClose).not.toHaveBeenCalled()
  })
})
