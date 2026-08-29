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
  { cx: 0.04, cy: 0.12, cz: 0.0, rx: 0.44, ry: 0.36, rz: 0.26, weight: 1.22 },
  { cx: 0.36, cy: 0.26, cz: 0.08, rx: 0.26, ry: 0.28, rz: 0.18, weight: 0.92 },
  { cx: -0.26, cy: 0.16, cz: -0.06, rx: 0.32, ry: 0.3, rz: 0.2, weight: 1.08 },
  { cx: 0.02, cy: -0.16, cz: 0.04, rx: 0.3, ry: 0.24, rz: 0.2, weight: 0.78 },
  { cx: 0.24, cy: 0.0, cz: 0.16, rx: 0.22, ry: 0.2, rz: 0.16, weight: 0.62 },
  { cx: -0.06, cy: 0.04, cz: -0.18, rx: 0.2, ry: 0.18, rz: 0.15, weight: 0.56 },
  { cx: -0.12, cy: 0.34, cz: 0.03, rx: 0.16, ry: 0.2, rz: 0.12, weight: 0.58 },
  { cx: 0.2, cy: 0.2, cz: -0.1, rx: 0.18, ry: 0.16, rz: 0.13, weight: 0.48 },
  { cx: 0.42, cy: 0.4, cz: 0.02, rx: 0.14, ry: 0.22, rz: 0.1, weight: 0.46 },
  { cx: -0.22, cy: -0.12, cz: 0.02, rx: 0.28, ry: 0.2, rz: 0.14, weight: 0.92 },
];

type RegionKind = 'vp' | 'cp' | 'vc' | 'nx';

type ActivityRegion = Ellipsoid & { kind: RegionKind };

const FOCI: readonly ActivityRegion[] = [
  { cx: 0.18, cy: 0.18, cz: 0.04, rx: 0.2, ry: 0.16, rz: 0.13, weight: 0.24, kind: 'vp' },
  { cx: -0.16, cy: 0.04, cz: -0.06, rx: 0.18, ry: 0.16, rz: 0.12, weight: 0.22, kind: 'cp' },
  { cx: 0.24, cy: -0.08, cz: 0.07, rx: 0.17, ry: 0.14, rz: 0.11, weight: 0.2, kind: 'vc' },
  { cx: -0.02, cy: 0.12, cz: -0.1, rx: 0.14, ry: 0.12, rz: 0.1, weight: 0.16, kind: 'nx' },
];

const VOIDS: readonly Ellipsoid[] = [
  { cx: 0.12, cy: 0.02, cz: 0.04, rx: 0.12, ry: 0.09, rz: 0.1, weight: -0.52 },
  { cx: 0.28, cy: -0.08, cz: -0.06, rx: 0.1, ry: 0.12, rz: 0.08, weight: -0.42 },
  { cx: -0.1, cy: 0.22, cz: 0.06, rx: 0.08, ry: 0.09, rz: 0.07, weight: -0.36 },
  { cx: 0.16, cy: 0.28, cz: -0.14, rx: 0.07, ry: 0.06, rz: 0.06, weight: -0.3 },
  { cx: 0.34, cy: 0.08, cz: 0.1, rx: 0.07, ry: 0.08, rz: 0.06, weight: -0.28 },
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
  if (p.y < -0.3) {
    density *= Math.max(0, 0.28 + (p.y + 0.52) * 1.55);
  }
  const rx = (p.x - 0.04) / 0.64;
  const ry = (p.y - 0.1) / 0.52;
  const rz = p.z / 0.34;
  let rad = rx * rx * 0.82 + ry * ry * 1.08 + rz * rz;
  rad += Math.max(0, p.x - 0.2) * Math.max(0, -0.1 - p.y) * 4.6;
  if (rad > 1.02) {
    density *= Math.max(0, 1.18 - rad * 0.44);
  }
  return { density, cluster };
}

function hash3(x: number, y: number, z: number): number {
  const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
  return s - Math.floor(s);
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function ribbon(p: Vec3, ax: number, ay: number, az: number, freq: number, phase: number, ry: number, rz: number): number {
  const t = p.x * 1.35 + p.z * 0.55;
  const yPath = ay + 0.18 * Math.sin(t * freq + phase);
  const zPath = az + 0.1 * Math.cos(t * freq * 0.82 + phase);
  const dy = (p.y - yPath) / ry;
  const dz = (p.z - zPath) / rz;
  const dx = (p.x - ax) * 0.22;
  return Math.exp(-(dy * dy + dz * dz + dx * dx));
}

function mixColor(p: Vec3): { r: number; g: number; b: number; ribbon: number } {
  const n = hash3(p.x, p.y, p.z);
  const n2 = hash3(p.z + 1.7, p.x - 0.4, p.y + 2.1);
  const rP =
    ribbon(p, -0.08, 0.16, -0.04, 2.05, 0.3, 0.22, 0.18) +
    ribbon(p, 0.22, 0.08, 0.07, 1.72, 2.5, 0.2, 0.16) * 0.82;
  const rN =
    ribbon(p, 0.14, 0.1, 0.05, 1.88, 1.15, 0.21, 0.17) +
    ribbon(p, -0.12, 0.02, -0.08, 2.28, 3.1, 0.19, 0.15) * 0.85 +
    ribbon(p, 0.06, 0.2, -0.02, 1.6, 4.2, 0.18, 0.14) * 0.55;
  const rC = ribbon(p, 0.04, 0.05, 0.1, 1.55, 0.85, 0.24, 0.2);
  const left = smoothstep(0.3, -0.3, p.x);
  const right = smoothstep(-0.1, 0.44, p.x);
  const high = smoothstep(-0.04, 0.36, p.y);
  const low = smoothstep(0.1, -0.3, p.y);
  let psyche = 0.1 + left * 1.4 + high * 0.9 + left * high * 0.75 + rP * 0.5;
  let persona = 0.16 + right * 1.5 + (1 - left) * 0.28 + rN * 0.45;
  let cortex = 0.06 + (1 - left) * 0.2 + rC * 0.32;
  let deep = 0.03;
  let warm = low * (1.15 + left * 2.6) + Math.max(0, 0.06 - p.y) * Math.max(0, 0.26 - p.x) * 6.4;
  psyche *= 1 - low * 0.82;
  persona *= 1 - low * left * 0.4;
  psyche += (n - 0.5) * 0.1;
  persona += (n2 - 0.5) * 0.08;
  for (const focus of FOCI) {
    const influence = Math.min(1.1, Math.max(0, gauss(p, { ...focus, weight: 1 })));
    if (focus.kind === 'vp') {
      psyche += influence * 0.85;
      persona += influence * 0.22;
    } else if (focus.kind === 'cp') {
      psyche += influence * 0.55;
      warm += influence * 0.95;
    } else if (focus.kind === 'vc') {
      persona += influence * 0.9;
      cortex += influence * 0.28;
    } else {
      persona += influence * 0.38;
      psyche += influence * 0.32;
    }
  }
  psyche = Math.max(0.02, psyche);
  persona = Math.max(0.03, persona);
  cortex = Math.max(0.03, cortex);
  deep = Math.max(0.02, deep);
  warm = Math.max(0, warm);
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
  const sat = 1.58;
  r = Math.min(1.18, Math.max(0, luma + (r - luma) * sat));
  g = Math.min(1.18, Math.max(0, luma + (g - luma) * sat));
  b = Math.min(1.18, Math.max(0, luma + (b - luma) * sat));
  const ribbonStrength = Math.max(rP, rN, rC);
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
    if (rng() < 0.14) {
      node.r = node.r * 0.62 + WARM[0] * 0.38;
      node.g = node.g * 0.68 + WARM[1] * 0.32;
      node.b = node.b * 0.82 + WARM[2] * 0.18;
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
  const sat = 1.35;
  return {
    points: tessellate(a, mid, b, steps),
    alpha,
    r: Math.min(1.15, luma + (tint.r - luma) * sat),
    g: Math.min(1.15, luma + (tint.g - luma) * sat),
    b: Math.min(1.15, luma + (tint.b - luma) * sat),
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
    const maxD = a.density > 0.18 ? 0.14 * 0.14 : 0.095 * 0.095;
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
    const take = a.density > 0.48 ? 5 : a.density > 0.16 ? 4 : 2;
    for (let n = 0; n < Math.min(take, near.length); n += 1) {
      const j = near[n].j;
      const b = core[j];
      const mid: Vec3 = {
        x: (a.x + b.x) * 0.5 + (rng() - 0.5) * 0.022,
        y: (a.y + b.y) * 0.5 + (rng() - 0.5) * 0.018,
        z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.02,
      };
      const alpha = 0.1 + Math.min(a.density, b.density) * 0.07 + rng() * 0.03;
      tryEdge(i, j, mid, 4, alpha, false);
    }
  }

  const bridgeBudget = Math.floor(maxEdges * 0.22);
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
      if (d < 0.016 || d > 0.11) {
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
    tryEdge(i, best, mid, 5, 0.09 + rng() * 0.03, false);
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
      tryEdge(i, next, mid, 3, 0.1 + rng() * 0.03, false);
      i = next;
    }
  }

  return filaments;
}

export function nexusBudget(width: number): NexusBudget {
  if (width < 768) {
    return { nodes: 2800, filaments: 2100 };
  }
  if (width < 1024) {
    return { nodes: 4800, filaments: 3200 };
  }
  return { nodes: 7200, filaments: 4200 };
}

export function buildNexusField(budget: NexusBudget, seed = 0xd4a1): NexusField {
  const rng = mulberry32(seed);
  const coreTarget = Math.floor(budget.nodes * 0.68);
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
      if (t < 0.3) {
        sorted[i].density = 0.05 + (t / 0.3) * 0.11;
      } else if (t < 0.8) {
        sorted[i].density = 0.16 + ((t - 0.3) / 0.5) * 0.32;
      } else {
        sorted[i].density = 0.48 + ((t - 0.8) / 0.2) * 0.5;
      }
    }
  }

  for (let attempt = 0; attempt < maxAttempts && nodes.length < coreTarget; attempt += 1) {
    const p = {
      x: (rng() * 2 - 1) * 0.7 + 0.04,
      y: (rng() * 2 - 1) * 0.62 + 0.1,
      z: (rng() * 2 - 1) * 0.38,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.055) {
      continue;
    }
    const keep = 0.22 + density * 0.78;
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
      size: 1.05 + density * 0.55 + rng() * 0.16 + color.ribbon * 0.12 - edge * 0.12,
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
      x: (rng() * 2 - 1) * 0.58 + 0.04,
      y: (rng() * 2 - 1) * 0.48 + 0.1,
      z: (rng() * 2 - 1) * 0.3,
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
      r: Math.min(1.2, color.r * 1.12),
      g: Math.min(1.2, color.g * 1.04),
      b: Math.min(1.2, color.b * 1.1),
      size: (budget.nodes < 3500 ? 2.8 : 3.4) + rng() * 1.5,
      cluster,
      density: Math.max(0.05, density * 0.55),
      bright: 0,
      mist: 1,
    });
    mistMade += 1;
  }

  const warmExtra = Math.floor(mistTarget * 0.22);
  let warmTries = 0;
  let warmMade = 0;
  while (warmMade < warmExtra && warmTries < warmExtra * 20) {
    warmTries += 1;
    const p = {
      x: -0.22 + (rng() * 2 - 1) * 0.2,
      y: -0.14 + (rng() * 2 - 1) * 0.14,
      z: (rng() * 2 - 1) * 0.12,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.03) {
      continue;
    }
    const color = mixColor(p);
    const t = 0.55 + rng() * 0.3;
    nodes.push({
      x: p.x,
      y: p.y,
      z: p.z,
      r: Math.min(1.2, color.r * (1 - t) + WARM[0] * t),
      g: Math.min(1.2, color.g * (1 - t) + WARM[1] * t),
      b: Math.min(1.2, color.b * (1 - t) + WARM[2] * t),
      size: (budget.nodes < 3500 ? 2.9 : 3.6) + rng() * 1.4,
      cluster,
      density: Math.max(0.06, density * 0.6),
      bright: 0,
      mist: 1,
    });
    warmMade += 1;
  }

  const coreNodes = nodes.filter((node) => !node.mist);
  const filaments = buildPlexus(coreNodes, budget.filaments, rng);

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
      alpha: 0.12 + rng() * 0.04,
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
        alpha: 0.12 + rng() * 0.04,
        r: tint.r,
        g: tint.g,
        b: tint.b,
        current: true,
      });
    }
  }

  for (const filament of filaments) {
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
    filament.alpha *= meaningful ? 1.08 : 0.72;
  }

  const membranes: NexusMembrane[] = [];
  const patchCount = 36;
  for (let p = 0; p < patchCount; p += 1) {
    const start = coreNodes[Math.floor(rng() * coreNodes.length)];
    const picks: NexusNode[] = [start];
    for (const candidate of coreNodes) {
      if (picks.length >= 6) {
        break;
      }
      if (dist2(start, candidate) < 0.07 && rng() > 0.35) {
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
    const tint = mixColor(centroid);
    const silk = {
      r: Math.min(1.15, tint.r * 1.08),
      g: Math.min(1.15, tint.g * 0.98),
      b: Math.min(1.15, tint.b * 1.06),
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
        alpha: 0.052 + rng() * 0.024,
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
    lerp(a, b, 0.5 + 0.42 * Math.sin(t * 0.17)),
    lerp(c, d, 0.5 + 0.4 * Math.sin(t * 0.14 + 1.15)),
    lerp(b, d, 0.5 + 0.38 * Math.sin(t * 0.12 + 2.35)),
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
