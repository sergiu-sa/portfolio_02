import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import FilePage from './FilePage.jsx';
import { evidenceById } from '../data.js';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/file/:id" element={<FilePage />} />
        <Route path="/" element={<div>HOME ROUTE</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('FilePage', () => {
  it('renders the codename + live-site action for a valid project id', () => {
    const atlas = evidenceById.atlas;
    renderAt('/file/atlas');
    expect(
      screen.getByRole('heading', { name: atlas.codename }),
    ).toBeInTheDocument();
    const live = screen.getByRole('link', { name: /VISIT LIVE SITE/i });
    expect(live).toHaveAttribute('href', atlas.live);
    expect(live).toHaveAttribute('target', '_blank');
  });

  it('redirects an unknown id to home', () => {
    renderAt('/file/does-not-exist');
    expect(screen.getByText('HOME ROUTE')).toBeInTheDocument();
  });
});
