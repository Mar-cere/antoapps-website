export type Vec3 = { x: number; y: number; z: number };

export type NexusNode = {
  x: number;
  y: number;
  z: number;
  r: number;
  g: number;
  b: number;
  size: number;
  cluster: number;
  density: number;
  bright: number;
  mist: number;
};

export type NexusFilament = {
  points: Vec3[];
  alpha: number;
  r: number;
  g: number;
  b: number;
  current: boolean;
};

export type NexusMembrane = {
  ax: number;
  ay: number;
  az: number;
  bx: number;
  by: number;
  bz: number;
  cx: number;
  cy: number;
  cz: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
};

export type NexusHub = {
  x: number;
  y: number;
  z: number;
  cluster: number;
};

export type NexusVolume = {
  data: Uint8Array;
  atlasW: number;
  atlasH: number;
  nx: number;
  ny: number;
  nz: number;
  cols: number;
  rows: number;
  origin: Vec3;
  size: Vec3;
};

export type NexusField = {
  nodes: NexusNode[];
  filaments: NexusFilament[];
  membranes: NexusMembrane[];
  hubs: NexusHub[];
  foci: Vec3[];
  volume: NexusVolume;
};

export type NexusBudget = {
  nodes: number;
  filaments: number;
};

const PSYCHE = [
  [0.66, 0.24, 0.92],
  [0.72, 0.28, 0.88],
  [0.58, 0.2, 0.9],
  [0.74, 0.32, 0.84],
];
const PERSONA = [
  [0.14, 0.9, 0.96],
  [0.16, 0.86, 0.96],
  [0.28, 0.88, 0.98],
];
const CORTEX = [
  [0.32, 0.42, 0.98],
  [0.38, 0.48, 1.0],
  [0.44, 0.58, 0.99],
];
const DEEP = [
  [0.08, 0.1, 0.28],
  [0.09, 0.14, 0.34],
  [0.1, 0.16, 0.4],
];
const WARM = [0.7, 0.4, 0.44];

type Ellipsoid = {
  cx: number;
  cy: number;
  cz: number;
  rx: number;
  ry: number;
  rz: number;
  weight: number;
};

/**
 * Una masa irregular suspendida, más alta que ancha, abierta arriba.
 * Los lóbulos se solapan a propósito: un organismo, no islas.
 */
const LOBES: readonly Ellipsoid[] = [
  { cx: 0.14, cy: 0.66, cz: 0.02, rx: 0.13, ry: 0.12, rz: 0.09, weight: 1.08 },
  { cx: 0.2, cy: 0.54, cz: 0.04, rx: 0.12, ry: 0.12, rz: 0.08, weight: 1.0 },
  { cx: 0.06, cy: 0.48, cz: -0.02, rx: 0.11, ry: 0.13, rz: 0.08, weight: 0.92 },
  { cx: 0.1, cy: 0.36, cz: 0.0, rx: 0.11, ry: 0.12, rz: 0.08, weight: 0.88 },
  { cx: 0.0, cy: 0.3, cz: -0.03, rx: 0.09, ry: 0.1, rz: 0.07, weight: 0.58 },
  { cx: 0.1, cy: 0.2, cz: 0.02, rx: 0.07, ry: 0.08, rz: 0.06, weight: 0.28 },
  { cx: 0.06, cy: 0.09, cz: 0.01, rx: 0.045, ry: 0.06, rz: 0.045, weight: 0.1 },
];

type RegionKind = 'vp' | 'cp' | 'vc' | 'nx';

type ActivityRegion = Ellipsoid & { kind: RegionKind };

const FOCI: readonly ActivityRegion[] = [
  { cx: 0.18, cy: 0.5, cz: 0.03, rx: 0.1, ry: 0.14, rz: 0.07, weight: 0.18, kind: 'vp' },
  { cx: -0.02, cy: 0.42, cz: -0.04, rx: 0.1, ry: 0.14, rz: 0.07, weight: 0.16, kind: 'cp' },
  { cx: 0.12, cy: 0.34, cz: 0.05, rx: 0.08, ry: 0.1, rz: 0.07, weight: 0.14, kind: 'vc' },
  { cx: 0.08, cy: 0.44, cz: -0.05, rx: 0.09, ry: 0.12, rz: 0.08, weight: 0.16, kind: 'nx' },
];

const VOIDS: readonly Ellipsoid[] = [
  { cx: -0.04, cy: 0.56, cz: 0.02, rx: 0.07, ry: 0.07, rz: 0.06, weight: -0.88 },
  { cx: 0.1, cy: 0.76, cz: 0.0, rx: 0.06, ry: 0.05, rz: 0.05, weight: -0.62 },
  { cx: 0.04, cy: 0.5, cz: 0.05, rx: 0.06, ry: 0.07, rz: 0.05, weight: -0.52 },
  { cx: 0.16, cy: 0.34, cz: -0.04, rx: 0.05, ry: 0.07, rz: 0.05, weight: -0.5 },
  { cx: 0.1, cy: 0.08, cz: 0.02, rx: 0.08, ry: 0.07, rz: 0.05, weight: -0.7 },
  { cx: 0.22, cy: 0.2, cz: -0.03, rx: 0.06, ry: 0.06, rz: 0.05, weight: -0.46 },
  { cx: 0.04, cy: -0.04, cz: 0.0, rx: 0.08, ry: 0.07, rz: 0.05, weight: -0.62 },
];

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(p: Vec3, e: Ellipsoid): number {
  const dx = (p.x - e.cx) / e.rx;
  const dy = (p.y - e.cy) / e.ry;
  const dz = (p.z - e.cz) / e.rz;
  return e.weight * Math.exp(-(dx * dx + dy * dy + dz * dz));
}

function fieldAt(p: Vec3): { density: number; cluster: number } {
  let density = 0;
  let best = 0;
  let cluster = 0;
  for (let i = 0; i < LOBES.length; i += 1) {
    const v = gauss(p, LOBES[i]);
    density += v;
    if (v > best) {
      best = v;
      cluster = i;
    }
  }
  for (const hole of VOIDS) {
    density += gauss(p, hole);
  }
  for (const focus of FOCI) {
    density += gauss(p, focus);
  }
  if (p.y < 0.1) {
    density *= Math.max(0, 0.08 + p.y * 0.7);
  }
  if (p.y < 0.02) {
    density *= 0.05;
  }
  if (p.y < 0.22) {
    density *= Math.max(0.12, (p.y - 0.02) / 0.22);
  }
  if (p.y > 0.28 && p.y < 0.72 && p.x > -0.02 && p.x < 0.26) {
    density *= 1.22;
  } else if (p.y > 0.16 && p.y < 0.32 && p.x > 0.0 && p.x < 0.16) {
    density *= 1.06;
  }
  const nibble = hash3(p.x * 3.1, p.y * 2.4, p.z * 2.8);
  if (nibble > 0.76) {
    density *= 0.16;
  } else if (nibble > 0.6) {
    density *= 0.5;
  }
  const lean = 0.08 + Math.max(0, p.y - 0.4) * 0.08;
  const rx = (p.x - lean) / (0.2 + Math.max(0, 0.42 - p.y) * 0.03);
  const ry = (p.y - 0.4) / 0.78;
  const rz = p.z / 0.22;
  let rad = rx * rx * 1.7 + ry * ry * 0.52 + rz * rz;
  rad += Math.max(0, p.x - 0.3) * 5.6;
  rad += Math.max(0, Math.abs(p.x - lean) - (p.y > 0.55 ? 0.14 : 0.1)) * 3.1;
  rad += Math.max(0, p.x - 0.14) * Math.max(0, 0.12 - p.y) * 5.2;
  rad += Math.max(0, -0.16 - p.x) * Math.max(0, p.y - 0.16) * 3.6;
  if (rad > 0.82) {
    density *= Math.max(0, 1.02 - rad * 0.62);
  }
  return { density, cluster };
}

function hash3(x: number, y: number, z: number): number {
  const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
  return s - Math.floor(s);
}

function ribbon(p: Vec3, ax: number, ay: number, az: number, freq: number, phase: number, ry: number, rz: number): number {
  const t = p.x * 1.35 + p.z * 0.55;
  const yPath = ay + 0.22 * Math.sin(t * freq + phase);
  const zPath = az + 0.1 * Math.cos(t * freq * 0.82 + phase);
  const dy = (p.y - yPath) / ry;
  const dz = (p.z - zPath) / rz;
  const dx = (p.x - ax) * 3.6;
  return Math.pow(Math.exp(-(dy * dy + dz * dz + dx * dx)), 2.15);
}

function slant(p: Vec3, x0: number, y0: number, x1: number, y1: number, az: number, rx: number, rz: number): number {
  const sx = x1 - x0;
  const sy = y1 - y0;
  const len2 = Math.max(0.0001, sx * sx + sy * sy);
  const t = Math.max(0, Math.min(1, ((p.x - x0) * sx + (p.y - y0) * sy) / len2));
  const px = x0 + sx * t;
  const py = y0 + sy * t;
  const dx = (p.x - px) / rx;
  const dy = (p.y - py) / 0.075;
  const dz = (p.z - az) / rz;
  return Math.pow(Math.exp(-(dx * dx + dy * dy + dz * dz)), 2.15);
}

function blob(p: Vec3, cx: number, cy: number, cz: number, rx: number, ry: number, rz: number): number {
  const dx = (p.x - cx) / rx;
  const dy = (p.y - cy) / ry;
  const dz = (p.z - cz) / rz;
  return Math.pow(Math.exp(-(dx * dx + dy * dy + dz * dz)), 1.28);
}

function mixColor(p: Vec3): { r: number; g: number; b: number; ribbon: number } {
  const n = hash3(p.x, p.y, p.z);
  const n2 = hash3(p.z + 1.7, p.x - 0.4, p.y + 2.1);
  const violetPatch = blob(p, -0.02, 0.44, -0.02, 0.1, 0.2, 0.08);
  const cyanPatch = blob(p, 0.2, 0.46, 0.03, 0.1, 0.2, 0.08);
  const warmPatch = blob(p, -0.02, 0.16, 0.0, 0.045, 0.04, 0.045);
  const rViolet =
    ribbon(p, -0.04, 0.4, -0.04, 2.05, 0.3, 0.2, 0.11) * 1.28 +
    slant(p, -0.1, 0.16, 0.04, 0.7, 0.02, 0.07, 0.08) * 1.12 +
    slant(p, -0.06, 0.28, 0.14, 0.52, 0.01, 0.06, 0.07) * 0.62 +
    ribbon(p, 0.02, 0.34, -0.03, 1.72, 1.1, 0.14, 0.09) * 0.4 +
    violetPatch * 0.42;
  const rCyan =
    ribbon(p, 0.18, 0.42, 0.04, 1.88, 1.15, 0.2, 0.1) * 1.36 +
    slant(p, 0.22, 0.72, 0.1, 0.16, 0.02, 0.075, 0.09) * 1.2 +
    slant(p, 0.16, 0.58, -0.02, 0.36, -0.02, 0.065, 0.08) * 0.72 +
    ribbon(p, 0.14, 0.28, 0.02, 1.64, 2.4, 0.13, 0.09) * 0.46 +
    cyanPatch * 0.48;
  const rTeal =
    ribbon(p, 0.18, 0.1, -0.06, 1.74, 0.9, 0.13, 0.1) * 0.32;
  const rBlue =
    ribbon(p, -0.06, 0.26, 0.08, 1.55, 0.85, 0.15, 0.11) * 0.3 +
    ribbon(p, -0.16, 0.02, 0.02, 1.82, 1.7, 0.13, 0.1) * 0.24;
  const rWarm = warmPatch * 0.12 * Math.max(0, 1 - Math.abs(p.y - 0.16) / 0.05);
  const bandV = Math.pow(0.5 + 0.5 * Math.sin(p.x * 3.4 + p.y * 2.6 + p.z * 2.1 + 0.7), 3.6);
  const bandC = Math.pow(0.5 + 0.5 * Math.sin(p.x * 2.9 - p.y * 3.4 + p.z * 2.2 + 3.9), 3.6);
  const bandB = Math.pow(0.5 + 0.5 * Math.sin(-p.x * 2.4 + p.y * 3.8 - p.z * 1.8 + 2.2), 3.6);
  const ribbonPeak = Math.max(rViolet, rCyan, rWarm);
  const thread = Math.min(1, Math.max(0, (ribbonPeak - 0.14) / 0.5));
  let psyche = rViolet * 1.5 + bandV * 0.05 + (n - 0.5) * 0.02;
  let persona = rCyan * 1.38 + rTeal * 0.28 + bandC * 0.04;
  let cortex = rBlue * 0.7 + bandB * 0.05 + (n2 - 0.5) * 0.02;
  let deep = 0.2 * (1 - thread * 0.8);
  let warm = rWarm * 0.08;
  for (const focus of FOCI) {
    const influence = Math.min(1.1, Math.max(0, gauss(p, { ...focus, weight: 1 })));
    if (focus.kind === 'vp') {
      persona += influence * 0.22;
      psyche += influence * 0.06;
    } else if (focus.kind === 'cp') {
      psyche += influence * 0.16;
      cortex += influence * 0.08;
      persona += influence * 0.1;
    } else if (focus.kind === 'vc') {
      persona += influence * 0.24;
      cortex += influence * 0.06;
    } else {
      persona += influence * 0.14;
      psyche += influence * 0.08;
    }
  }
  psyche = Math.max(0.012, psyche);
  persona = Math.max(0.012, persona);
  cortex = Math.max(0.01, cortex);
  deep = Math.max(0.02, deep);
  warm = Math.max(0, warm);
  const peak = Math.max(psyche, persona, cortex, warm);
  if (peak > 0) {
    if (psyche === peak) psyche *= 1.16;
    else if (persona === peak) persona *= 1.2;
    else cortex *= 1.08;
  }
  const sum = psyche + persona + cortex + deep + warm;
  psyche /= sum;
  persona /= sum;
  cortex /= sum;
  deep /= sum;
  warm /= sum;
  const pA = PSYCHE[n > 0.75 ? 3 : n > 0.5 ? 2 : n > 0.25 ? 1 : 0];
  const nA = PERSONA[n2 > 0.62 ? 2 : n2 > 0.3 ? 1 : 0];
  const cA = CORTEX[n > 0.7 ? 2 : n > 0.4 ? 1 : 0];
  const dA = DEEP[n2 > 0.66 ? 2 : n2 > 0.33 ? 1 : 0];
  let r = pA[0] * psyche + nA[0] * persona + cA[0] * cortex + dA[0] * deep + WARM[0] * warm;
  let g = pA[1] * psyche + nA[1] * persona + cA[1] * cortex + dA[1] * deep + WARM[1] * warm;
  let b = pA[2] * psyche + nA[2] * persona + cA[2] * cortex + dA[2] * deep + WARM[2] * warm;
  const luma = r * 0.22 + g * 0.55 + b * 0.23;
  const sat = 1.26 + thread * 0.32;
  r = Math.min(1.2, Math.max(0, luma + (r - luma) * sat));
  g = Math.min(1.2, Math.max(0, luma + (g - luma) * sat));
  b = Math.min(1.2, Math.max(0, luma + (b - luma) * sat));
  if (thread > 0.22) {
    let sr: number;
    let sg: number;
    let sb: number;
    if (rCyan >= rViolet) {
      sr = nA[0];
      sg = nA[1];
      sb = nA[2];
    } else {
      sr = pA[0];
      sg = pA[1];
      sb = pA[2];
    }
    const stampLuma = sr * 0.22 + sg * 0.55 + sb * 0.23;
    const lift = (0.42 + thread * 0.32) / Math.max(0.08, stampLuma);
    sr = Math.min(1.2, sr * lift);
    sg = Math.min(1.2, sg * lift);
    sb = Math.min(1.2, sb * lift);
    const w = thread * 0.42;
    r = r * (1 - w) + sr * w;
    g = g * (1 - w) + sg * w;
    b = b * (1 - w) + sb * w;
  }
  if (thread < 0.18) {
    const inTorso = p.y > 0.1 && p.y < 0.36 && p.x > -0.12;
    const body = 1 - thread / 0.18;
    const mixDeep = inTorso ? 0.1 : 0.42;
    const crush = ((inTorso ? 0.26 : 0.2) + thread * 0.22) / Math.max(0.05, r * 0.22 + g * 0.55 + b * 0.23);
    r = Math.max(0, (r * (1 - body * mixDeep) + dA[0] * body * mixDeep) * crush);
    g = Math.max(0, (g * (1 - body * mixDeep) + dA[1] * body * mixDeep) * crush);
    b = Math.max(0, (b * (1 - body * mixDeep) + dA[2] * body * mixDeep) * crush);
  }
  const xSplit = p.x - 0.08 - (p.y - 0.4) * 0.06;
  const leftFlow = Math.max(0, Math.min(1, (0.05 - xSplit) / 0.16));
  const rightFlow = Math.max(0, Math.min(1, (xSplit + 0.03) / 0.16));
  let violetStrength = 0.1 + leftFlow * 0.42;
  let cyanStrength = 0.12 + rightFlow * 0.4;
  const blend = violetStrength + cyanStrength;
  const cap = 0.46;
  const k = blend > cap ? cap / blend : 1;
  violetStrength *= k;
  cyanStrength *= k;

  r = r * (1 - cyanStrength - violetStrength) + nA[0] * cyanStrength + pA[0] * violetStrength;
  g = g * (1 - cyanStrength - violetStrength) + nA[1] * cyanStrength + pA[1] * violetStrength;
  b = b * (1 - cyanStrength - violetStrength) + nA[2] * cyanStrength + pA[2] * violetStrength;
  const gold = Math.max(0, r - Math.max(g, b) * 0.82);
  if (gold > 0.02) {
    const t = Math.min(1, gold * 12);
    r = r * (1 - t) + pA[0] * t * 0.55 + nA[0] * t * 0.2 + dA[0] * t * 0.25;
    g = g * (1 - t) + pA[1] * t * 0.35 + nA[1] * t * 0.45;
    b = b * (1 - t) + pA[2] * t * 0.55 + nA[2] * t * 0.45;
  }
  const ribbonStrength = Math.max(rViolet, rCyan, rTeal, rBlue, rWarm * 0.4);
  return { r, g, b, ribbon: ribbonStrength };
}

function dist2(a: Vec3, b: Vec3): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return dx * dx + dy * dy + dz * dz;
}

function lerp(a: Vec3, b: Vec3, t: number): Vec3 {
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    z: a.z + (b.z - a.z) * t,
  };
}

function bezier(a: Vec3, m: Vec3, b: Vec3, t: number): Vec3 {
  const u = 1 - t;
  return {
    x: u * u * a.x + 2 * u * t * m.x + t * t * b.x,
    y: u * u * a.y + 2 * u * t * m.y + t * t * b.y,
    z: u * u * a.z + 2 * u * t * m.z + t * t * b.z,
  };
}

function tessellate(a: Vec3, m: Vec3, b: Vec3, steps: number): Vec3[] {
  const points: Vec3[] = [];
  for (let i = 0; i <= steps; i += 1) {
    points.push(bezier(a, m, b, i / steps));
  }
  return points;
}

function cellKey(x: number, y: number, z: number, size: number): string {
  return `${Math.floor((x + 2) / size)}_${Math.floor((y + 2) / size)}_${Math.floor((z + 2) / size)}`;
}

function towardCenter(a: Vec3, b: Vec3, pull: number, jitter: Vec3): Vec3 {
  return {
    x: (a.x + b.x) * 0.5 * (1 - pull) + 0.12 * pull + jitter.x,
    y: (a.y + b.y) * 0.5 * (1 - pull) + 0.04 * pull + jitter.y,
    z: (a.z + b.z) * 0.5 * (1 - pull) - 0.04 * pull + jitter.z,
  };
}

function ellipsoidDist(p: Vec3, e: Ellipsoid): number {
  const dx = (p.x - e.cx) / e.rx;
  const dy = (p.y - e.cy) / e.ry;
  const dz = (p.z - e.cz) / e.rz;
  return dx * dx + dy * dy + dz * dz;
}

function nearFocus(p: Vec3): number {
  let best = 99;
  for (const focus of FOCI) {
    best = Math.min(best, ellipsoidDist(p, focus));
  }
  return best;
}

function nearestFocusIndex(p: Vec3): { index: number; proximity: number } {
  let best = 99;
  let index = 0;
  for (let i = 0; i < FOCI.length; i += 1) {
    const d = ellipsoidDist(p, FOCI[i]);
    if (d < best) {
      best = d;
      index = i;
    }
  }
  return { index, proximity: best };
}

function nearVoid(p: Vec3): number {
  let best = 99;
  for (const hole of VOIDS) {
    best = Math.min(best, ellipsoidDist(p, hole));
  }
  return best;
}

function assignActivity(nodes: NexusNode[], rng: () => number) {
  const n = nodes.length;
  if (n === 0) {
    return;
  }
  const convTarget = Math.max(3, Math.round(n * 0.01));
  const activeTarget = Math.max(8, Math.round(n * 0.045));
  const moderateTarget = Math.max(16, Math.round(n * 0.11));
  const tissueMod = Math.round(moderateTarget * 0.36);
  const regionalMod = moderateTarget - tissueMod;
  const share = [0.34, 0.28, 0.22, 0.16];
  const buckets: { i: number; score: number }[][] = [[], [], [], []];
  const tissue: { i: number; score: number }[] = [];

  for (let i = 0; i < n; i += 1) {
    const node = nodes[i];
    if (node.y < 0.1) {
      continue;
    }
    const { index, proximity } = nearestFocusIndex(node);
    const score = proximity * 0.65 + (1 - node.density) * 0.2 + rng() * 0.95;
    buckets[index].push({ i, score });
    if (proximity > 1.7 && proximity < 6.2 && node.density > 0.16) {
      tissue.push({ i, score: Math.abs(proximity - 3.1) + rng() * 0.8 });
    }
  }

  const taken = new Set<number>();
  const mark = (i: number, bright: number, minSize: number) => {
    if (taken.has(i)) {
      return;
    }
    taken.add(i);
    const node = nodes[i];
    node.bright = bright;
    node.size = Math.max(node.size, minSize + rng() * 0.4);
  };

  for (let f = 0; f < FOCI.length; f += 1) {
    buckets[f].sort((a, b) => a.score - b.score);
    const convTake = Math.max(1, Math.round(convTarget * share[f]));
    const activeTake = Math.max(2, Math.round(activeTarget * share[f]));
    const modTake = Math.max(3, Math.round(regionalMod * share[f]));
    for (let k = 0; k < convTake && k < buckets[f].length; k += 1) {
      // Evitar glow central y nodos a blanco: por debajo del umbral de "conv".
      mark(buckets[f][k].i, 0.78, 1.6);
    }
    for (let k = convTake; k < convTake + activeTake && k < buckets[f].length; k += 1) {
      mark(buckets[f][k].i, 0.62, 1.32);
    }
    for (let k = convTake + activeTake; k < convTake + activeTake + modTake && k < buckets[f].length; k += 1) {
      mark(buckets[f][k].i, 0.28, 0.92);
    }
  }

  tissue.sort((a, b) => a.score - b.score);
  let added = 0;
  for (const item of tissue) {
    if (added >= tissueMod) {
      break;
    }
    if (taken.has(item.i)) {
      continue;
    }
    mark(item.i, 0.22, 0.88);
    added += 1;
  }

  const nexusTint = [0.82, 0.9, 1.0];
  for (const node of nodes) {
    if (node.bright < 0.9) {
      continue;
    }
    if (rng() < 0.06) {
      const t = 0.02 + rng() * 0.03;
      node.r = node.r * (1 - t) + nexusTint[0] * t;
      node.g = node.g * (1 - t) + nexusTint[1] * t;
      node.b = node.b * (1 - t) + nexusTint[2] * t;
    }
    if (rng() < 0.035 && node.y > 0.13 && node.y < 0.2 && node.x > -0.06 && node.x < 0.06) {
      node.r = node.r * 0.82 + WARM[0] * 0.18;
      node.g = node.g * 0.88 + WARM[1] * 0.12;
      node.b = node.b * 0.94 + WARM[2] * 0.06;
    }
  }
}

function makeFilament(
  a: Vec3,
  b: Vec3,
  mid: Vec3,
  steps: number,
  alpha: number,
  current: boolean
): NexusFilament {
  const tint = mixColor(mid);
  const luma = tint.r * 0.22 + tint.g * 0.55 + tint.b * 0.23;
  const onThread = tint.ribbon > 0.28;
  const sat = onThread ? 1.22 : 1.08;
  let cr = Math.min(1.2, Math.max(0, luma + (tint.r - luma) * sat));
  let cg = Math.min(1.2, Math.max(0, luma + (tint.g - luma) * sat));
  let cb = Math.min(1.2, Math.max(0, luma + (tint.b - luma) * sat));
  if (onThread) {
    const nextLuma = cr * 0.22 + cg * 0.55 + cb * 0.23;
    const lift = Math.min(1.08, luma + 0.16 + tint.ribbon * 0.14) / Math.max(0.06, nextLuma);
    cr = Math.min(1.2, cr * lift);
    cg = Math.min(1.2, cg * lift);
    cb = Math.min(1.2, cb * lift);
  }
  return {
    points: tessellate(a, mid, b, steps),
    alpha: onThread ? alpha * 1.08 : alpha,
    r: cr,
    g: cg,
    b: cb,
    current,
  };
}

function buildPlexus(core: NexusNode[], maxEdges: number, rng: () => number): NexusFilament[] {
  const cell = 0.09;
  const buckets = new Map<string, number[]>();
  for (let i = 0; i < core.length; i += 1) {
    const node = core[i];
    const key = cellKey(node.x, node.y, node.z, cell);
    const list = buckets.get(key);
    if (list) {
      list.push(i);
    } else {
      buckets.set(key, [i]);
    }
  }

  const filaments: NexusFilament[] = [];
  const used = new Set<string>();
  const localBudget = Math.floor(maxEdges * 0.7);

  const tryEdge = (i: number, j: number, mid: Vec3, steps: number, alpha: number, current: boolean) => {
    if (filaments.length >= maxEdges) {
      return false;
    }
    const lo = Math.min(i, j);
    const hi = Math.max(i, j);
    const edge = `${lo}-${hi}`;
    if (used.has(edge)) {
      return false;
    }
    used.add(edge);
    filaments.push(makeFilament(core[i], core[j], mid, steps, alpha, current));
    return true;
  };

  for (let i = 0; i < core.length && filaments.length < localBudget; i += 1) {
    const a = core[i];
    const ix = Math.floor((a.x + 2) / cell);
    const iy = Math.floor((a.y + 2) / cell);
    const iz = Math.floor((a.z + 2) / cell);
    const near: { j: number; d: number }[] = [];
    const maxD = a.density > 0.18 ? 0.16 * 0.16 : 0.11 * 0.11;
    for (let dx = -1; dx <= 1; dx += 1) {
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dz = -1; dz <= 1; dz += 1) {
          const list = buckets.get(`${ix + dx}_${iy + dy}_${iz + dz}`);
          if (!list) {
            continue;
          }
          for (const j of list) {
            if (j === i) {
              continue;
            }
            const d = dist2(a, core[j]);
            if (d < 0.0003 || d > maxD) {
              continue;
            }
            near.push({ j, d });
          }
        }
      }
    }
    near.sort((left, right) => left.d - right.d);
    const take = a.density > 0.48 ? 3 : a.density > 0.16 ? 3 : 2;
    for (let n = 0; n < Math.min(take, near.length); n += 1) {
      const j = near[n].j;
      const b = core[j];
      const mid: Vec3 = {
        x: (a.x + b.x) * 0.5 + (rng() - 0.5) * 0.022,
        y: (a.y + b.y) * 0.5 + (rng() - 0.5) * 0.018,
        z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.02,
      };
      const alpha = 0.09 + Math.min(a.density, b.density) * 0.1 + rng() * 0.03;
      tryEdge(i, j, mid, 4, alpha, false);
    }
  }

  const bridgeBudget = Math.floor(maxEdges * 0.26);
  const sample = Math.min(core.length, 1600);
  for (let n = 0; n < sample && filaments.length < localBudget + bridgeBudget; n += 1) {
    const i = Math.floor(rng() * core.length);
    const a = core[i];
    let best = -1;
    let bestScore = 0;
    for (let k = 0; k < 24; k += 1) {
      const j = Math.floor(rng() * core.length);
      if (j === i) {
        continue;
      }
      const d = dist2(a, core[j]);
      if (d < 0.012 || d > 0.15) {
        continue;
      }
      const b = core[j];
      const crosses = a.x * b.x < 0 || a.y * b.y < 0.01;
      const score = (crosses ? 1.35 : 1) * (0.12 - Math.sqrt(d));
      if (score > bestScore) {
        bestScore = score;
        best = j;
      }
    }
    if (best < 0) {
      continue;
    }
    const b = core[best];
    const mid = towardCenter(a, b, 0.28, {
      x: (rng() - 0.5) * 0.04,
      y: (rng() - 0.5) * 0.03,
      z: (rng() - 0.5) * 0.04,
    });
    tryEdge(i, best, mid, 5, 0.07 + rng() * 0.02, false);
  }

  const chainStart = filaments.length;
  const chainBudget = maxEdges - filaments.length;
  for (let c = 0; c < 160 && filaments.length - chainStart < chainBudget; c += 1) {
    let i = Math.floor(rng() * core.length);
    for (let hop = 0; hop < 4; hop += 1) {
      const a = core[i];
      let next = -1;
      let nextD = 0.09;
      const ix = Math.floor((a.x + 2) / cell);
      const iy = Math.floor((a.y + 2) / cell);
      const iz = Math.floor((a.z + 2) / cell);
      for (let dx = -1; dx <= 1; dx += 1) {
        for (let dy = -1; dy <= 1; dy += 1) {
          const list = buckets.get(`${ix + dx}_${iy + dy}_${iz}`);
          if (!list) {
            continue;
          }
          for (const j of list) {
            if (j === i) {
              continue;
            }
            const d = dist2(a, core[j]);
            if (d < 0.0004 || d > nextD) {
              continue;
            }
            const lo = Math.min(i, j);
            const hi = Math.max(i, j);
            if (used.has(`${lo}-${hi}`)) {
              continue;
            }
            next = j;
            nextD = d;
          }
        }
      }
      if (next < 0) {
        break;
      }
      const b = core[next];
      const mid: Vec3 = {
        x: (a.x + b.x) * 0.5 + (rng() - 0.5) * 0.018,
        y: (a.y + b.y) * 0.5 + (rng() - 0.5) * 0.016,
        z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.018,
      };
      tryEdge(i, next, mid, 3, 0.07 + rng() * 0.02, false);
      i = next;
    }
  }

  return filaments;
}

function addCentralFilaments(core: NexusNode[], maxCount: number, rng: () => number): NexusFilament[] {
  const origin = { x: 0.08, y: 0.06, z: 0 };
  const inner = core.filter((node) => dist2(node, origin) < 0.16);
  if (inner.length < 8 || maxCount < 1) {
    return [];
  }
  const out: NexusFilament[] = [];
  let tries = 0;
  while (out.length < maxCount && tries < maxCount * 14) {
    tries += 1;
    const a = inner[Math.floor(rng() * inner.length)];
    let best: NexusNode | null = null;
    let bestD = 0.045;
    for (let k = 0; k < 20; k += 1) {
      const b = inner[Math.floor(rng() * inner.length)];
      if (b === a) {
        continue;
      }
      const d = dist2(a, b);
      if (d > 0.001 && d < bestD) {
        bestD = d;
        best = b;
      }
    }
    if (!best) {
      continue;
    }
    const mid: Vec3 = {
      x: (a.x + best.x) * 0.5 + (rng() - 0.5) * 0.048,
      y: (a.y + best.y) * 0.5 + (rng() - 0.5) * 0.04,
      z: (a.z + best.z) * 0.5 + (rng() - 0.5) * 0.042,
    };
    out.push(makeFilament(a, best, mid, 6, 0.07 + rng() * 0.02, false));
  }
  return out;
}

function addCoveTissue(
  nodes: NexusNode[],
  coreNodes: NexusNode[],
  filaments: NexusFilament[],
  seed: number,
) {
  const rng = mulberry32((seed ^ 0xb7e2) >>> 0);
  const interior = nodes.filter(
    (node) => node.x > -0.2 && node.x < 0.02 && node.y > 0.28 && node.y < 0.56,
  );
  const leftCore = coreNodes.filter(
    (node) => node.x > -0.16 && node.x < 0.04 && node.y > 0.24 && node.y < 0.56,
  );
  const rightCore = coreNodes.filter(
    (node) => node.x > 0.04 && node.x < 0.22 && node.y > 0.28 && node.y < 0.6,
  );
  const torso = coreNodes.filter(
    (node) => node.x > -0.08 && node.x < 0.18 && node.y > 0.22 && node.y < 0.52,
  );

  if (interior.length >= 8) {
    const weave = Math.min(70, Math.floor(interior.length * 0.22));
    for (let i = 0; i < weave; i += 1) {
      const a = interior[Math.floor(rng() * interior.length)];
      let best = a;
      let bestD = 9;
      for (let k = 0; k < 12; k += 1) {
        const candidate = interior[Math.floor(rng() * interior.length)];
        const d = dist2(a, candidate);
        if (d > 0.0005 && d < bestD) {
          bestD = d;
          best = candidate;
        }
      }
      if (best === a || bestD > 0.062) {
        continue;
      }
      const mid: Vec3 = {
        x: (a.x + best.x) * 0.5 + (rng() - 0.5) * 0.03,
        y: (a.y + best.y) * 0.5 + (rng() - 0.5) * 0.028,
        z: (a.z + best.z) * 0.5 + (rng() - 0.5) * 0.026,
      };
      const tint = mixColor(mid);
      filaments.push({
        points: tessellate(a, mid, best, 7),
        alpha: 0.08 + rng() * 0.03,
        r: Math.min(1.0, tint.r * 0.9),
        g: Math.min(1.0, tint.g * 0.88),
        b: Math.min(1.0, tint.b * 0.92),
        current: tint.ribbon > 0.42,
      });
    }
  }

  const spanPool = torso.length > 8 ? torso : rightCore;
  if (spanPool.length > 8) {
    const spans = Math.min(28, Math.floor(spanPool.length * 0.16));
    for (let i = 0; i < spans; i += 1) {
      const a = spanPool[Math.floor(rng() * spanPool.length)];
      const tip: Vec3 = {
        x: -0.32 + rng() * 0.12,
        y: 0.12 + rng() * 0.16,
        z: (rng() * 2 - 1) * 0.12,
      };
      const mid: Vec3 = {
        x: (a.x + tip.x) * 0.5 + (rng() - 0.55) * 0.05,
        y: (a.y + tip.y) * 0.5 + (rng() - 0.5) * 0.045,
        z: (a.z + tip.z) * 0.5 + (rng() - 0.5) * 0.04,
      };
      const tint = mixColor(mid);
      filaments.push({
        points: tessellate(a, mid, tip, 10),
        alpha: 0.07 + rng() * 0.03,
        r: Math.min(1.0, tint.r * 0.92),
        g: Math.min(1.0, tint.g * 0.9),
        b: Math.min(1.0, tint.b * 0.94),
        current: tint.ribbon > 0.38,
      });
    }
  }

  if (leftCore.length > 8 && rightCore.length > 8) {
    const crosses = Math.min(18, Math.min(leftCore.length, rightCore.length));
    for (let i = 0; i < crosses; i += 1) {
      const a = leftCore[Math.floor(rng() * leftCore.length)];
      const b = rightCore[Math.floor(rng() * rightCore.length)];
      if (dist2(a, b) > 0.28) {
        continue;
      }
      const mid: Vec3 = {
        x: (a.x + b.x) * 0.5 + (rng() - 0.5) * 0.05,
        y: (a.y + b.y) * 0.5 + (rng() - 0.5) * 0.045,
        z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.04,
      };
      const tint = mixColor(mid);
      filaments.push({
        points: tessellate(a, mid, b, 11),
        alpha: 0.07 + rng() * 0.03,
        r: Math.min(1.0, tint.r * 0.9),
        g: Math.min(1.0, tint.g * 0.88),
        b: Math.min(1.0, tint.b * 0.92),
        current: false,
      });
    }
  }
}

function addCrownTissue(
  _nodes: NexusNode[],
  coreNodes: NexusNode[],
  filaments: NexusFilament[],
  seed: number,
) {
  const rng = mulberry32((seed ^ 0xf1c4) >>> 0);
  const crown = coreNodes.filter(
    (node) => node.y > 0.4 && node.y < 0.72 && node.x > -0.14 && node.x < 0.28,
  );
  const mid = coreNodes.filter(
    (node) => node.y > 0.22 && node.y < 0.42 && node.x > -0.12 && node.x < 0.22,
  );
  if (crown.length < 8) {
    return;
  }

  const weave = Math.min(90, Math.floor(crown.length * 0.26));
  for (let i = 0; i < weave; i += 1) {
    const a = crown[Math.floor(rng() * crown.length)];
    let best = a;
    let bestD = 9;
    for (let k = 0; k < 10; k += 1) {
      const candidate = crown[Math.floor(rng() * crown.length)];
      const d = dist2(a, candidate);
      if (d > 0.0004 && d < bestD) {
        bestD = d;
        best = candidate;
      }
    }
    if (best === a || bestD > 0.055) {
      continue;
    }
    const midPt: Vec3 = {
      x: (a.x + best.x) * 0.5 + (rng() - 0.5) * 0.028,
      y: (a.y + best.y) * 0.5 + (rng() - 0.35) * 0.03,
      z: (a.z + best.z) * 0.5 + (rng() - 0.5) * 0.024,
    };
    filaments.push(makeFilament(a, best, midPt, 7, 0.08 + rng() * 0.03, false));
  }

  const wisps = Math.min(28, Math.floor(crown.length * 0.2));
  for (let i = 0; i < wisps; i += 1) {
    const a = crown[Math.floor(rng() * crown.length)];
    const tip: Vec3 = {
      x: a.x + (rng() - 0.5) * 0.1,
        y: Math.min(0.72, a.y + 0.04 + rng() * 0.1),
      z: a.z + (rng() - 0.5) * 0.08,
    };
    const midPt: Vec3 = {
      x: (a.x + tip.x) * 0.5 + (rng() - 0.5) * 0.04,
      y: (a.y + tip.y) * 0.5 + rng() * 0.03,
      z: (a.z + tip.z) * 0.5 + (rng() - 0.5) * 0.03,
    };
    filaments.push(makeFilament(a, tip, midPt, 8, 0.07 + rng() * 0.02, true));
  }

  const leftCrown = crown.filter((node) => node.x < 0.06);
  const rightCrown = crown.filter((node) => node.x > 0.08);
  const leftMid = mid.filter((node) => node.x < 0.04);
  const rightMid = mid.filter((node) => node.x > 0.06);
  const crossA = leftMid.length > 6 && rightCrown.length > 6 ? Math.min(16, leftMid.length) : 0;
  for (let i = 0; i < crossA; i += 1) {
    const a = leftMid[Math.floor(rng() * leftMid.length)];
    const b = rightCrown[Math.floor(rng() * rightCrown.length)];
    if (dist2(a, b) > 0.34) {
      continue;
    }
    const midPt: Vec3 = {
      x: (a.x + b.x) * 0.5 + (rng() - 0.45) * 0.05,
      y: (a.y + b.y) * 0.5 + (rng() - 0.35) * 0.04,
      z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.04,
    };
    filaments.push(makeFilament(a, b, midPt, 11, 0.07 + rng() * 0.02, false));
  }
  const crossB = rightMid.length > 6 && leftCrown.length > 6 ? Math.min(16, rightMid.length) : 0;
  for (let i = 0; i < crossB; i += 1) {
    const a = rightMid[Math.floor(rng() * rightMid.length)];
    const b = leftCrown[Math.floor(rng() * leftCrown.length)];
    if (dist2(a, b) > 0.34) {
      continue;
    }
    const midPt: Vec3 = {
      x: (a.x + b.x) * 0.5 + (rng() - 0.55) * 0.05,
      y: (a.y + b.y) * 0.5 + (rng() - 0.35) * 0.04,
      z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.04,
    };
    filaments.push(makeFilament(a, b, midPt, 11, 0.07 + rng() * 0.02, false));
  }
}

export function nexusBudget(width: number): NexusBudget {
  if (width < 768) {
    return { nodes: 1400, filaments: 480 };
  }
  if (width < 1024) {
    return { nodes: 1800, filaments: 640 };
  }
  return { nodes: 2200, filaments: 800 };
}

export const NEXUS_FIELD_REV = 29;

export const NEXUS_VOLUME_BOUNDS = {
  origin: { x: -0.14, y: 0.06, z: -0.14 },
  size: { x: 0.44, y: 0.72, z: 0.28 },
};

export function bakeNexusVolume(): NexusVolume {
  const nx = 28;
  const ny = 44;
  const nz = 24;
  const cols = 6;
  const rows = 4;
  const pad = 1;
  const tileW = nx + pad * 2;
  const tileH = ny + pad * 2;
  const atlasW = cols * tileW;
  const atlasH = rows * tileH;
  const data = new Uint8Array(atlasW * atlasH * 4);
  const { origin, size } = NEXUS_VOLUME_BOUNDS;

  const writePx = (ax: number, ay: number, r: number, g: number, b: number, a: number) => {
    if (ax < 0 || ay < 0 || ax >= atlasW || ay >= atlasH) {
      return;
    }
    const i = (ay * atlasW + ax) * 4;
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = a;
  };

  for (let z = 0; z < nz; z += 1) {
    const col = z % cols;
    const row = Math.floor(z / cols);
    const ox = col * tileW + pad;
    const oy = row * tileH + pad;
    for (let y = 0; y < ny; y += 1) {
      for (let x = 0; x < nx; x += 1) {
        const p = {
          x: origin.x + ((x + 0.5) / nx) * size.x,
          y: origin.y + ((y + 0.5) / ny) * size.y,
          z: origin.z + ((z + 0.5) / nz) * size.z,
        };
        const { density } = fieldAt(p);
        let r = 0;
        let g = 0;
        let b = 0;
        let a = 0;
        if (density > 0.2) {
          const color = mixColor(p);
          const dens = Math.min(1, Math.pow((density - 0.16) / 0.95, 1.05));
          const luma = color.r * 0.22 + color.g * 0.55 + color.b * 0.23;
          const crush = luma > 0.36 ? 0.36 / luma : 1;
          r = Math.min(255, Math.max(0, color.r * crush * 255));
          g = Math.min(255, Math.max(0, color.g * crush * 255));
          b = Math.min(255, Math.max(0, color.b * crush * 255));
          a = Math.min(255, dens * 255);
        }
        writePx(ox + x, oy + y, r, g, b, a);
      }
    }
    const readInner = (sx: number, sy: number) => {
      const cx = ox + Math.max(0, Math.min(nx - 1, sx));
      const cy = oy + Math.max(0, Math.min(ny - 1, sy));
      const i = (cy * atlasW + cx) * 4;
      return [data[i], data[i + 1], data[i + 2], data[i + 3]] as const;
    };
    for (let y = -1; y <= ny; y += 1) {
      for (let x = -1; x <= nx; x += 1) {
        if (x >= 0 && x < nx && y >= 0 && y < ny) {
          continue;
        }
        const [pr, pg, pb, pa] = readInner(x, y);
        writePx(ox + x, oy + y, pr, pg, pb, pa);
      }
    }
  }

  return { data, atlasW, atlasH, nx, ny, nz, cols, rows, origin, size };
}

export function buildNexusField(budget: NexusBudget, seed = 0xd4a1): NexusField {
  const rng = mulberry32(seed);
  const coreTarget = budget.nodes;
  const mistTarget = 0;
  const nodes: NexusNode[] = [];
  const maxAttempts = coreTarget * 60;

  function remapDensity(list: NexusNode[]) {
    const sorted = [...list].sort((left, right) => left.density - right.density);
    const n = sorted.length;
    if (n < 2) {
      return;
    }
    for (let i = 0; i < n; i += 1) {
      const t = i / (n - 1);
      if (t < 0.34) {
        sorted[i].density = 0.04 + (t / 0.34) * 0.1;
      } else if (t < 0.82) {
        sorted[i].density = 0.14 + ((t - 0.34) / 0.48) * 0.28;
      } else {
        sorted[i].density = 0.42 + ((t - 0.82) / 0.18) * 0.32;
      }
    }
  }

  for (let attempt = 0; attempt < maxAttempts && nodes.length < coreTarget; attempt += 1) {
    const p = {
      x: (rng() * 2 - 1) * 0.18 + 0.06,
      y: (rng() * 2 - 1) * 0.48 + 0.38,
      z: (rng() * 2 - 1) * 0.22,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.045) {
      continue;
    }
    let keep = 0.12 + Math.pow(Math.min(1.25, density), 1.4) * 0.86;
    if (p.y < 0.1) {
      keep *= 0.16;
    }
    if (p.y < 0.02) {
      keep *= 0.05;
    }
    if (p.x > 0.3 && p.y < 0.45) {
      keep *= 0.28;
    }
    if (p.x < -0.18) {
      keep *= 0.4;
    }
    if (p.y > 0.3 && p.y < 0.68 && p.x > -0.12 && p.x < 0.24) {
      keep *= 1.72;
    } else if (p.y > 0.16 && p.x > -0.08 && p.x < 0.16) {
      keep *= 1.18;
    }
    if (rng() > keep) {
      continue;
    }
    const color = mixColor(p);
    const edge = Math.max(0, 1 - density / 0.7);
    nodes.push({
      x: p.x,
      y: p.y,
      z: p.z,
      r: color.r,
      g: color.g,
      b: color.b,
      size: 1.72 + density * 1.15 + rng() * 0.28 + color.ribbon * 0.48 - edge * 0.06,
      cluster,
      density,
      bright: 0,
      mist: 0,
    });
  }

  const regionFill = Math.floor(coreTarget * 0.035);
  let regionMade = 0;
  let regionTries = 0;
  while (regionMade < regionFill && regionTries < regionFill * 50) {
    regionTries += 1;
    const focus = FOCI[Math.floor(rng() * FOCI.length)];
    const p = {
      x: focus.cx + (rng() * 2 - 1) * focus.rx * 0.85,
      y: focus.cy + (rng() * 2 - 1) * focus.ry * 0.85,
      z: focus.cz + (rng() * 2 - 1) * focus.rz * 0.85,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.02) {
      continue;
    }
    const color = mixColor(p);
    nodes.push({
      x: p.x,
      y: p.y,
      z: p.z,
      r: color.r,
      g: color.g,
      b: color.b,
      size: 1.48 + density * 0.95 + color.ribbon * 0.32,
      cluster,
      density: Math.max(density, 0.22),
      bright: 0,
      mist: 0,
    });
    regionMade += 1;
  }

  const crownCoreRng = mulberry32((seed ^ 0x91c2) >>> 0);
  const crownCoreTarget = Math.floor(coreTarget * 0.16);
  let crownCoreMade = 0;
  let crownCoreTries = 0;
  while (crownCoreMade < crownCoreTarget && crownCoreTries < crownCoreTarget * 40) {
    crownCoreTries += 1;
    const p = {
      x: crownCoreRng() * 0.26 - 0.08,
      y: crownCoreRng() * 0.28 + 0.38,
      z: (crownCoreRng() * 2 - 1) * 0.16,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.05) {
      continue;
    }
    const color = mixColor(p);
    nodes.push({
      x: p.x,
      y: p.y,
      z: p.z,
      r: color.r,
      g: color.g,
      b: color.b,
      size: 1.42 + density * 0.78 + color.ribbon * 0.34,
      cluster,
      density: Math.max(density, 0.2),
      bright: 0,
      mist: 0,
    });
    crownCoreMade += 1;
  }

  remapDensity(nodes);
  assignActivity(nodes, rng);

  let mistAttempts = 0;
  let mistMade = 0;
  const mistMax = mistTarget * 14;
  while (mistMade < mistTarget && mistAttempts < mistMax) {
    mistAttempts += 1;
    const p = {
      x: (rng() * 2 - 1) * 0.16 + 0.06,
      y: (rng() * 2 - 1) * 0.42 + 0.42,
      z: (rng() * 2 - 1) * 0.28,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.09 || density > 0.48 || p.y < 0.08 || p.x > 0.34) {
      continue;
    }
    const color = mixColor(p);
    nodes.push({
      x: p.x,
      y: p.y,
      z: p.z,
      r: Math.min(1.15, color.r * 0.92),
      g: Math.min(1.15, color.g * 0.86),
      b: Math.min(1.15, color.b * 0.9),
      size: (budget.nodes < 3500 ? 1.45 : 1.7) + rng() * 0.4,
      cluster,
      density: Math.max(0.05, density * 0.55),
      bright: 0,
      mist: 1,
    });
    mistMade += 1;
  }

  const hazeRng = mulberry32((seed ^ 0xa5c3) >>> 0);
  const extraHaze = Math.floor(mistTarget * 0.04);
  let extraMade = 0;
  let extraTries = 0;
  while (extraMade < extraHaze && extraTries < extraHaze * 22) {
    extraTries += 1;
    const p = {
      x: hazeRng() * 0.18 - 0.02,
      y: hazeRng() * 0.3 + 0.32,
      z: (hazeRng() * 2 - 1) * 0.16,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.1 || density > 0.48) {
      continue;
    }
    const color = mixColor(p);
    nodes.push({
      x: p.x,
      y: p.y,
      z: p.z,
      r: Math.min(1.08, color.r * 0.88),
      g: Math.min(1.1, color.g * 0.98),
      b: Math.min(1.12, color.b * 1.04),
      size: (budget.nodes < 3500 ? 1.5 : 1.75) + hazeRng() * 0.35,
      cluster,
      density: Math.max(0.06, density * 0.62),
      bright: 0,
      mist: 1,
    });
    extraMade += 1;
  }

  const crownRng = mulberry32((seed ^ 0xe2b7) >>> 0);
  const crownTarget = Math.floor(mistTarget * 0.38);
  let crownMade = 0;
  let crownTries = 0;
  while (crownMade < crownTarget && crownTries < crownTarget * 28) {
    crownTries += 1;
    const p = {
      x: crownRng() * 0.24 - 0.02,
      y: crownRng() * 0.22 + 0.52,
      z: (crownRng() * 2 - 1) * 0.16,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.08 || density > 0.56) {
      continue;
    }
    const color = mixColor(p);
    nodes.push({
      x: p.x,
      y: p.y,
      z: p.z,
      r: Math.min(1.02, color.r * 0.78),
      g: Math.min(1.14, color.g * 1.12),
      b: Math.min(1.16, color.b * 1.14),
      size: (budget.nodes < 3500 ? 1.45 : 1.7) + crownRng() * 0.35,
      cluster,
      density: Math.max(0.06, density * 0.6),
      bright: 0,
      mist: 1,
    });
    crownMade += 1;
  }

  const bridgeRng = mulberry32((seed ^ 0xd1e4) >>> 0);
  const bridgeTarget = Math.floor(mistTarget * 0.06);
  let bridgeMade = 0;
  let bridgeTries = 0;
  while (bridgeMade < bridgeTarget && bridgeTries < bridgeTarget * 28) {
    bridgeTries += 1;
    const p = {
      x: bridgeRng() * 0.18 - 0.02,
      y: bridgeRng() * 0.22 + 0.22,
      z: (bridgeRng() * 2 - 1) * 0.16,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.06 || density > 0.55) {
      continue;
    }
    const color = mixColor(p);
    nodes.push({
      x: p.x,
      y: p.y,
      z: p.z,
      r: Math.min(1.06, color.r * 0.9),
      g: Math.min(1.1, color.g * 1.0),
      b: Math.min(1.12, color.b * 1.04),
      size: (budget.nodes < 3500 ? 1.4 : 1.65) + bridgeRng() * 0.3,
      cluster,
      density: Math.max(0.05, density * 0.58),
      bright: 0,
      mist: 1,
    });
    bridgeMade += 1;
  }

  const coveRng = mulberry32((seed ^ 0xc0a1) >>> 0);
  const coveTarget = Math.floor(mistTarget * 0.04);
  let coveMade = 0;
  let coveTries = 0;
  while (coveMade < coveTarget && coveTries < coveTarget * 40) {
    coveTries += 1;
    const p = {
      x: coveRng() * 0.2 - 0.24,
      y: coveRng() * 0.18 + 0.1,
      z: (coveRng() * 2 - 1) * 0.14,
    };
    const { density, cluster } = fieldAt(p);
    if (density > 0.24) {
      continue;
    }
    const color = mixColor(p);
    nodes.push({
      x: p.x,
      y: p.y,
      z: p.z,
      r: Math.min(1.12, color.r * 1.0),
      g: Math.min(1.08, color.g * 0.92),
      b: Math.min(1.14, color.b * 1.02),
      size: (budget.nodes < 3500 ? 1.4 : 1.65) + coveRng() * 0.3,
      cluster,
      density: Math.max(0.04, density * 0.42),
      bright: 0,
      mist: 1,
    });
    coveMade += 1;
  }

  for (const node of nodes) {
    const torso = node.y > 0.22 && node.y < 0.5 && node.x > -0.12 && node.x < 0.22;
    const inCove = node.x <= 0.0 && node.x > -0.12 && node.y > 0.28 && node.y < 0.48;
    const crown = node.y > 0.5 && node.x > -0.12 && node.x < 0.28;
    const inBody = torso || crown;
    if (node.y < 0.12) {
      const foot = node.y < 0.04 ? 0.06 : 0.14;
      node.size *= foot;
      node.r *= foot + 0.04;
      node.g *= foot + 0.03;
      node.b *= foot + 0.05;
      if (!node.mist) {
        node.bright *= 0.06;
      }
    }
    if (node.x > 0.26 && node.y < 0.4) {
      const rim = node.x > 0.32 ? 0.08 : 0.22;
      node.size *= rim;
      node.r *= rim + 0.08;
      node.g *= rim + 0.06;
      node.b *= rim + 0.1;
      if (!node.mist) {
        node.bright *= 0.28;
      }
    }
    if (!inBody && node.x < -0.08) {
      node.size *= 0.32;
      node.r *= 0.36;
      node.g *= 0.34;
      node.b *= 0.4;
      if (!node.mist) {
        node.bright *= 0.18;
      }
    }
    if (node.mist) {
      if (node.r > node.g * 1.04 && node.r > node.b) {
        node.r = node.r * 0.55 + node.g * 0.12 + 0.18;
        node.g = Math.min(1.08, node.g * 1.08);
        node.b = Math.min(1.12, node.b * 1.12);
      }
      if (node.y < 0.1) {
        continue;
      } else if (inCove) {
        node.r = Math.min(1.02, node.r * 0.96);
        node.g = Math.min(1.04, node.g * 1.0);
        node.b = Math.min(1.1, node.b * 1.06);
        node.size *= 1.08;
      } else if (crown) {
        if (node.x > 0.1) {
          node.r = Math.min(0.96, node.r * 0.7);
          node.g = Math.min(1.14, node.g * 1.2);
          node.b = Math.min(1.16, node.b * 1.18);
        } else {
          node.r = Math.min(1.08, node.r * 1.08);
          node.g = Math.min(1.02, node.g * 0.92);
          node.b = Math.min(1.14, node.b * 1.08);
        }
        node.size *= 0.92;
      } else if (torso && node.x > -0.04) {
        node.size *= 0.94;
        node.r = Math.min(1.0, node.r * 0.92);
      }
      continue;
    }
    if (node.bright > 0.85) {
      const lit = inBody;
      node.size *= lit ? 1.08 : 0.4;
      node.bright = lit ? 0.96 : 0.16;
      node.r = Math.min(1.16, node.r * (lit ? 1.08 : 0.62));
      node.g = Math.min(1.12, node.g * (lit ? 1.04 : 0.62));
      node.b = Math.min(1.18, node.b * (lit ? 1.1 : 0.66));
    } else if (node.bright > 0.45) {
      const lit = inBody;
      node.size *= lit ? 0.96 : 0.4;
      node.bright = lit ? 0.82 : 0.18;
      node.r = Math.min(1.14, node.r * (lit ? 1.08 : 0.7));
      node.g = Math.min(1.1, node.g * (lit ? 1.06 : 0.7));
      node.b = Math.min(1.16, node.b * (lit ? 1.12 : 0.72));
    } else if (inBody && node.bright > 0.18) {
      node.size *= 0.88;
      node.bright = 0.42;
      node.r = Math.min(1.06, node.r * 1.02);
      node.g = Math.min(1.06, node.g * 1.04);
      node.b = Math.min(1.1, node.b * 1.06);
    } else if (node.bright < 0.12) {
      node.size *= 0.62;
    }
    const keepWarm = node.bright > 0.8 && node.y > 0.13 && node.y < 0.2 && node.x > -0.06 && node.x < 0.06;
    if (!keepWarm && node.r > node.g * 1.04 && node.r > node.b) {
      node.r = node.r * 0.58 + 0.22;
      node.g = Math.min(1.08, node.g * 1.1);
      node.b = Math.min(1.12, node.b * 1.16);
    }
    const violet = node.b > node.g * 1.12 && node.r > node.g * 0.82;
    if (violet && !node.mist) {
      node.r = Math.min(1.18, node.r * 1.22);
      node.b = Math.min(1.22, node.b * 1.18);
      node.g = Math.min(node.g * 0.9, node.r * 0.52);
    }
    const luma = node.r * 0.22 + node.g * 0.55 + node.b * 0.23;
    const lumaCap = node.mist ? 0.1 : violet ? 0.5 : crown ? 0.5 : torso ? 0.4 : 0.24;
    if (luma > lumaCap) {
      const s = lumaCap / luma;
      node.r *= s;
      node.g *= s;
      node.b *= s;
    }
  }

  const coreNodes = nodes.filter((node) => !node.mist);
  const centralBudget = Math.floor(budget.filaments * 0.045);
  const filaments = buildPlexus(coreNodes, Math.max(1, budget.filaments - centralBudget), rng);
  filaments.push(...addCentralFilaments(coreNodes, centralBudget, rng));

  const pairs: Array<[number, number]> = [
    [0, 1],
    [1, 3],
    [2, 3],
    [0, 3],
  ];
  for (let c = 0; c < pairs.length; c += 1) {
    const from = FOCI[pairs[c][0]];
    const to = FOCI[pairs[c][1]];
    const aPool = coreNodes.filter((node) => {
      const dx = (node.x - from.cx) / from.rx;
      const dy = (node.y - from.cy) / from.ry;
      return dx * dx + dy * dy < 1.2;
    });
    const bPool = coreNodes.filter((node) => {
      const dx = (node.x - to.cx) / to.rx;
      const dy = (node.y - to.cy) / to.ry;
      return dx * dx + dy * dy < 1.2;
    });
    if (aPool.length < 3 || bPool.length < 3) {
      continue;
    }
    const a = aPool[Math.floor(rng() * aPool.length)];
    const b = bPool[Math.floor(rng() * bPool.length)];
    const hole = VOIDS[c % VOIDS.length];
    const mid = {
      x: hole.cx + (rng() - 0.5) * 0.08,
      y: hole.cy + (rng() - 0.5) * 0.07,
      z: hole.cz + (rng() - 0.5) * 0.06,
    };
    const tint = mixColor(mid);
    filaments.push({
      points: tessellate(a, mid, b, 14),
      alpha: 0.08 + rng() * 0.03,
      r: tint.r,
      g: tint.g,
      b: tint.b,
      current: true,
    });
    if (rng() > 0.45) {
      const branch = bPool[Math.floor(rng() * bPool.length)];
      filaments.push({
        points: tessellate(b, {
          x: (b.x + branch.x) * 0.5 + (rng() - 0.5) * 0.05,
          y: (b.y + branch.y) * 0.5 + (rng() - 0.5) * 0.05,
          z: (b.z + branch.z) * 0.5 + (rng() - 0.5) * 0.05,
        }, branch, 8),
        alpha: 0.07 + rng() * 0.03,
        r: tint.r,
        g: tint.g,
        b: tint.b,
        current: true,
      });
    }
  }

  for (const filament of filaments) {
    const start = filament.points[0];
    const end = filament.points[filament.points.length - 1];
    const mid = filament.points[Math.floor(filament.points.length / 2)] ?? start;
    if (!filament.current) {
      const meaningful =
        nearFocus(start) < 1.55 ||
        nearFocus(end) < 1.55 ||
        nearVoid(mid) < 1.25;
      filament.alpha *= meaningful ? 1.12 : 0.88;
    }
    const gx = (start.x + end.x + mid.x) / 3;
    const gy = (start.y + end.y + mid.y) / 3;
    if (gy > 0.32 && gy < 0.6) {
      filament.alpha *= 0.62;
    } else if (gy > 0.12 && gy < 0.32) {
      filament.alpha *= 0.5;
    } else if (gy < 0.04) {
      filament.alpha *= 0.12;
    } else if (gy < 0.12) {
      filament.alpha *= 0.28;
    }
    if (gx > 0.3) {
      filament.alpha *= 0.32;
    }
  }

  addCoveTissue(nodes, coreNodes, filaments, seed);
  addCrownTissue(nodes, coreNodes, filaments, seed);

  const membranes: NexusMembrane[] = [];
  const densePool = coreNodes.filter((node) => node.density > 0.5);
  const pool = densePool.length > 16 ? densePool : coreNodes;
  const cyanPool = pool.filter((node) => node.g - node.r > 0.12 && node.g > 0.4);
  const violetPool = pool.filter((node) => node.b - node.g > 0.08 && node.b > 0.45 && node.r > 0.28);
  const patchCount = 22;
  for (let p = 0; p < patchCount; p += 1) {
    const bucket = p % 2 === 0 ? cyanPool : violetPool;
    const source = bucket.length > 4 ? bucket : pool;
    const start = source[Math.floor(rng() * source.length)];
    const picks: NexusNode[] = [start];
    for (const candidate of pool) {
      if (picks.length >= 6) {
        break;
      }
      if (dist2(start, candidate) < 0.07 && rng() > 0.28) {
        picks.push(candidate);
      }
    }
    if (picks.length < 4) {
      continue;
    }
    const centroid = {
      x: picks.reduce((sum, node) => sum + node.x, 0) / picks.length,
      y: picks.reduce((sum, node) => sum + node.y, 0) / picks.length,
      z: picks.reduce((sum, node) => sum + node.z, 0) / picks.length,
    };
    const silk = {
      r: Math.min(1.1, start.r),
      g: Math.min(1.1, start.g),
      b: Math.min(1.1, start.b),
    };
    for (let i = 0; i < picks.length - 1; i += 1) {
      membranes.push({
        ax: centroid.x,
        ay: centroid.y,
        az: centroid.z,
        bx: picks[i].x,
        by: picks[i].y,
        bz: picks[i].z,
        cx: picks[i + 1].x,
        cy: picks[i + 1].y,
        cz: picks[i + 1].z,
        r: silk.r,
        g: silk.g,
        b: silk.b,
        alpha: 0.024 + rng() * 0.012,
      });
    }
  }

  for (const membrane of membranes) {
    const cy = (membrane.ay + membrane.by + membrane.cy) / 3;
    if (cy < 0.08) {
      membrane.alpha *= 0.04;
    } else if (cy < 0.14) {
      membrane.alpha *= 0.18;
    } else if (cy > 0.3) {
      membrane.alpha *= 1.12;
    } else if (cy > 0.14 && cy < 0.3) {
      membrane.alpha *= 0.82;
    }
  }

  const coveMembRng = mulberry32((seed ^ 0xc3d9) >>> 0);
  const coveFlesh = nodes.filter(
    (node) => node.mist && node.x < -0.04 && node.x > -0.26 && node.y > 0.1 && node.y < 0.32,
  );
  if (coveFlesh.length > 10) {
    for (let p = 0; p < 16; p += 1) {
      const start = coveFlesh[Math.floor(coveMembRng() * coveFlesh.length)];
      const picks: NexusNode[] = [start];
      for (const candidate of coveFlesh) {
        if (picks.length >= 4) {
          break;
        }
        if (dist2(start, candidate) < 0.055 && coveMembRng() > 0.35) {
          picks.push(candidate);
        }
      }
      if (picks.length < 3) {
        continue;
      }
      const centroid = {
        x: picks.reduce((sum, node) => sum + node.x, 0) / picks.length,
        y: picks.reduce((sum, node) => sum + node.y, 0) / picks.length,
        z: picks.reduce((sum, node) => sum + node.z, 0) / picks.length,
      };
      membranes.push({
        ax: centroid.x,
        ay: centroid.y,
        az: centroid.z,
        bx: picks[0].x,
        by: picks[0].y,
        bz: picks[0].z,
        cx: picks[1].x,
        cy: picks[1].y,
        cz: picks[1].z,
        r: Math.min(1.0, start.r * 0.9),
        g: Math.min(1.0, start.g * 0.86),
        b: Math.min(1.0, start.b * 0.92),
        alpha: 0.028 + coveMembRng() * 0.014,
      });
    }
  }

  const foci: Vec3[] = FOCI.map((focus) => ({ x: focus.cx, y: focus.cy, z: focus.cz }));
  const hubs: NexusHub[] = [
    { x: FOCI[0].cx + 0.1, y: FOCI[0].cy + 0.08, z: FOCI[0].cz, cluster: 0 },
    { x: FOCI[1].cx - 0.08, y: FOCI[1].cy + 0.05, z: FOCI[1].cz, cluster: 1 },
    { x: FOCI[2].cx + 0.06, y: FOCI[2].cy - 0.1, z: FOCI[2].cz, cluster: 2 },
  ];

  return { nodes, filaments, membranes, hubs, foci, volume: bakeNexusVolume() };
}

export function wakePositions(time: number): { wakes: [Vec3, Vec3, Vec3]; nexus: Vec3; boost: number } {
  const t = time;
  const a = { x: FOCI[0].cx, y: FOCI[0].cy, z: FOCI[0].cz };
  const b = { x: FOCI[1].cx, y: FOCI[1].cy, z: FOCI[1].cz };
  const c = { x: FOCI[2].cx, y: FOCI[2].cy, z: FOCI[2].cz };
  const d = { x: FOCI[3].cx, y: FOCI[3].cy, z: FOCI[3].cz };
  const wakes: [Vec3, Vec3, Vec3] = [
    lerp(a, b, 0.5 + 0.48 * Math.sin(t * 0.48)),
    lerp(c, d, 0.5 + 0.46 * Math.sin(t * 0.41 + 1.15)),
    lerp(b, d, 0.5 + 0.44 * Math.sin(t * 0.36 + 2.35)),
  ];

  const d01 = Math.hypot(wakes[0].x - wakes[1].x, wakes[0].y - wakes[1].y, wakes[0].z - wakes[1].z);
  const d02 = Math.hypot(wakes[0].x - wakes[2].x, wakes[0].y - wakes[2].y, wakes[0].z - wakes[2].z);
  const d12 = Math.hypot(wakes[1].x - wakes[2].x, wakes[1].y - wakes[2].y, wakes[1].z - wakes[2].z);
  const nearest = Math.min(d01, d02, d12);
  const boost = Math.max(0, Math.min(1, (0.42 - nearest) / 0.28));

  let nexus: Vec3;
  if (d01 <= d02 && d01 <= d12) {
    nexus = lerp(wakes[0], wakes[1], 0.5);
  } else if (d02 <= d12) {
    nexus = lerp(wakes[0], wakes[2], 0.5);
  } else {
    nexus = lerp(wakes[1], wakes[2], 0.5);
  }

  return { wakes, nexus, boost };
}
