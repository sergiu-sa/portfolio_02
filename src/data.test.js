import {
  evidence,
  archive,
  allEvidence,
  evidenceById,
  faces,
  subjectPhoto,
  idPhoto,
} from './data.js'

const REQUIRED_KEYS = ['id', 'ref', 'codename', 'project', 'summary', 'tags', 'heroImg', 'plateImg', 'callouts']

describe('evidence schema', () => {
  it('ships the three required home projects', () => {
    expect(evidence).toHaveLength(3)
  })

  it('every record carries the keys pages depend on', () => {
    for (const item of allEvidence) {
      for (const key of REQUIRED_KEYS) {
        expect(item, `${item.id} missing ${key}`).toHaveProperty(key)
      }
    }
  })

  it('teasers stay within the 130-char limit', () => {
    for (const item of allEvidence) {
      expect(item.summary.length, `${item.id} teaser too long`).toBeLessThanOrEqual(130)
    }
  })

  it('ids are unique across home + archive', () => {
    const ids = allEvidence.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('callouts always have a tag and percentage coordinates', () => {
    for (const item of allEvidence) {
      for (const c of item.callouts) {
        expect(c).toHaveProperty('tag')
        expect(c.x).toBeGreaterThanOrEqual(0)
        expect(c.x).toBeLessThanOrEqual(100)
        expect(c.y).toBeGreaterThanOrEqual(0)
        expect(c.y).toBeLessThanOrEqual(100)
      }
    }
  })
})

describe('evidenceById lookup', () => {
  it('resolves every record by id', () => {
    expect(Object.keys(evidenceById)).toHaveLength(allEvidence.length)
    for (const item of allEvidence) {
      expect(evidenceById[item.id]).toBe(item)
    }
  })

  it('allEvidence is home evidence followed by archive', () => {
    expect(allEvidence).toEqual([...evidence, ...archive])
  })
})

describe('portrait references', () => {
  it('faces list points only at collage assets', () => {
    expect(faces.length).toBeGreaterThan(0)
    for (const src of faces) {
      expect(src).toMatch(/^\/assets\/collage\/face\d{2}\.jpg$/)
    }
  })

  it('subject + id portraits are within the available face set', () => {
    expect(faces).toContain(subjectPhoto)
    expect(faces).toContain(idPhoto)
  })
})
