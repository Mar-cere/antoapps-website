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
};

export type NexusFilament = {
  points: Vec3[];
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
  hubs: NexusHub[];
};

export type NexusBudget = {
  nodes: number;
  filaments: number;
};

const PSYCHE = [
  [0.545, 0.361, 0.965],
  [0.714, 0.424, 1.0],
];
const PERSONA = [
  [0.133, 0.827, 0.933],
  [0.176, 0.831, 0.749],
];
const CORTEX = [
  [0.231, 0.51, 0.965],
  [0.31, 0.486, 1.0],
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
 * Nube asimétrica suspendida: diagonal, huecos internos, un islote difuso.
 * Semilla fija para que no parezca un blob distinto en cada visita.
 */
const LOBES: readonly Ellipsoid[] = [
  { cx: 0.1, cy: 0.16, cz: 0.02, rx: 0.42, ry: 0.22, rz: 0.28, weight: 0.96 },
  { cx: -0.44, cy: 0.46, cz: 0.22, rx: 0.28, ry: 0.22, rz: 0.24, weight: 0.82 },
  { cx: 0.54, cy: -0.1, cz: 0.32, rx: 0.34, ry: 0.18, rz: 0.22, weight: 0.76 },
  { cx: -0.12, cy: -0.22, cz: -0.46, rx: 0.24, ry: 0.32, rz: 0.2, weight: 0.6 },
  { cx: 0.28, cy: 0.42, cz: -0.26, rx: 0.16, ry: 0.18, rz: 0.14, weight: 0.84 },
];

const VOIDS: readonly Ellipsoid[] = [
  { cx: 0.03, cy: 0.05, cz: 0.1, rx: 0.15, ry: 0.17, rz: 0.13, weight: -0.9 },
  { cx: -0.3, cy: -0.34, cz: 0.04, rx: 0.22, ry: 0.17, rz: 0.17, weight: -0.72 },
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
  return { density, cluster };
}

function hash3(x: number, y: number, z: number): number {
  const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
  return s - Math.floor(s);
}

function mixColor(p: Vec3): { r: number; g: number; b: number } {
  const n = hash3(p.x, p.y, p.z);
  let psyche = 0.42 + 0.38 * p.y - 0.22 * p.x + 0.12 * p.z + (n - 0.5) * 0.18;
  let persona = 0.4 + 0.42 * p.x + 0.08 * p.y + (n - 0.4) * 0.14;
  let cortex = 0.36 - 0.18 * p.y + 0.44 * p.z + (0.5 - n) * 0.16;
  psyche = Math.max(0.05, psyche);
  persona = Math.max(0.05, persona);
  cortex = Math.max(0.05, cortex);
  const sum = psyche + persona + cortex;
  psyche /= sum;
  persona /= sum;
  cortex /= sum;
  const pA = PSYCHE[n > 0.5 ? 1 : 0];
  const nA = PERSONA[n > 0.35 ? 1 : 0];
  const cA = CORTEX[n > 0.62 ? 1 : 0];
  return {
    r: pA[0] * psyche + nA[0] * persona + cA[0] * cortex,
    g: pA[1] * psyche + nA[1] * persona + cA[1] * cortex,
    b: pA[2] * psyche + nA[2] * persona + cA[2] * cortex,
  };
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

export function nexusBudget(width: number): NexusBudget {
  if (width < 768) {
    return { nodes: 700, filaments: 42 };
  }
  if (width < 1024) {
    return { nodes: 1400, filaments: 90 };
  }
  return { nodes: 3000, filaments: 180 };
}

export function buildNexusField(budget: NexusBudget, seed = 0xa170): NexusField {
  const rng = mulberry32(seed);
  const nodes: NexusNode[] = [];
  const maxAttempts = budget.nodes * 48;

  for (let attempt = 0; attempt < maxAttempts && nodes.length < budget.nodes; attempt += 1) {
    const p = {
      x: (rng() * 2 - 1) * 0.98,
      y: (rng() * 2 - 1) * 0.84,
      z: (rng() * 2 - 1) * 0.78,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.09) {
      continue;
    }
    if (rng() > Math.min(1, density * 0.95)) {
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
      size: 2.1 + density * 5.4 + rng() * 1.5,
      cluster,
      density,
    });
  }

  const byCluster: NexusNode[][] = LOBES.map(() => []);
  for (const node of nodes) {
    byCluster[node.cluster].push(node);
  }

  const filaments: NexusFilament[] = [];
  const localCount = Math.floor(budget.filaments * 0.72);

  for (const group of byCluster) {
    const share = Math.max(2, Math.floor((localCount * group.length) / Math.max(1, nodes.length)));
    for (let i = 0; i < group.length && filaments.length < localCount; i += 1) {
      if (i % Math.max(1, Math.floor(group.length / share)) !== 0) {
        continue;
      }
      const a = group[i];
      let best = -1;
      let bestD = 0.2 * 0.2;
      let second = -1;
      let secondD = 0.2 * 0.2;
      for (let j = 0; j < group.length; j += 1) {
        if (j === i) {
          continue;
        }
        const d = dist2(a, group[j]);
        if (d < 0.0016 || d > 0.045) {
          continue;
        }
        if (d < bestD) {
          second = best;
          secondD = bestD;
          best = j;
          bestD = d;
        } else if (d < secondD) {
          second = j;
          secondD = d;
        }
      }
      const targets = [best, second].filter((idx) => idx >= 0);
      for (const idx of targets) {
        if (filaments.length >= localCount) {
          break;
        }
        const b = group[idx];
        const mid: Vec3 = {
          x: (a.x + b.x) * 0.5 + (rng() - 0.5) * 0.06,
          y: (a.y + b.y) * 0.5 + (rng() - 0.5) * 0.05,
          z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.07,
        };
        filaments.push({
          points: tessellate(a, mid, b, 7),
          alpha: 0.2 + rng() * 0.14,
        });
      }
    }
  }

  while (filaments.length < budget.filaments && nodes.length > 8) {
    const a = nodes[Math.floor(rng() * nodes.length)];
    const b = nodes[Math.floor(rng() * nodes.length)];
    const d = dist2(a, b);
    if (d < 0.12 || d > 0.85) {
      continue;
    }
    const computational = rng() < 0.28;
    if (computational) {
      const kink = {
        x: (a.x + b.x) * 0.5 + (rng() - 0.5) * 0.04,
        y: (a.y + b.y) * 0.5 + (rng() - 0.5) * 0.04,
        z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.04,
      };
      filaments.push({
        points: [a, kink, b],
        alpha: 0.1 + rng() * 0.08,
      });
    } else {
      const mid: Vec3 = {
        x: (a.x + b.x) * 0.5 + (rng() - 0.5) * 0.22,
        y: (a.y + b.y) * 0.5 + (rng() - 0.5) * 0.2,
        z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.24,
      };
      filaments.push({
        points: tessellate(a, mid, b, 11),
        alpha: 0.09 + rng() * 0.1,
      });
    }
  }

  const hubs: NexusHub[] = [];
  const ranked = [...nodes].sort((left, right) => right.density - left.density);
  const used = new Set<number>();
  for (const node of ranked) {
    if (hubs.length >= 4) {
      break;
    }
    if (used.has(node.cluster) && hubs.length < LOBES.length) {
      continue;
    }
    const tooClose = hubs.some((hub) => dist2(hub, node) < 0.08);
    if (tooClose) {
      continue;
    }
    used.add(node.cluster);
    hubs.push({ x: node.x, y: node.y, z: node.z, cluster: node.cluster });
  }

  return { nodes, filaments, hubs };
}

export function wakePositions(time: number): { wakes: [Vec3, Vec3, Vec3]; nexus: Vec3; boost: number } {
  const t = time;
  const wakes: [Vec3, Vec3, Vec3] = [
    {
      x: 0.22 * Math.sin(t * 0.23),
      y: 0.16 * Math.cos(t * 0.19),
      z: 0.14 * Math.sin(t * 0.17 + 1.1),
    },
    {
      x: 0.26 * Math.cos(t * 0.15 + 2.1),
      y: 0.18 * Math.sin(t * 0.21 + 0.4),
      z: 0.15 * Math.cos(t * 0.13 + 0.8),
    },
    {
      x: -0.2 * Math.sin(t * 0.18 + 0.7),
      y: -0.12 * Math.cos(t * 0.22 + 1.2),
      z: 0.11 * Math.sin(t * 0.2 + 0.3),
    },
  ];

  const d01 = Math.hypot(wakes[0].x - wakes[1].x, wakes[0].y - wakes[1].y, wakes[0].z - wakes[1].z);
  const d02 = Math.hypot(wakes[0].x - wakes[2].x, wakes[0].y - wakes[2].y, wakes[0].z - wakes[2].z);
  const d12 = Math.hypot(wakes[1].x - wakes[2].x, wakes[1].y - wakes[2].y, wakes[1].z - wakes[2].z);
  const nearest = Math.min(d01, d02, d12);
  const boost = Math.max(0, Math.min(1, (0.48 - nearest) / 0.33));

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
