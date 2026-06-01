import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RecordPage from './RecordPage.jsx';

const renderRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('RecordPage — declassification game', () => {
  it('counts every redaction on the page and reveals them all with FULL DISCLOSURE', async () => {
    const user = userEvent.setup();
    renderRouter(<RecordPage />);

    // five redactions on file: the mugshot eyes-bar, two list items, two collage photos
    expect(screen.getByText(/00\/05 DECLASSIFIED/)).toBeInTheDocument();
    expect(screen.queryByText('FULL DISCLOSURE')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /DECLASSIFY ALL/i }));
    expect(screen.getByText(/05\/05 DECLASSIFIED/)).toBeInTheDocument();
    expect(screen.getByText('FULL DISCLOSURE')).toBeInTheDocument();
  });

  it('renders the page sections with consistent titles', () => {
    renderRouter(<RecordPage />);
    for (const name of [
      /Particulars/i,
      /Capabilities/i,
      /Off the Record/i,
      /Fingertips & Surveillance/i,
    ]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }
  });
});
