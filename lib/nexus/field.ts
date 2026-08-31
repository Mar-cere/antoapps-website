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

export type NexusField = {
  nodes: NexusNode[];
  filaments: NexusFilament[];
  membranes: NexusMembrane[];
  hubs: NexusHub[];
  foci: Vec3[];
};

export type NexusBudget = {
  nodes: number;
  filaments: number;
};

const PSYCHE = [
  [0.78, 0.2, 1.0],
  [0.86, 0.28, 0.97],
  [0.7, 0.16, 0.98],
  [0.92, 0.34, 0.88],
];
const PERSONA = [
  [0.12, 0.92, 0.98],
  [0.18, 0.95, 0.82],
  [0.42, 0.96, 1.0],
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
const WARM = [1.0, 0.76, 0.26];

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
 * Una masa irregular suspendida, más ancha que alta.
 * Los lóbulos se solapan a propósito: un organismo, no islas.
 */
const LOBES: readonly Ellipsoid[] = [
  { cx: 0.16, cy: 0.4, cz: 0.02, rx: 0.18, ry: 0.17, rz: 0.11, weight: 0.95 },
  { cx: -0.06, cy: 0.34, cz: -0.05, rx: 0.12, ry: 0.13, rz: 0.09, weight: 0.58 },
  { cx: 0.28, cy: 0.2, cz: 0.06, rx: 0.14, ry: 0.15, rz: 0.1, weight: 0.8 },
  { cx: 0.06, cy: 0.1, cz: 0.0, rx: 0.16, ry: 0.2, rz: 0.12, weight: 1.0 },
  { cx: -0.2, cy: 0.04, cz: -0.04, rx: 0.14, ry: 0.13, rz: 0.09, weight: 0.66 },
  { cx: 0.0, cy: -0.12, cz: 0.03, rx: 0.18, ry: 0.16, rz: 0.1, weight: 0.82 },
  { cx: 0.24, cy: -0.22, cz: 0.05, rx: 0.12, ry: 0.14, rz: 0.09, weight: 0.66 },
  { cx: 0.14, cy: -0.38, cz: 0.0, rx: 0.11, ry: 0.12, rz: 0.08, weight: 0.58 },
  { cx: -0.16, cy: -0.24, cz: -0.02, rx: 0.08, ry: 0.09, rz: 0.06, weight: 0.42 },
  { cx: 0.16, cy: 0.0, cz: 0.02, rx: 0.13, ry: 0.14, rz: 0.1, weight: 0.72 },
];

type RegionKind = 'vp' | 'cp' | 'vc' | 'nx';

type ActivityRegion = Ellipsoid & { kind: RegionKind };

const FOCI: readonly ActivityRegion[] = [
  { cx: 0.18, cy: 0.18, cz: 0.04, rx: 0.2, ry: 0.16, rz: 0.13, weight: 0.13, kind: 'vp' },
  { cx: -0.16, cy: 0.04, cz: -0.06, rx: 0.18, ry: 0.16, rz: 0.12, weight: 0.12, kind: 'cp' },
  { cx: 0.24, cy: -0.08, cz: 0.07, rx: 0.17, ry: 0.14, rz: 0.11, weight: 0.11, kind: 'vc' },
  { cx: -0.02, cy: 0.12, cz: -0.1, rx: 0.14, ry: 0.12, rz: 0.1, weight: 0.09, kind: 'nx' },
];

const VOIDS: readonly Ellipsoid[] = [
  { cx: 0.08, cy: 0.12, cz: 0.0, rx: 0.1, ry: 0.09, rz: 0.07, weight: -0.78 },
  { cx: 0.16, cy: -0.02, cz: 0.03, rx: 0.08, ry: 0.08, rz: 0.06, weight: -0.66 },
  { cx: 0.1, cy: 0.3, cz: 0.02, rx: 0.08, ry: 0.07, rz: 0.06, weight: -0.58 },
  { cx: -0.08, cy: 0.16, cz: 0.04, rx: 0.07, ry: 0.07, rz: 0.05, weight: -0.5 },
  { cx: 0.2, cy: -0.06, cz: -0.04, rx: 0.07, ry: 0.07, rz: 0.05, weight: -0.48 },
  { cx: 0.04, cy: -0.22, cz: 0.0, rx: 0.08, ry: 0.07, rz: 0.05, weight: -0.52 },
  { cx: 0.3, cy: 0.36, cz: 0.0, rx: 0.06, ry: 0.07, rz: 0.05, weight: -0.36 },
  { cx: -0.14, cy: -0.08, cz: 0.02, rx: 0.06, ry: 0.06, rz: 0.05, weight: -0.4 },
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
  if (p.y < -0.46) {
    density *= Math.max(0, 0.3 + (p.y + 0.62) * 1.6);
  }
  const rx = (p.x - 0.06) / 0.46;
  const ry = (p.y - 0.02) / 0.6;
  const rz = p.z / 0.3;
  let rad = rx * rx * 0.9 + ry * ry * 0.95 + rz * rz;
  rad += Math.max(0, p.x - 0.26) * Math.max(0, -0.02 - p.y) * 4.2;
  rad += Math.max(0, -0.24 - p.x) * Math.max(0, p.y - 0.16) * 3.4;
  if (rad > 0.96) {
    density *= Math.max(0, 1.12 - rad * 0.5);
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

function mixColor(p: Vec3): { r: number; g: number; b: number; ribbon: number } {
  const n = hash3(p.x, p.y, p.z);
  const n2 = hash3(p.z + 1.7, p.x - 0.4, p.y + 2.1);
  const rViolet =
    ribbon(p, -0.14, 0.18, -0.04, 2.05, 0.3, 0.2, 0.14) * 1.32 +
    slant(p, -0.16, 0.24, 0.08, -0.06, 0.02, 0.08, 0.1) * 1.18 +
    ribbon(p, 0.16, -0.16, 0.02, 1.58, 3.8, 0.15, 0.11) * 0.48;
  const rCyan =
    ribbon(p, 0.2, 0.18, 0.04, 1.88, 1.15, 0.18, 0.13) * 1.22 +
    slant(p, 0.22, 0.26, 0.04, -0.04, -0.02, 0.075, 0.1) * 0.92 +
    ribbon(p, 0.22, -0.04, 0.02, 1.6, 2.8, 0.14, 0.11) * 0.48;
  const rTeal =
    ribbon(p, 0.18, 0.1, -0.06, 1.74, 0.9, 0.13, 0.1) * 0.32;
  const rBlue =
    ribbon(p, -0.06, 0.26, 0.08, 1.55, 0.85, 0.15, 0.11) * 0.3 +
    ribbon(p, -0.16, 0.02, 0.02, 1.82, 1.7, 0.13, 0.1) * 0.24;
  const rise = Math.max(0, Math.min(1, (p.y - 0.1) / 0.24));
  const rWarm =
    (slant(p, -0.18, -0.28, -0.02, 0.3, 0.0, 0.068, 0.1) * 1.28 +
      slant(p, -0.12, 0.1, -0.02, 0.36, 0.01, 0.065, 0.09) * 1.42 +
      slant(p, -0.1, -0.16, 0.04, 0.06, -0.03, 0.055, 0.08) * 0.32) *
    (1 + rise * 1.45);
  const bandV = Math.pow(0.5 + 0.5 * Math.sin(p.x * 3.4 + p.y * 2.6 + p.z * 2.1 + 0.7), 3.6);
  const bandC = Math.pow(0.5 + 0.5 * Math.sin(p.x * 2.9 - p.y * 3.4 + p.z * 2.2 + 3.9), 3.6);
  const bandB = Math.pow(0.5 + 0.5 * Math.sin(-p.x * 2.4 + p.y * 3.8 - p.z * 1.8 + 2.2), 3.6);
  const bandW = Math.pow(0.5 + 0.5 * Math.sin(p.x * 2.2 + p.y * 3.6 + p.z * 1.6 + 4.7), 3.6);
  const ribbonPeak = Math.max(rViolet, rCyan, rWarm);
  const thread = Math.min(1, Math.max(0, (ribbonPeak - 0.14) / 0.5));
  let psyche = rViolet * 1.4 + bandV * 0.05 + (n - 0.5) * 0.02;
  let persona = rCyan * 1.58 + rTeal * 0.28 + bandC * 0.05;
  let cortex = rBlue * 0.55 + bandB * 0.05 + (n2 - 0.5) * 0.02;
  let deep = 0.16 * (1 - thread * 0.92);
  let warm = rWarm * 1.7 + bandW * 0.05;
  for (const focus of FOCI) {
    const influence = Math.min(1.1, Math.max(0, gauss(p, { ...focus, weight: 1 })));
    if (focus.kind === 'vp') {
      persona += influence * 0.16;
      psyche += influence * 0.08;
      warm += influence * 0.05;
    } else if (focus.kind === 'cp') {
      psyche += influence * 0.18;
      cortex += influence * 0.08;
      warm += influence * 0.08;
      persona += influence * 0.04;
    } else if (focus.kind === 'vc') {
      persona += influence * 0.16;
      warm += influence * 0.04;
      cortex += influence * 0.06;
    } else {
      persona += influence * 0.1;
      psyche += influence * 0.08;
      warm += influence * 0.1;
    }
  }
  psyche = Math.max(0.012, psyche);
  persona = Math.max(0.012, persona);
  cortex = Math.max(0.01, cortex);
  deep = Math.max(0.02, deep);
  warm = Math.max(0.008, warm);
  const peak = Math.max(psyche, persona, cortex, warm);
  if (peak > 0) {
    if (psyche === peak) psyche *= 1.16;
    else if (persona === peak) persona *= 1.16;
    else if (warm === peak) warm *= 1.16;
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
  const sat = 1.42 + thread * 0.7;
  r = Math.min(1.2, Math.max(0, luma + (r - luma) * sat));
  g = Math.min(1.2, Math.max(0, luma + (g - luma) * sat));
  b = Math.min(1.2, Math.max(0, luma + (b - luma) * sat));
  if (thread > 0.22) {
    let sr: number;
    let sg: number;
    let sb: number;
    const warmLead = rWarm >= rCyan * (p.y > 0.04 ? 0.7 : 1) && rWarm >= rViolet * (p.y > 0.04 ? 0.7 : 1);
    if (warmLead) {
      sr = WARM[0];
      sg = WARM[1];
      sb = WARM[2];
    } else if (rCyan >= rViolet) {
      sr = nA[0];
      sg = nA[1];
      sb = nA[2];
    } else {
      sr = pA[0];
      sg = pA[1];
      sb = pA[2];
    }
    const stampLuma = sr * 0.22 + sg * 0.55 + sb * 0.23;
    const lift = ((warmLead ? 0.5 : 0.42) + thread * 0.32) / Math.max(0.08, stampLuma);
    sr = Math.min(1.2, sr * lift);
    sg = Math.min(1.2, sg * lift);
    sb = Math.min(1.2, sb * lift);
    const w = thread * 0.76;
    r = r * (1 - w) + sr * w;
    g = g * (1 - w) + sg * w;
    b = b * (1 - w) + sb * w;
  }
  if (thread < 0.22) {
    const body = 1 - thread / 0.22;
    const crush = (0.13 + thread * 0.22) / Math.max(0.05, r * 0.22 + g * 0.55 + b * 0.23);
    r = Math.max(0, (r * (1 - body * 0.62) + dA[0] * body * 0.62) * crush);
    g = Math.max(0, (g * (1 - body * 0.62) + dA[1] * body * 0.62) * crush);
    b = Math.max(0, (b * (1 - body * 0.62) + dA[2] * body * 0.62) * crush);
  }
  const ribbonStrength = Math.max(rViolet, rCyan, rTeal, rBlue, rWarm);
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
  const convTarget = Math.max(3, Math.round(n * 0.014));
  const activeTarget = Math.max(8, Math.round(n * 0.07));
  const moderateTarget = Math.max(20, Math.round(n * 0.22));
  const tissueMod = Math.round(moderateTarget * 0.28);
  const regionalMod = moderateTarget - tissueMod;
  const share = [0.34, 0.28, 0.22, 0.16];
  const buckets: { i: number; score: number }[][] = [[], [], [], []];
  const tissue: { i: number; score: number }[] = [];

  for (let i = 0; i < n; i += 1) {
    const node = nodes[i];
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
      mark(buckets[f][k].i, 1, 2.35);
    }
    for (let k = convTake; k < convTake + activeTake && k < buckets[f].length; k += 1) {
      mark(buckets[f][k].i, 0.7, 1.7);
    }
    for (let k = convTake + activeTake; k < convTake + activeTake + modTake && k < buckets[f].length; k += 1) {
      mark(buckets[f][k].i, 0.22, 1.08);
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
    mark(item.i, 0.22, 1.05);
    added += 1;
  }

  const nexusTint = [0.82, 0.9, 1.0];
  for (const node of nodes) {
    if (node.bright < 0.9) {
      continue;
    }
    if (rng() < 0.28) {
      const t = 0.06 + rng() * 0.08;
      node.r = node.r * (1 - t) + nexusTint[0] * t;
      node.g = node.g * (1 - t) + nexusTint[1] * t;
      node.b = node.b * (1 - t) + nexusTint[2] * t;
    }
    if (rng() < 0.055) {
      node.r = node.r * 0.85 + WARM[0] * 0.15;
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
  const sat = onThread ? 1.88 : 1.4;
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
    alpha: onThread ? alpha * 1.32 : alpha,
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
    const take = a.density > 0.48 ? 8 : a.density > 0.16 ? 6 : 4;
    for (let n = 0; n < Math.min(take, near.length); n += 1) {
      const j = near[n].j;
      const b = core[j];
      const mid: Vec3 = {
        x: (a.x + b.x) * 0.5 + (rng() - 0.5) * 0.022,
        y: (a.y + b.y) * 0.5 + (rng() - 0.5) * 0.018,
        z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.02,
      };
      const alpha = 0.13 + Math.min(a.density, b.density) * 0.14 + rng() * 0.04;
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
    tryEdge(i, best, mid, 5, 0.13 + rng() * 0.04, false);
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
      tryEdge(i, next, mid, 3, 0.14 + rng() * 0.04, false);
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
    out.push(makeFilament(a, best, mid, 6, 0.13 + rng() * 0.03, false));
  }
  return out;
}

export function nexusBudget(width: number): NexusBudget {
  if (width < 768) {
    return { nodes: 3000, filaments: 2800 };
  }
  if (width < 1024) {
    return { nodes: 5200, filaments: 4400 };
  }
  return { nodes: 7800, filaments: 6800 };
}

export function buildNexusField(budget: NexusBudget, seed = 0xd4a1): NexusField {
  const rng = mulberry32(seed);
  const coreTarget = Math.floor(budget.nodes * 0.82);
  const mistTarget = budget.nodes - coreTarget;
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
      x: (rng() * 2 - 1) * 0.56 + 0.06,
      y: (rng() * 2 - 1) * 0.68 + 0.02,
      z: (rng() * 2 - 1) * 0.36,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.068) {
      continue;
    }
    const keep = 0.08 + Math.pow(Math.min(1.25, density), 1.55) * 0.78;
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
      size: 1.05 + density * 0.55 + rng() * 0.16 + color.ribbon * 0.22 - edge * 0.12,
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
      size: 1.15 + density * 0.7 + color.ribbon * 0.2,
      cluster,
      density: Math.max(density, 0.22),
      bright: 0,
      mist: 0,
    });
    regionMade += 1;
  }

  remapDensity(nodes);
  assignActivity(nodes, rng);

  let mistAttempts = 0;
  let mistMade = 0;
  const mistMax = mistTarget * 14;
  while (mistMade < mistTarget && mistAttempts < mistMax) {
    mistAttempts += 1;
    const p = {
      x: (rng() * 2 - 1) * 0.5 + 0.06,
      y: (rng() * 2 - 1) * 0.6 + 0.02,
      z: (rng() * 2 - 1) * 0.28,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.09 || density > 0.48) {
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
      size: (budget.nodes < 3500 ? 1.45 : 1.75) + rng() * 0.55,
      cluster,
      density: Math.max(0.05, density * 0.55),
      bright: 0,
      mist: 1,
    });
    mistMade += 1;
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
      alpha: 0.16 + rng() * 0.05,
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
        alpha: 0.16 + rng() * 0.05,
        r: tint.r,
        g: tint.g,
        b: tint.b,
        current: true,
      });
    }
  }

  for (const filament of filaments) {
    const onFlow =
      filament.g - filament.r > 0.14 ||
      filament.b - filament.g > 0.14 ||
      filament.r - filament.b > 0.14;
    if (onFlow) {
      filament.alpha *= 1.18;
    }
    if (filament.current) {
      continue;
    }
    const start = filament.points[0];
    const end = filament.points[filament.points.length - 1];
    const mid = filament.points[Math.floor(filament.points.length / 2)] ?? start;
    const meaningful =
      nearFocus(start) < 1.55 ||
      nearFocus(end) < 1.55 ||
      nearVoid(mid) < 1.25;
    filament.alpha *= meaningful ? 1.12 : 0.88;
  }

  const membranes: NexusMembrane[] = [];
  const densePool = coreNodes.filter((node) => node.density > 0.5);
  const pool = densePool.length > 16 ? densePool : coreNodes;
  const cyanPool = pool.filter((node) => node.g - node.r > 0.12 && node.g > 0.4);
  const violetPool = pool.filter((node) => node.b - node.g > 0.08 && node.b > 0.45 && node.r > 0.28);
  const warmPool = pool.filter((node) => node.r - node.b > 0.12 && node.r > 0.45);
  const patchCount = 42;
  for (let p = 0; p < patchCount; p += 1) {
    const bucket = p % 3 === 0 ? cyanPool : p % 3 === 1 ? violetPool : warmPool;
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
        alpha: 0.034 + rng() * 0.016,
      });
    }
  }

  const foci: Vec3[] = FOCI.map((focus) => ({ x: focus.cx, y: focus.cy, z: focus.cz }));
  const hubs: NexusHub[] = [
    { x: FOCI[0].cx + 0.1, y: FOCI[0].cy + 0.08, z: FOCI[0].cz, cluster: 0 },
    { x: FOCI[1].cx - 0.08, y: FOCI[1].cy + 0.05, z: FOCI[1].cz, cluster: 1 },
    { x: FOCI[2].cx + 0.06, y: FOCI[2].cy - 0.1, z: FOCI[2].cz, cluster: 2 },
  ];

  return { nodes, filaments, membranes, hubs, foci };
}

export function wakePositions(time: number): { wakes: [Vec3, Vec3, Vec3]; nexus: Vec3; boost: number } {
  const t = time;
  const a = { x: FOCI[0].cx, y: FOCI[0].cy, z: FOCI[0].cz };
  const b = { x: FOCI[1].cx, y: FOCI[1].cy, z: FOCI[1].cz };
  const c = { x: FOCI[2].cx, y: FOCI[2].cy, z: FOCI[2].cz };
  const d = { x: FOCI[3].cx, y: FOCI[3].cy, z: FOCI[3].cz };
  const wakes: [Vec3, Vec3, Vec3] = [
    lerp(a, b, 0.5 + 0.46 * Math.sin(t * 0.24)),
    lerp(c, d, 0.5 + 0.44 * Math.sin(t * 0.2 + 1.15)),
    lerp(b, d, 0.5 + 0.42 * Math.sin(t * 0.17 + 2.35)),
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
