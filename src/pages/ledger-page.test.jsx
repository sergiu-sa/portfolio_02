import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LedgerPage from './LedgerPage.jsx';
import { allEvidence } from '../data.js';

function renderLedger() {
  return render(
    <MemoryRouter initialEntries={['/ledger']}>
      <Routes>
        <Route path="/ledger" element={<LedgerPage />} />
        <Route path="/file/:id" element={<div>FILE ROUTE</div>} />
        <Route path="/" element={<div>HOME ROUTE</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('LedgerPage', () => {
  it('renders the ledger heading', () => {
    renderLedger();
    expect(
      screen.getByRole('heading', { name: /case ledger/i }),
    ).toBeInTheDocument();
  });

  it('links every exhibit straight to its file record', () => {
    renderLedger();
    for (const ev of allEvidence) {
      const link = screen.getByRole('link', {
        name: `Open file ${ev.ref} ${ev.codename}, ${ev.project}, ${ev.status}`,
      });
      expect(link).toHaveAttribute('href', `/file/${ev.id}`);
    }
  });

  it('presents the full roll as a list, one item per exhibit', () => {
    renderLedger();
    const items = screen
      .getAllByRole('listitem')
      .filter((li) => li.querySelector('a.roll-card'));
    expect(items).toHaveLength(allEvidence.length);
  });
});
