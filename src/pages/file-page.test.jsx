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
    const ecom = evidenceById.ecom;
    renderAt('/file/ecom');
    expect(
      screen.getByRole('heading', { name: ecom.codename }),
    ).toBeInTheDocument();
    const live = screen.getByRole('link', { name: /VISIT LIVE SITE/i });
    expect(live).toHaveAttribute('href', ecom.live);
    expect(live).toHaveAttribute('target', '_blank');
  });

  it('links the project board in a new tab only when the record has one', () => {
    const nordic = evidenceById.nordic;
    const { unmount } = renderAt('/file/nordic');
    const boards = screen.getAllByRole('link', { name: /\bBOARD\b/ });
    expect(boards).toHaveLength(2);
    for (const link of boards) {
      expect(link).toHaveAttribute('href', nordic.board);
      expect(link).toHaveAttribute('target', '_blank');
    }
    unmount();

    expect(evidenceById.ecom.board).toBeUndefined();
    renderAt('/file/ecom');
    expect(screen.queryByRole('link', { name: /\bBOARD\b/ })).toBeNull();
  });

  it('redirects an unknown id to home', () => {
    renderAt('/file/does-not-exist');
    expect(screen.getByText('HOME ROUTE')).toBeInTheDocument();
  });
});
