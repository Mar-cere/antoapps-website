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
  [0.486, 0.361, 1.0],
  [0.659, 0.333, 0.969],
  [0.714, 0.424, 1.0],
];
const PERSONA = [
  [0.133, 0.827, 0.933],
  [0.176, 0.831, 0.749],
  [0.404, 0.91, 0.976],
];
const CORTEX = [
  [0.231, 0.51, 0.965],
  [0.31, 0.486, 1.0],
  [0.376, 0.647, 0.98],
];
const WARM = [
  [0.992, 0.729, 0.455],
  [0.965, 0.757, 0.467],
];

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
  { cx: 0.06, cy: 0.1, cz: 0.0, rx: 0.46, ry: 0.3, rz: 0.28, weight: 1.18 },
  { cx: 0.3, cy: 0.26, cz: 0.08, rx: 0.28, ry: 0.22, rz: 0.2, weight: 0.86 },
  { cx: -0.2, cy: 0.14, cz: -0.06, rx: 0.32, ry: 0.26, rz: 0.22, weight: 0.98 },
  { cx: 0.08, cy: -0.12, cz: 0.04, rx: 0.34, ry: 0.22, rz: 0.22, weight: 0.78 },
  { cx: 0.22, cy: 0.02, cz: 0.16, rx: 0.24, ry: 0.2, rz: 0.18, weight: 0.62 },
  { cx: -0.04, cy: 0.06, cz: -0.18, rx: 0.22, ry: 0.18, rz: 0.16, weight: 0.54 },
  { cx: -0.1, cy: 0.3, cz: 0.04, rx: 0.18, ry: 0.15, rz: 0.13, weight: 0.5 },
  { cx: 0.18, cy: 0.18, cz: -0.1, rx: 0.2, ry: 0.16, rz: 0.14, weight: 0.46 },
];

const FOCI: readonly Ellipsoid[] = [
  { cx: 0.1, cy: 0.14, cz: 0.04, rx: 0.16, ry: 0.13, rz: 0.12, weight: 0.42 },
  { cx: -0.06, cy: 0.1, cz: -0.03, rx: 0.15, ry: 0.12, rz: 0.11, weight: 0.38 },
  { cx: 0.18, cy: 0.02, cz: 0.07, rx: 0.14, ry: 0.12, rz: 0.11, weight: 0.36 },
];

const VOIDS: readonly Ellipsoid[] = [
  { cx: 0.16, cy: 0.2, cz: -0.14, rx: 0.08, ry: 0.07, rz: 0.07, weight: -0.34 },
  { cx: -0.14, cy: -0.02, cz: 0.12, rx: 0.07, ry: 0.06, rz: 0.06, weight: -0.26 },
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
  const cx = p.x - 0.06;
  const cy = p.y - 0.08;
  const radial = Math.hypot(cx, cy, p.z * 0.85);
  if (radial < 0.2) {
    density += 0.16 * (1 - radial / 0.2);
  }
  if (p.y < -0.28) {
    density *= Math.max(0, 0.35 + (p.y + 0.48) * 1.4);
  }
  return { density, cluster };
}

function hash3(x: number, y: number, z: number): number {
  const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
  return s - Math.floor(s);
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
  let psyche = 0.28 + rP * 2.0 + n * 0.04;
  let persona = 0.38 + rN * 2.2 + (1 - n) * 0.04;
  let cortex = 0.08 + rC * 1.05 + Math.abs(p.z) * 0.06;
  let warm = n2 > 0.974 ? 0.2 : 0;
  psyche = Math.max(0.03, psyche);
  persona = Math.max(0.03, persona);
  cortex = Math.max(0.04, cortex);
  const sum = psyche + persona + cortex + warm;
  psyche /= sum;
  persona /= sum;
  cortex /= sum;
  warm /= sum;
  const pA = PSYCHE[n > 0.66 ? 2 : n > 0.33 ? 1 : 0];
  const nA = PERSONA[n2 > 0.62 ? 2 : n2 > 0.3 ? 1 : 0];
  const cA = CORTEX[n > 0.7 ? 2 : n > 0.4 ? 1 : 0];
  const wA = WARM[n > 0.5 ? 1 : 0];
  let r = pA[0] * psyche + nA[0] * persona + cA[0] * cortex + wA[0] * warm;
  let g = pA[1] * psyche + nA[1] * persona + cA[1] * cortex + wA[1] * warm;
  let b = pA[2] * psyche + nA[2] * persona + cA[2] * cortex + wA[2] * warm;
  const ribbonStrength = Math.max(rP, rN, rC);
  if (ribbonStrength > 0.35) {
    const mx = Math.max(r, g, b, 0.001);
    const boost = 0.4 + ribbonStrength * 0.45;
    r = r * (1 - boost) + (r / mx) * boost;
    g = g * (1 - boost) + (g / mx) * boost;
    b = b * (1 - boost) + (b / mx) * boost;
  }
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
    x: (a.x + b.x) * 0.5 * (1 - pull) + 0.06 * pull + jitter.x,
    y: (a.y + b.y) * 0.5 * (1 - pull) + 0.08 * pull + jitter.y,
    z: (a.z + b.z) * 0.5 * (1 - pull) + jitter.z,
  };
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
  return {
    points: tessellate(a, mid, b, steps),
    alpha,
    r: tint.r,
    g: tint.g,
    b: tint.b,
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
    const maxD = a.density > 0.18 ? 0.125 * 0.125 : 0.08 * 0.08;
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
    const take = a.density > 0.48 ? 2 : a.density > 0.16 ? 3 : 1;
    for (let n = 0; n < Math.min(take, near.length); n += 1) {
      const j = near[n].j;
      const b = core[j];
      const mid: Vec3 = {
        x: (a.x + b.x) * 0.5 + (rng() - 0.5) * 0.07,
        y: (a.y + b.y) * 0.5 + (rng() - 0.5) * 0.06,
        z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.08,
      };
      const alpha = 0.2 + Math.min(a.density, b.density) * 0.14 + rng() * 0.05;
      tryEdge(i, j, mid, 7, alpha, false);
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
    const mid = towardCenter(a, b, 0.42, {
      x: (rng() - 0.5) * 0.1,
      y: (rng() - 0.5) * 0.08,
      z: (rng() - 0.5) * 0.1,
    });
    tryEdge(i, best, mid, 9, 0.24 + rng() * 0.08, false);
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
        x: (a.x + b.x) * 0.5 + (rng() - 0.5) * 0.04,
        y: (a.y + b.y) * 0.5 + (rng() - 0.5) * 0.04,
        z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.05,
      };
      tryEdge(i, next, mid, 6, 0.18 + rng() * 0.06, false);
      i = next;
    }
  }

  return filaments;
}

export function nexusBudget(width: number): NexusBudget {
  if (width < 768) {
    return { nodes: 1600, filaments: 560 };
  }
  if (width < 1024) {
    return { nodes: 3200, filaments: 860 };
  }
  return { nodes: 5200, filaments: 1180 };
}

export function buildNexusField(budget: NexusBudget, seed = 0xd4a1): NexusField {
  const rng = mulberry32(seed);
  const coreTarget = Math.floor(budget.nodes * 0.9);
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
      x: (rng() * 2 - 1) * 0.66 + 0.08,
      y: (rng() * 2 - 1) * 0.56 + 0.08,
      z: (rng() * 2 - 1) * 0.4,
    };
    const { density, cluster } = fieldAt(p);
    const cx = p.x - 0.06;
    const cy = p.y - 0.08;
    const central = Math.hypot(cx, cy) < 0.22;
    if (density < (central ? 0.035 : 0.05)) {
      continue;
    }
    const keep = central ? 0.34 + density * 0.7 : 0.18 + density * 0.72;
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
      size: 1.45 + density * 1.7 + rng() * 0.35 + color.ribbon * 0.55 - edge * 0.2,
      cluster,
      density,
      bright: color.ribbon > 0.58 && rng() < 0.07 ? 1 : 0,
      mist: 0,
    });
  }

  const centerFill = Math.floor(coreTarget * 0.08);
  let centerMade = 0;
  let centerTries = 0;
  while (centerMade < centerFill && centerTries < centerFill * 40) {
    centerTries += 1;
    const p = {
      x: 0.06 + (rng() * 2 - 1) * 0.2,
      y: 0.08 + (rng() * 2 - 1) * 0.16,
      z: (rng() * 2 - 1) * 0.16,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.03 && rng() > 0.45) {
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
      size: 1.35 + density * 1.4 + color.ribbon * 0.4,
      cluster,
      density: Math.max(density, 0.2),
      bright: color.ribbon > 0.5 && rng() < 0.08 ? 1 : 0,
      mist: 0,
    });
    centerMade += 1;
  }

  remapDensity(nodes);

  const ranked = [...nodes].sort((left, right) => right.density - left.density);
  const brightCount = Math.max(8, Math.floor(nodes.length * 0.04));
  for (let i = 0; i < brightCount && i < ranked.length; i += 1) {
    if (i % 5 === 0) {
      const scattered = nodes[Math.floor(rng() * nodes.length)];
      scattered.bright = 1;
      scattered.size = Math.max(scattered.size, 2.05 + rng() * 0.7);
      continue;
    }
    ranked[i].bright = 1;
    ranked[i].size = 2.05 + ranked[i].density * 1.4 + rng() * 0.55;
  }
  for (let extra = 0; extra < Math.floor(nodes.length * 0.012); extra += 1) {
    const node = nodes[Math.floor(rng() * nodes.length)];
    if (node.bright) {
      continue;
    }
    node.bright = 1;
    node.size = 1.9 + rng() * 0.7;
  }
  for (const node of nodes) {
    if (!node.bright || rng() > 0.035) {
      continue;
    }
    const w = WARM[rng() > 0.5 ? 1 : 0];
    node.r = node.r * 0.58 + w[0] * 0.42;
    node.g = node.g * 0.6 + w[1] * 0.4;
    node.b = node.b * 0.78 + w[2] * 0.22;
  }

  let mistAttempts = 0;
  let mistMade = 0;
  const mistMax = mistTarget * 14;
  while (mistMade < mistTarget && mistAttempts < mistMax) {
    mistAttempts += 1;
    const p = {
      x: (rng() * 2 - 1) * 0.82 + 0.1,
      y: (rng() * 2 - 1) * 0.68 + 0.08,
      z: (rng() * 2 - 1) * 0.52,
    };
    const { density, cluster } = fieldAt(p);
    if (density > 0.18) {
      continue;
    }
    if (density < 0.016 && rng() > 0.28) {
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
      size: 2.2 + rng() * 1.5,
      cluster,
      density: Math.max(0.04, density * 0.35),
      bright: 0,
      mist: 1,
    });
    mistMade += 1;
  }

  const coreNodes = nodes.filter((node) => !node.mist);
  const filaments = buildPlexus(coreNodes, budget.filaments, rng);

  const currentSeeds = 8;
  for (let c = 0; c < currentSeeds; c += 1) {
    const a = coreNodes[Math.floor(rng() * coreNodes.length)];
    const b = coreNodes[Math.floor(rng() * coreNodes.length)];
    const span = dist2(a, b);
    if (span < 0.04 || span > 0.55) {
      continue;
    }
    const mid = towardCenter(a, b, 0.34 + rng() * 0.18, {
      x: (rng() - 0.5) * 0.12,
      y: (rng() - 0.5) * 0.1,
      z: (rng() - 0.5) * 0.12,
    });
    const tint = mixColor(mid);
    filaments.push({
      points: tessellate(a, mid, b, 14),
      alpha: 0.22 + rng() * 0.08,
      r: tint.r,
      g: tint.g,
      b: tint.b,
      current: true,
    });
  }

  const membranes: NexusMembrane[] = [];
  const patchCount = 16;
  for (let p = 0; p < patchCount; p += 1) {
    const start = coreNodes[Math.floor(rng() * coreNodes.length)];
    const picks: NexusNode[] = [start];
    for (const candidate of coreNodes) {
      if (picks.length >= 8) {
        break;
      }
      if (dist2(start, candidate) < 0.085 && rng() > 0.4) {
        picks.push(candidate);
      }
    }
    if (picks.length < 5) {
      continue;
    }
    const centroid = {
      x: picks.reduce((sum, node) => sum + node.x, 0) / picks.length,
      y: picks.reduce((sum, node) => sum + node.y, 0) / picks.length,
      z: picks.reduce((sum, node) => sum + node.z, 0) / picks.length,
    };
    const tint = mixColor(centroid);
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
        r: tint.r,
        g: tint.g,
        b: tint.b,
        alpha: 0.024 + rng() * 0.014,
      });
    }
  }

  for (let s = 0; s < 10; s += 1) {
    const a = coreNodes[Math.floor(rng() * coreNodes.length)];
    let b = a;
    let cNode = a;
    for (let k = 0; k < 24; k += 1) {
      const candidate = coreNodes[Math.floor(rng() * coreNodes.length)];
      const d = dist2(a, candidate);
      if (d > 0.02 && d < 0.08) {
        b = candidate;
        break;
      }
    }
    for (let k = 0; k < 24; k += 1) {
      const candidate = coreNodes[Math.floor(rng() * coreNodes.length)];
      const d = dist2(a, candidate);
      if (candidate !== b && d > 0.02 && d < 0.09) {
        cNode = candidate;
        break;
      }
    }
    if (b === a || cNode === a) {
      continue;
    }
    const mid = {
      x: (a.x + b.x + cNode.x) / 3,
      y: (a.y + b.y + cNode.y) / 3,
      z: (a.z + b.z + cNode.z) / 3,
    };
    const tint = mixColor(mid);
    membranes.push({
      ax: a.x,
      ay: a.y,
      az: a.z,
      bx: b.x,
      by: b.y,
      bz: b.z,
      cx: cNode.x,
      cy: cNode.y,
      cz: cNode.z,
      r: tint.r,
      g: tint.g,
      b: tint.b,
      alpha: 0.026 + rng() * 0.012,
    });
  }

  const foci: Vec3[] = FOCI.map((focus) => ({ x: focus.cx, y: focus.cy, z: focus.cz }));
  const hubs: NexusHub[] = [
    { x: -0.34, y: 0.24, z: 0.08, cluster: 0 },
    { x: 0.38, y: 0.2, z: 0.04, cluster: 1 },
    { x: 0.16, y: -0.2, z: 0.07, cluster: 2 },
  ];

  return { nodes, filaments, membranes, hubs, foci };
}

export function wakePositions(time: number): { wakes: [Vec3, Vec3, Vec3]; nexus: Vec3; boost: number } {
  const t = time;
  const wakes: [Vec3, Vec3, Vec3] = [
    {
      x: 0.08 + 0.22 * Math.sin(t * 0.17),
      y: 0.1 + 0.14 * Math.cos(t * 0.13),
      z: 0.08 * Math.sin(t * 0.19 + 0.8),
    },
    {
      x: 0.02 + 0.2 * Math.cos(t * 0.14 + 1.2),
      y: 0.05 + 0.15 * Math.sin(t * 0.18 + 0.4),
      z: 0.1 * Math.cos(t * 0.15),
    },
    {
      x: 0.14 + 0.18 * Math.sin(t * 0.16 + 2.1),
      y: -0.02 + 0.12 * Math.cos(t * 0.12 + 0.9),
      z: 0.07 * Math.sin(t * 0.21 + 0.5),
    },
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
