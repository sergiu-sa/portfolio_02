import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EvidenceBand from './EvidenceBand.jsx';
import BroadcastIntercept from './BroadcastIntercept.jsx';
import Hero from './Hero.jsx';
import SubjectBrief from './SubjectBrief.jsx';
import CustodyFooter from './CustodyFooter.jsx';
import { evidence, priorCase, subjectName, bureau } from '../data.js';

const renderRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('EvidenceBand', () => {
  const item = evidence.find((e) => e.id === 'linka'); // redact: ['social']

  it('renders the exhibit ref + codename and links to the file route', () => {
    renderRouter(
      <EvidenceBand item={item} index={1} side="right" featured={false} />,
    );
    expect(screen.getByText(item.codename)).toBeInTheDocument();
    expect(screen.getByText(item.ref)).toBeInTheDocument();
    const fileLinks = screen
      .getAllByRole('link')
      .filter((a) => a.getAttribute('href') === `/file/${item.id}`);
    expect(fileLinks).toHaveLength(2); // the photo and the OPEN FILE button
  });

  it('redacts the configured phrase as a declassifiable control', () => {
    renderRouter(
      <EvidenceBand item={item} index={1} side="left" featured={false} />,
    );
    const redacted = screen.getByRole('button', { name: /social/i });
    expect(redacted).toHaveAttribute('aria-pressed', 'false');
  });

  it('flags the featured exhibit', () => {
    renderRouter(
      <EvidenceBand item={evidence[2]} index={2} side="left" featured />,
    );
    expect(screen.getByText('EXHIBIT · ★ FLAGSHIP')).toBeInTheDocument();
  });
});

describe('subject name redaction', () => {
  it('Hero redacts the full name, pulled from data', () => {
    renderRouter(<Hero />);
    const name = screen.getByRole('button', { name: subjectName.full });
    expect(name).toHaveAttribute('aria-pressed', 'false');
  });

  it('SubjectBrief redacts the full name and links to the full record', () => {
    renderRouter(<SubjectBrief />);
    expect(
      screen.getByRole('button', { name: subjectName.full }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /OPEN FULL RECORD/i }),
    ).toHaveAttribute('href', '/record');
  });
});

describe('CustodyFooter', () => {
  it('routes to request + ledger and the auth barcode encodes the case code', () => {
    renderRouter(<CustodyFooter />);
    expect(
      screen.getByRole('link', { name: /FILE A REQUEST/i }),
    ).toHaveAttribute('href', '/request');
    expect(screen.getByRole('link', { name: /CASE LEDGER/i })).toHaveAttribute(
      'href',
      '/ledger',
    );
    expect(
      screen.getByRole('img', { name: `Barcode encoding ${bureau.caseCode}` }),
    ).toBeInTheDocument();
  });
});

describe('BroadcastIntercept', () => {
  it('renders the prior case and tunes in to the live site in a new tab', () => {
    render(<BroadcastIntercept />);
    expect(screen.getByText(priorCase.title)).toBeInTheDocument();
    const tune = screen.getByRole('link', { name: /TUNE IN/i });
    expect(tune).toHaveAttribute('href', priorCase.url);
    expect(tune).toHaveAttribute('target', '_blank');
    expect(tune).toHaveAttribute('rel', 'noreferrer');
  });
});
