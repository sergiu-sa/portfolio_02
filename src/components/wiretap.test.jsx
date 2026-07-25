import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wiretap from './Wiretap.jsx';
import { wiretap } from '../data.js';

const player = () => screen.queryByTitle(/Spotify player/i);
const reelButton = (ref) =>
  screen.getByRole('button', { name: new RegExp(ref) });

describe('Wiretap', () => {
  it('holds the Spotify embed back until the visitor presses play', async () => {
    const user = userEvent.setup();
    render(<Wiretap />);

    expect(player()).toBeNull();
    await user.click(screen.getByRole('button', { name: /PRESS PLAY/i }));

    expect(player()).toHaveAttribute(
      'src',
      expect.stringContaining(wiretap.reels[0].id),
    );
  });

  it('loads nothing from Spotify while browsing reels unarmed', async () => {
    const user = userEvent.setup();
    render(<Wiretap />);

    // the whole point of the facade: selecting reels is free until you opt in
    for (const r of wiretap.reels.slice(1)) {
      await user.click(reelButton(r.ref));
      expect(player()).toBeNull();
    }
    expect(screen.getByText('STANDBY')).toBeInTheDocument();
  });

  it('swaps the mounted reel when another is selected, and marks only that one', async () => {
    const user = userEvent.setup();
    render(<Wiretap />);

    const [first, second] = wiretap.reels;
    await user.click(screen.getByRole('button', { name: /PRESS PLAY/i }));
    await user.click(reelButton(second.ref));

    expect(player()).toHaveAttribute('src', expect.stringContaining(second.id));
    expect(reelButton(second.ref)).toHaveAttribute('aria-pressed', 'true');
    expect(reelButton(first.ref)).toHaveAttribute('aria-pressed', 'false');
  });

  it('reports the running reel to assistive tech and flips the deck to LIVE', async () => {
    const user = userEvent.setup();
    render(<Wiretap />);

    await user.click(screen.getByRole('button', { name: /PRESS PLAY/i }));

    const status = screen.getByRole('status');
    expect(status).toHaveTextContent(wiretap.reels[0].name);
    expect(screen.getByText('LIVE')).toBeInTheDocument();
  });

  it('links out to the full profile in a new tab', () => {
    render(<Wiretap />);
    const link = screen.getByRole('link', { name: /FULL WIRETAP FILE/i });
    expect(link).toHaveAttribute('href', wiretap.profile);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
});
