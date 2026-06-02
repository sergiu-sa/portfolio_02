import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RequestPage from './RequestPage.jsx';

const renderRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

// reduced-motion is forced on in the test setup, so a valid submit skips the
// processing animation and lands straight on the RECEIVED receipt.
async function fileValidRequest(user) {
  await user.type(screen.getByLabelText('APPLICANT *'), 'Dana Investigator');
  await user.type(
    screen.getByLabelText('RETURN ADDRESS *'),
    'dana@example.com',
  );
  await user.click(screen.getByRole('radio', { name: 'GENERAL INQUIRY' }));
  await user.type(
    screen.getByLabelText(/STATEMENT OF REQUEST/),
    'Requesting a collaboration on the record.',
  );
  await user.click(screen.getByRole('checkbox'));
  await user.click(screen.getByRole('button', { name: /FILE REQUEST/i }));
}

describe('RequestPage — intake form', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: true }));
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the four intake sections and the DIRECT LINES channels', () => {
    renderRouter(<RequestPage />);

    expect(screen.getByText('SECTION A · APPLICANT')).toBeInTheDocument();
    expect(
      screen.getByText('SECTION B · NATURE OF REQUEST *'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('SECTION C · STATEMENT OF REQUEST *'),
    ).toBeInTheDocument();
    expect(screen.getByText('SECTION D · DECLARATION')).toBeInTheDocument();

    const lines = screen.getByRole('list', { name: /direct lines/i });
    expect(within(lines).getByText('@sergiu-sa')).toBeInTheDocument();
    expect(within(lines).getByRole('link', { name: /GITHUB/ })).toHaveAttribute(
      'href',
      'https://github.com/sergiu-sa',
    );
  });

  it('starts with an empty clearance meter and rejects an incomplete submit', async () => {
    const user = userEvent.setup();
    renderRouter(<RequestPage />);

    expect(screen.getByText(/0 OF 5 · PENDING/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /FILE REQUEST/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/FIELD INCOMPLETE/);
    expect(screen.queryByText(/CASE #/)).not.toBeInTheDocument();
  });

  it('clears for submission and issues a case number on a complete request', async () => {
    const user = userEvent.setup();
    renderRouter(<RequestPage />);

    await fileValidRequest(user);

    expect(await screen.findByText('RECEIVED')).toBeInTheDocument();
    expect(screen.getByText(/CASE #FED-2026-\d{4} OPENED/)).toBeInTheDocument();
  });

  it('raises the URGENT flag when priority is escalated', async () => {
    const user = userEvent.setup();
    renderRouter(<RequestPage />);

    expect(
      screen.queryByText('URGENT', { selector: '.urgent-flag' }),
    ).toBeNull();
    await user.click(screen.getByRole('radio', { name: 'URGENT' }));
    expect(
      screen.getByText('URGENT', { selector: '.urgent-flag' }),
    ).toBeInTheDocument();
  });

  it('marks the mandatory fields required for assistive tech', () => {
    renderRouter(<RequestPage />);
    expect(screen.getByLabelText('APPLICANT *')).toBeRequired();
    expect(screen.getByLabelText('RETURN ADDRESS *')).toBeRequired();
    expect(screen.getByLabelText(/STATEMENT OF REQUEST/)).toBeRequired();
    expect(screen.getByRole('checkbox', { name: /I attest/i })).toBeRequired();
    expect(screen.getByLabelText('ORGANISATION')).not.toBeRequired();
  });

  it('carries the Netlify field names and an off-screen honeypot', () => {
    const { container } = renderRouter(<RequestPage />);
    for (const n of [
      'name',
      'email',
      'org',
      'type',
      'priority',
      'statement',
      'attest',
    ]) {
      expect(container.querySelector(`[name="${n}"]`)).toBeInTheDocument();
    }
    const honeypot = container.querySelector('input[name="bot-field"]');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute('tabindex', '-1');
  });

  it('POSTs the submission to Netlify and shows the receipt on success', async () => {
    const user = userEvent.setup();
    renderRouter(<RequestPage />);

    await fileValidRequest(user);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, opts] = global.fetch.mock.calls[0];
    expect(url).toBe('/');
    expect(opts.method).toBe('POST');
    expect(opts.body).toContain('form-name=contact');
    expect(opts.body).toContain('bot-field=');
    expect(opts.body).toContain('name=Dana%20Investigator');
    expect(await screen.findByText('RECEIVED')).toBeInTheDocument();
  });

  it('shows the transmission-failed state and keeps entries on a failed send', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('network')));
    const user = userEvent.setup();
    renderRouter(<RequestPage />);

    await fileValidRequest(user);

    expect(await screen.findByText('LINE DROPPED')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /TRY AGAIN/i }));
    expect(screen.getByLabelText('APPLICANT *')).toHaveValue(
      'Dana Investigator',
    );
  });

  it('drops a honeypot-filled submission without sending', async () => {
    const user = userEvent.setup();
    const { container } = renderRouter(<RequestPage />);

    await user.type(screen.getByLabelText('APPLICANT *'), 'Dana Investigator');
    await user.type(
      screen.getByLabelText('RETURN ADDRESS *'),
      'dana@example.com',
    );
    await user.click(screen.getByRole('radio', { name: 'GENERAL INQUIRY' }));
    await user.type(
      screen.getByLabelText(/STATEMENT OF REQUEST/),
      'Requesting a collaboration on the record.',
    );
    await user.click(screen.getByRole('checkbox', { name: /I attest/i }));
    await user.type(
      container.querySelector('input[name="bot-field"]'),
      'i-am-a-bot',
    );
    await user.click(screen.getByRole('button', { name: /FILE REQUEST/i }));

    expect(await screen.findByText('RECEIVED')).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
