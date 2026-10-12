// Every photo on the page. Files live in public/images/<name>-<width>.webp and are
// produced by scripts/process_photos.py from originals in photos-src/.
// `brief` describes the shot each slot needs; update `alt` if the photo changes.

export const photos = {
  hero: {
    widths: [768, 1280, 1920],
    ratio: [16, 10],
    alt: 'TASLEEH technician inspecting rooftop AC condenser units on a Dubai building',
    brief: 'Technician inspecting rooftop AC condensers on a Dubai tower',
  },
  audience: {
    widths: [640, 1024, 1440],
    ratio: [16, 9],
    alt: 'Facility manager walking a building corridor with a maintenance technician',
    brief: 'Facility or property manager with a technician inside a modern building',
  },
  'svc-mep': {
    widths: [480, 800],
    ratio: [4, 3],
    alt: 'Technician servicing an air conditioning unit',
    brief: 'AC / electrical / plumbing technician at work',
  },
  'svc-fabric': {
    widths: [480, 800],
    ratio: [4, 3],
    alt: 'Painter finishing an interior wall',
    brief: 'Painting, tiling, carpentry or façade work',
  },
  'svc-soft': {
    widths: [480, 800],
    ratio: [4, 3],
    alt: 'Housekeeping team cleaning a building lobby',
    brief: 'Housekeeping, landscaping or pest control',
  },
  'svc-fitout': {
    widths: [480, 800],
    ratio: [4, 3],
    alt: 'Fit-out team working on an office interior',
    brief: 'Fit-out, handyman or moving team',
  },
  survey: {
    widths: [640, 1024],
    ratio: [4, 5],
    alt: 'TASLEEH engineer recording findings on a tablet during a property survey',
    brief: 'Engineer with a tablet in a building plant room',
  },
  app: {
    widths: [640, 1024],
    ratio: [4, 3],
    alt: 'Resident raising a maintenance request on a smartphone',
    brief: 'Person using a smartphone at home',
  },
  about: {
    widths: [768, 1280, 1920],
    ratio: [21, 9],
    alt: 'Dubai Marina towers at dusk',
    brief: 'Dubai Marina skyline',
  },
}

export function photoProps(name) {
  const { widths, ratio, alt } = photos[name]
  const largest = widths[widths.length - 1]
  return {
    src: `/images/${name}-${largest}.webp`,
    srcSet: widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', '),
    width: largest,
    height: Math.round((largest * ratio[1]) / ratio[0]),
    alt,
  }
}
