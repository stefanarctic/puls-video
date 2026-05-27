/**
 * Romania country outline projected from GeoJSON (Natural Earth / world.geo.json, ROU).
 * @see https://github.com/johan/world.geo.json/blob/master/countries/ROU.geo.json
 */

const GEO_RING: [number, number][] = [
  [22.710531, 47.882194],
  [23.142236, 48.096341],
  [23.760958, 47.985598],
  [24.402056, 47.981878],
  [24.866317, 47.737526],
  [25.207743, 47.891056],
  [25.945941, 47.987149],
  [26.19745, 48.220881],
  [26.619337, 48.220726],
  [26.924176, 48.123264],
  [27.233873, 47.826771],
  [27.551166, 47.405117],
  [28.12803, 46.810476],
  [28.160018, 46.371563],
  [28.054443, 45.944586],
  [28.233554, 45.488283],
  [28.679779, 45.304031],
  [29.149725, 45.464925],
  [29.603289, 45.293308],
  [29.626543, 45.035391],
  [29.141612, 44.82021],
  [28.837858, 44.913874],
  [28.558081, 43.707462],
  [27.970107, 43.812468],
  [27.2424, 44.175986],
  [26.065159, 43.943494],
  [25.569272, 43.688445],
  [24.100679, 43.741051],
  [23.332302, 43.897011],
  [22.944832, 43.823785],
  [22.65715, 44.234923],
  [22.474008, 44.409228],
  [22.705726, 44.578003],
  [22.459022, 44.702517],
  [22.145088, 44.478422],
  [21.562023, 44.768947],
  [21.483526, 45.18117],
  [20.874313, 45.416375],
  [20.762175, 45.734573],
  [20.220192, 46.127469],
  [21.021952, 46.316088],
  [21.626515, 46.994238],
  [22.099768, 47.672439],
  [22.710531, 47.882194],
];

const BOUNDS = GEO_RING.reduce(
  (acc, [lon, lat]) => ({
    minLon: Math.min(acc.minLon, lon),
    maxLon: Math.max(acc.maxLon, lon),
    minLat: Math.min(acc.minLat, lat),
    maxLat: Math.max(acc.maxLat, lat),
  }),
  {
    minLon: Infinity,
    maxLon: -Infinity,
    minLat: Infinity,
    maxLat: -Infinity,
  },
);

const LON_SPAN = BOUNDS.maxLon - BOUNDS.minLon;
const LAT_SPAN = BOUNDS.maxLat - BOUNDS.minLat;
const MID_LAT = (BOUNDS.minLat + BOUNDS.maxLat) / 2;
const GEO_ASPECT =
  (LON_SPAN * Math.cos((MID_LAT * Math.PI) / 180)) / LAT_SPAN;

/** Room for stroke, glow filter, and pulsing markers. */
export const ROMANIA_MAP_PADDING = 32;
const CONTENT_HEIGHT = 200;

const projectRaw = (lon: number, lat: number) => {
  const contentWidth = Math.round(CONTENT_HEIGHT * GEO_ASPECT);
  return {
    x: ((lon - BOUNDS.minLon) / LON_SPAN) * contentWidth,
    y: ((BOUNDS.maxLat - lat) / LAT_SPAN) * CONTENT_HEIGHT,
  };
};

const RING_PROJECTED = GEO_RING.map(([lon, lat]) => projectRaw(lon, lat));

const SHAPE_BOUNDS = RING_PROJECTED.reduce(
  (acc, { x, y }) => ({
    minX: Math.min(acc.minX, x),
    maxX: Math.max(acc.maxX, x),
    minY: Math.min(acc.minY, y),
    maxY: Math.max(acc.maxY, y),
  }),
  { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity },
);

const SHAPE_WIDTH = SHAPE_BOUNDS.maxX - SHAPE_BOUNDS.minX;
const SHAPE_HEIGHT = SHAPE_BOUNDS.maxY - SHAPE_BOUNDS.minY;

export const ROMANIA_VIEWBOX = {
  width: Math.round(SHAPE_WIDTH + ROMANIA_MAP_PADDING * 2),
  height: Math.round(SHAPE_HEIGHT + ROMANIA_MAP_PADDING * 2),
} as const;

export const ROMANIA_MAP_ASPECT = ROMANIA_VIEWBOX.width / ROMANIA_VIEWBOX.height;

const centerInViewBox = (x: number, y: number) => ({
  x: x - SHAPE_BOUNDS.minX + ROMANIA_MAP_PADDING,
  y: y - SHAPE_BOUNDS.minY + ROMANIA_MAP_PADDING,
});

export const projectLonLat = (lon: number, lat: number) =>
  centerInViewBox(projectRaw(lon, lat).x, projectRaw(lon, lat).y);

export const ROMANIA_OUTLINE_PATH = RING_PROJECTED.map(({ x, y }, index) => {
  const centered = centerInViewBox(x, y);
  const cmd = index === 0 ? "M" : "L";
  return `${cmd} ${centered.x.toFixed(1)} ${centered.y.toFixed(1)}`;
}).join(" ") + " Z";

export type MapSiteLabelPlacement = "above" | "bottom-left";

export const ROMANIA_MAP_SITES = [
  {
    lon: 24.375,
    lat: 45.104,
    label: "Ramnicu Valcea",
    sub: "Uzina G · 9 aug. 1976",
    labelPlacement: "above" as const,
  },
  {
    lon: 22.656,
    lat: 44.631,
    label: "Drobeta-Turnu Severin",
    sub: "ROMAG-PROD",
    labelPlacement: "bottom-left" as const,
  },
] as const;

export const getMapSitesProjected = () =>
  ROMANIA_MAP_SITES.map((site) => {
    const { x, y } = projectLonLat(site.lon, site.lat);
    return { ...site, x, y };
  });

export const getConnectionLength = () => {
  const [valcea, severin] = getMapSitesProjected();
  return Math.hypot(valcea.x - severin.x, valcea.y - severin.y);
};

/** Horizontal grid lines as fraction of shape height (0–1). */
export const ROMANIA_GRID_LINES = [0.28, 0.52, 0.76] as const;

export const getGridLineY = (fraction: number) =>
  ROMANIA_MAP_PADDING + fraction * SHAPE_HEIGHT;
