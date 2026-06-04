import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from './ThemeToggle.jsx';

beforeEach(() => {
  document.documentElement.removeAttribute('data-theme');
  localStorage.clear();
});

describe('ThemeToggle — the light switch', () => {
  it('defaults to dark and turns the lights on, saving the choice', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const on = screen.getByRole('button', { name: /turn the lights on/i });
    expect(on).toHaveAttribute('aria-pressed', 'false');

    await user.click(on);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('fed-theme')).toBe('light');
    expect(
      screen.getByRole('button', { name: /turn the lights off/i }),
    ).toHaveAttribute('aria-pressed', 'true');
  });

  it('turns the lights back off and clears the attribute', async () => {
    const user = userEvent.setup();
    document.documentElement.setAttribute('data-theme', 'light');
    render(<ThemeToggle />);

    await user.click(
      screen.getByRole('button', { name: /turn the lights off/i }),
    );

    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
    expect(localStorage.getItem('fed-theme')).toBe('dark');
  });
});
