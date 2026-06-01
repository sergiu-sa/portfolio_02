import {
  evidence,
  archive,
  allEvidence,
  evidenceById,
  faces,
  subjectPhoto,
  idPhoto,
  priorCase,
  subjectName,
} from './data.js';

const REQUIRED_KEYS = [
  'id',
  'ref',
  'codename',
  'project',
  'summary',
  'tags',
  'heroImg',
  'plateImg',
];

describe('evidence schema', () => {
  it('ships the three required home projects', () => {
    expect(evidence).toHaveLength(3);
  });

  it('every record carries the keys pages depend on', () => {
    for (const item of allEvidence) {
      for (const key of REQUIRED_KEYS) {
        expect(item, `${item.id} missing ${key}`).toHaveProperty(key);
      }
    }
  });

  it('teasers stay within the 130-char limit', () => {
    for (const item of allEvidence) {
      expect(
        item.summary.length,
        `${item.id} teaser too long`,
      ).toBeLessThanOrEqual(130);
    }
  });

  it('ids are unique across home + archive', () => {
    const ids = allEvidence.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every project file page has its own exhibits + before/after, all pointing at real asset paths', () => {
    for (const item of allEvidence) {
      expect(
        Array.isArray(item.exhibits),
        `${item.id} missing exhibits[]`,
      ).toBe(true);
      expect(item.exhibits.length).toBeGreaterThan(0);
      for (const ex of item.exhibits)
        expect(ex.src).toMatch(/^\/assets\/projects\//);

      expect(item.compare, `${item.id} missing compare`).toBeTruthy();
      expect(item.compare.before.src).toMatch(/^\/assets\/projects\//);
      expect(item.compare.after.src).toMatch(/^\/assets\/projects\//);
    }
  });
});

describe('evidenceById lookup', () => {
  it('resolves every record by id', () => {
    expect(Object.keys(evidenceById)).toHaveLength(allEvidence.length);
    for (const item of allEvidence) {
      expect(evidenceById[item.id]).toBe(item);
    }
  });

  it('allEvidence is home evidence followed by archive', () => {
    expect(allEvidence).toEqual([...evidence, ...archive]);
  });
});

describe('portrait references', () => {
  it('faces list points only at collage assets', () => {
    expect(faces.length).toBeGreaterThan(0);
    for (const src of faces) {
      expect(src).toMatch(/^\/assets\/collage\/face\d{2}\.jpg$/);
    }
  });

  it('subject + id portraits are within the available face set', () => {
    expect(faces).toContain(subjectPhoto);
    expect(faces).toContain(idPhoto);
  });
});

describe('home content', () => {
  it('every redact phrase is an exact substring of its summary', () => {
    for (const item of allEvidence) {
      for (const phrase of item.redact ?? []) {
        expect(
          item.summary,
          `${item.id}: "${phrase}" not found in summary`,
        ).toContain(phrase);
      }
    }
  });

  it('each home exhibit declares at least one redact phrase', () => {
    for (const item of evidence) {
      expect(Array.isArray(item.redact), `${item.id} missing redact[]`).toBe(
        true,
      );
      expect(item.redact.length).toBeGreaterThan(0);
    }
  });

  it('priorCase has a live link and at least one asset frame', () => {
    expect(priorCase.url).toMatch(/^https?:\/\//);
    expect(priorCase.frames.length).toBeGreaterThan(0);
    for (const frame of priorCase.frames) {
      expect(frame).toMatch(/^\/assets\//);
    }
  });

  it('subjectName carries the full name to redact', () => {
    expect(subjectName.full).toBeTruthy();
  });
});
