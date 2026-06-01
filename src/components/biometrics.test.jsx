import { render } from '@testing-library/react'
import Fingerprints from './Fingerprints.jsx'
import PhotoArray from './PhotoArray.jsx'
import { photoArray } from '../data.js'

describe('Fingerprints', () => {
  it('renders a full FD-258 ten-print card', () => {
    const { container } = render(<Fingerprints />)
    expect(container.querySelectorAll('.fpcell')).toHaveLength(10)
  })
})

describe('PhotoArray', () => {
  it('renders one cut-out per photoArray entry', () => {
    const { container } = render(<PhotoArray />)
    expect(container.querySelectorAll('.cutout')).toHaveLength(photoArray.length)
  })
})
