import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EvidencePlates from './EvidencePlates.jsx';
import Compare from './Compare.jsx';
import { evidenceById } from '../data.js';

const atlas = evidenceById.atlas;

describe('EvidencePlates', () => {
  it('renders the lead plate (FIG.1) and a contact sheet of the rest', () => {
    render(<EvidencePlates item={atlas} exhibits={atlas.exhibits} />);
    expect(screen.getByText(/FIG\. 1/)).toBeInTheDocument();
    const enlarge = screen.getAllByRole('button', { name: /enlarge/i });
    expect(enlarge).toHaveLength(atlas.exhibits.length + 1);
  });

  it('opens the lightbox on click and closes it on Escape', async () => {
    const user = userEvent.setup();
    render(<EvidencePlates item={atlas} exhibits={atlas.exhibits} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: /enlarge/i })[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('Compare slider', () => {
  it('is keyboard-operable and clamps between 0 and 100', async () => {
    const user = userEvent.setup();
    render(<Compare {...atlas.compare} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '50');

    slider.focus();
    await user.keyboard('{End}');
    expect(slider).toHaveAttribute('aria-valuenow', '100');
    await user.keyboard('{Home}');
    expect(slider).toHaveAttribute('aria-valuenow', '0');
    await user.keyboard('{ArrowRight}');
    expect(slider).toHaveAttribute('aria-valuenow', '2');
  });
});
