import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Redacted, Stamp, Barcode } from './primitives.jsx'

describe('Redacted', () => {
  it('starts classified and toggles on click', async () => {
    const user = userEvent.setup()
    render(<Redacted>OSLO</Redacted>)

    const el = screen.getByRole('button')
    expect(el).toHaveAttribute('aria-pressed', 'false')

    await user.click(el)
    expect(el).toHaveAttribute('aria-pressed', 'true')

    await user.click(el)
    expect(el).toHaveAttribute('aria-pressed', 'false')
  })

  it('toggles via keyboard (Enter / Space)', async () => {
    const user = userEvent.setup()
    render(<Redacted>OSLO</Redacted>)
    const el = screen.getByRole('button')

    el.focus()
    await user.keyboard('{Enter}')
    expect(el).toHaveAttribute('aria-pressed', 'true')

    await user.keyboard(' ')
    expect(el).toHaveAttribute('aria-pressed', 'false')
  })

  it('always renders its text (declassifiable, never destroyed)', () => {
    render(<Redacted>SERGIU D. KANE</Redacted>)
    expect(screen.getByText('SERGIU D. KANE')).toBeInTheDocument()
  })
})

describe('Stamp', () => {
  it('applies the rotation via a CSS custom property', () => {
    render(<Stamp rotate={4}>RECEIVED</Stamp>)
    const el = screen.getByText('RECEIVED')
    expect(el).toHaveStyle({ '--rot': '4deg' })
  })
})

describe('Barcode', () => {
  it('renders a real Code128 barcode with the value as accessible label + caption', () => {
    render(<Barcode value="FED-S023" />)
    const img = screen.getByRole('img', { name: /FED-S023/ })
    expect(img).toBeInTheDocument()
    // human-readable caption beneath the bars
    expect(screen.getByText('FED-S023')).toBeInTheDocument()
    // bars are drawn as <rect> elements inside the svg
    expect(img.querySelectorAll('rect').length).toBeGreaterThan(10)
  })
})
