import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Dialog } from './Dialog'

// TODO: Добавить тесты на закрытие диалога при клике вне него

describe('Dialog', () => {
  it('should render with a closed container by default', () => {
    render(
      <Dialog trigger={<button>Open</button>}>
        <div>Dialog content</div>
      </Dialog>
    )

    expect(screen.getByTestId('dialog')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-trigger')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-container')).not.toHaveClass('_open')
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('should open when the trigger is clicked', () => {
    render(
      <Dialog trigger={<button>Open</button>}>
        <div>Dialog content</div>
      </Dialog>
    )

    fireEvent.click(screen.getByTestId('dialog-trigger'))
    expect(screen.getByTestId('dialog-container')).toHaveClass('_open')
    expect(screen.getByText('Dialog content')).toBeInTheDocument()
  })

  it('should close when the trigger is clicked again', () => {
    render(
      <Dialog trigger={<button>Open</button>}>
        <div>Dialog content</div>
      </Dialog>
    )

    fireEvent.click(screen.getByTestId('dialog-trigger'))
    expect(screen.getByTestId('dialog-container')).toHaveClass('_open')

    fireEvent.click(screen.getByTestId('dialog-trigger'))
    expect(screen.getByTestId('dialog-container')).not.toHaveClass('_open')
  })

  it('should properly render the passed content', () => {
    render(
      <Dialog trigger={<button>Open</button>}>
        <div data-testid="custom-content">Test content</div>
      </Dialog>
    )

    fireEvent.click(screen.getByTestId('dialog-trigger'))
    
    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
})
