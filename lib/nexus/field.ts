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
 * Campo cognitivo vertical, fragmentado y suspendido.
 * Más alto que ancho; el tercio inferior se disuelve; sin eje ni base.
 */
const LOBES: readonly Ellipsoid[] = [
  { cx: 0.34, cy: 0.66, cz: 0.14, rx: 0.24, ry: 0.18, rz: 0.2, weight: 0.9 },
  { cx: -0.4, cy: 0.38, cz: -0.24, rx: 0.2, ry: 0.22, rz: 0.16, weight: 0.62 },
  { cx: 0.06, cy: 0.16, cz: 0.2, rx: 0.22, ry: 0.2, rz: 0.18, weight: 0.98 },
  { cx: 0.48, cy: -0.06, cz: -0.3, rx: 0.2, ry: 0.24, rz: 0.16, weight: 0.7 },
  { cx: -0.26, cy: -0.12, cz: 0.08, rx: 0.18, ry: 0.16, rz: 0.18, weight: 0.52 },
  { cx: 0.18, cy: -0.46, cz: -0.12, rx: 0.2, ry: 0.16, rz: 0.16, weight: 0.36 },
  { cx: -0.08, cy: -0.72, cz: 0.18, rx: 0.22, ry: 0.18, rz: 0.16, weight: 0.2 },
];

const VOIDS: readonly Ellipsoid[] = [
  { cx: 0.1, cy: 0.4, cz: 0.02, rx: 0.12, ry: 0.26, rz: 0.12, weight: -1.05 },
  { cx: -0.08, cy: 0.02, cz: -0.02, rx: 0.16, ry: 0.16, rz: 0.14, weight: -0.92 },
  { cx: 0.22, cy: -0.28, cz: 0.04, rx: 0.16, ry: 0.18, rz: 0.12, weight: -0.88 },
  { cx: 0.04, cy: -0.08, cz: 0.24, rx: 0.12, ry: 0.12, rz: 0.1, weight: -0.72 },
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
  if (p.y < -0.42) {
    density *= 0.42 + (p.y + 0.95) * 0.55;
  }
  return { density, cluster };
}

function hash3(x: number, y: number, z: number): number {
  const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
  return s - Math.floor(s);
}

function mixColor(p: Vec3, warm = false): { r: number; g: number; b: number } {
  const n = hash3(p.x, p.y, p.z);
  const swirl = Math.sin(p.x * 5.2 + p.y * 3.4 + p.z * 4.1);
  let psyche = 0.46 + 0.18 * p.y - 0.12 * p.x + 0.16 * swirl + (n - 0.5) * 0.2;
  let persona = 0.34 + 0.28 * p.x + 0.08 * p.y - 0.14 * swirl + (n - 0.42) * 0.16;
  let cortex = 0.38 - 0.1 * p.y + 0.32 * p.z + (0.48 - n) * 0.18;
  psyche = Math.max(0.12, psyche);
  persona = Math.max(0.1, persona);
  cortex = Math.max(0.1, cortex);
  const sum = psyche + persona + cortex;
  psyche /= sum;
  persona /= sum;
  cortex /= sum;
  const pA = PSYCHE[n > 0.66 ? 2 : n > 0.33 ? 1 : 0];
  const nA = PERSONA[n > 0.6 ? 2 : n > 0.28 ? 1 : 0];
  const cA = CORTEX[n > 0.7 ? 2 : n > 0.4 ? 1 : 0];
  let r = pA[0] * psyche + nA[0] * persona + cA[0] * cortex;
  let g = pA[1] * psyche + nA[1] * persona + cA[1] * cortex;
  let b = pA[2] * psyche + nA[2] * persona + cA[2] * cortex;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const lift = Math.min(1.45, 0.62 / Math.max(0.22, luma));
  r *= lift;
  g *= lift;
  b *= lift;
  if (warm) {
    const w = WARM[n > 0.5 ? 1 : 0];
    r = r * 0.28 + w[0] * 0.72;
    g = g * 0.28 + w[1] * 0.72;
    b = b * 0.28 + w[2] * 0.72;
  }
  return { r, g, b };
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

function offsetPoint(p: Vec3, nx: number, ny: number, nz: number, amount: number): Vec3 {
  return { x: p.x + nx * amount, y: p.y + ny * amount, z: p.z + nz * amount };
}

export function nexusBudget(width: number): NexusBudget {
  if (width < 768) {
    return { nodes: 1100, filaments: 85 };
  }
  if (width < 1024) {
    return { nodes: 2200, filaments: 150 };
  }
  return { nodes: 4200, filaments: 220 };
}

export function buildNexusField(budget: NexusBudget, seed = 0xc0e1): NexusField {
  const rng = mulberry32(seed);
  const coreTarget = Math.floor(budget.nodes * 0.74);
  const mistTarget = budget.nodes - coreTarget;
  const nodes: NexusNode[] = [];
  const maxAttempts = coreTarget * 60;

  for (let attempt = 0; attempt < maxAttempts && nodes.length < coreTarget; attempt += 1) {
    const p = {
      x: (rng() * 2 - 1) * 0.62 + 0.08,
      y: (rng() * 2 - 1) * 0.92,
      z: (rng() * 2 - 1) * 0.52,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.04) {
      continue;
    }
    if (p.y < -0.5 && rng() > density * 0.7) {
      continue;
    }
    if (rng() > 0.16 + density * 0.72) {
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
      size: 1.45 + density * 2.1 + rng() * 0.55,
      cluster,
      density,
      bright: 0,
      mist: 0,
    });
  }

  const ranked = [...nodes].sort((left, right) => right.density - left.density);
  const brightCount = Math.max(8, Math.floor(nodes.length * 0.08));
  const warmCount = Math.max(2, Math.min(6, Math.floor(brightCount * 0.08)));
  for (let i = 0; i < brightCount && i < ranked.length; i += 1) {
    ranked[i].bright = 1;
    ranked[i].size = 3.2 + ranked[i].density * 3.8 + rng() * 1.4;
    if (i < warmCount) {
      const warm = mixColor(ranked[i], true);
      ranked[i].r = warm.r;
      ranked[i].g = warm.g;
      ranked[i].b = warm.b;
      ranked[i].size += 1.4;
    }
  }
  for (let extra = 0; extra < Math.floor(nodes.length * 0.02); extra += 1) {
    const node = nodes[Math.floor(rng() * nodes.length)];
    if (node.bright) {
      continue;
    }
    node.bright = 1;
    node.size = 2.8 + rng() * 1.6;
  }

  let mistAttempts = 0;
  let mistMade = 0;
  const mistMax = mistTarget * 14;
  while (mistMade < mistTarget && mistAttempts < mistMax) {
    mistAttempts += 1;
    const p = {
      x: (rng() * 2 - 1) * 0.82 + 0.08,
      y: rng() < 0.34 ? -0.42 - rng() * 0.58 : (rng() * 2 - 1) * 1.0,
      z: (rng() * 2 - 1) * 0.7,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.018 && rng() > 0.22) {
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
      size: 4.2 + rng() * 3.2,
      cluster,
      density: Math.max(0.04, density * 0.4),
      bright: 0,
      mist: 1,
    });
    mistMade += 1;
  }

  const coreNodes = nodes.filter((node) => !node.mist);
  const byCluster: NexusNode[][] = LOBES.map(() => []);
  for (const node of coreNodes) {
    byCluster[node.cluster].push(node);
  }

  const filaments: NexusFilament[] = [];
  const localCount = Math.floor(budget.filaments * 0.7);

  for (const group of byCluster) {
    const share = Math.max(2, Math.floor((localCount * group.length) / Math.max(1, coreNodes.length)));
    for (let i = 0; i < group.length && filaments.length < localCount; i += 1) {
      if (i % Math.max(1, Math.floor(group.length / share)) !== 0) {
        continue;
      }
      const a = group[i];
      let best = -1;
      let bestD = 0.16 * 0.16;
      let second = -1;
      let secondD = 0.16 * 0.16;
      for (let j = 0; j < group.length; j += 1) {
        if (j === i) {
          continue;
        }
        const d = dist2(a, group[j]);
        if (d < 0.0012 || d > 0.038) {
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
          x: (a.x + b.x) * 0.5 + (rng() - 0.5) * 0.12,
          y: (a.y + b.y) * 0.5 + (rng() - 0.5) * 0.1,
          z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.14,
        };
        const tint = mixColor(mid);
        filaments.push({
          points: tessellate(a, mid, b, 8),
          alpha: 0.13 + rng() * 0.08,
          r: tint.r,
          g: tint.g,
          b: tint.b,
          current: false,
        });
      }
    }
  }

  const longTarget = Math.floor(budget.filaments * 0.18);
  let longTries = 0;
  let longMade = 0;
  while (longMade < longTarget && longTries < 900 && coreNodes.length > 8) {
    longTries += 1;
    const a = coreNodes[Math.floor(rng() * coreNodes.length)];
    const b = coreNodes[Math.floor(rng() * coreNodes.length)];
    const d = dist2(a, b);
    if (d < 0.16 || d > 0.72 || Math.abs(a.y - b.y) > 0.42) {
      continue;
    }
    const mid: Vec3 = {
      x: (a.x + b.x) * 0.5 + (rng() - 0.5) * 0.28,
      y: (a.y + b.y) * 0.5 + (rng() - 0.5) * 0.22,
      z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.26,
    };
    const tint = mixColor(mid);
    filaments.push({
      points: tessellate(a, mid, b, 12),
      alpha: 0.06 + rng() * 0.05,
      r: tint.r,
      g: tint.g,
      b: tint.b,
      current: false,
    });
    longMade += 1;
  }

  const currentSeeds = 6;
  for (let c = 0; c < currentSeeds; c += 1) {
    const from = byCluster[c % byCluster.length];
    const to = byCluster[(c + 2) % byCluster.length];
    if (from.length < 4 || to.length < 4) {
      continue;
    }
    const a = from[Math.floor(rng() * from.length)];
    const b = to[Math.floor(rng() * to.length)];
    if (dist2(a, b) < 0.08 || dist2(a, b) > 0.85) {
      continue;
    }
    const mid: Vec3 = {
      x: (a.x + b.x) * 0.5 + (rng() - 0.5) * 0.24,
      y: (a.y + b.y) * 0.5 + (rng() - 0.5) * 0.16,
      z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.22,
    };
    const path = tessellate(a, mid, b, 12);
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dz = b.z - a.z;
    const len = Math.hypot(dx, dy, dz) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const nz = 0.4;
    const tint = mixColor(mid);
    for (const amount of [-0.018, 0.018]) {
      filaments.push({
        points: path.map((point) => offsetPoint(point, nx, ny, nz, amount)),
        alpha: 0.14 + rng() * 0.05,
        r: tint.r * 0.62 + 0.3,
        g: tint.g * 0.62 + 0.28,
        b: tint.b * 0.62 + 0.34,
        current: true,
      });
    }
  }

  const membranes: NexusMembrane[] = [];
  const patchCount = 12;
  for (let p = 0; p < patchCount; p += 1) {
    const group = byCluster[p % byCluster.length];
    if (group.length < 6) {
      continue;
    }
    const picks: NexusNode[] = [];
    const start = group[Math.floor(rng() * group.length)];
    picks.push(start);
    for (const candidate of group) {
      if (picks.length >= 9) {
        break;
      }
      if (dist2(start, candidate) < 0.09 && rng() > 0.35) {
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
        alpha: 0.055 + rng() * 0.03,
      });
    }
  }

  for (let c = 0; c < byCluster.length; c += 1) {
    const from = byCluster[c];
    const to = byCluster[(c + 1) % byCluster.length];
    if (from.length < 5 || to.length < 5) {
      continue;
    }
    const a = from[Math.floor(rng() * from.length)];
    const b = to[Math.floor(rng() * to.length)];
    const cNode = to[Math.floor(rng() * to.length)];
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
      alpha: 0.04 + rng() * 0.02,
    });
  }

  const hubs: NexusHub[] = [];
  const used = new Set<number>();
  for (const node of ranked) {
    if (hubs.length >= 4) {
      break;
    }
    if (used.has(node.cluster) && hubs.length < 3) {
      continue;
    }
    const tooClose = hubs.some((hub) => dist2(hub, node) < 0.1);
    if (tooClose) {
      continue;
    }
    used.add(node.cluster);
    hubs.push({ x: node.x, y: node.y, z: node.z, cluster: node.cluster });
  }

  return { nodes, filaments, membranes, hubs };
}

export function wakePositions(time: number): { wakes: [Vec3, Vec3, Vec3]; nexus: Vec3; boost: number } {
  const t = time;
  const wakes: [Vec3, Vec3, Vec3] = [
    {
      x: 0.18 + 0.16 * Math.sin(t * 0.21),
      y: 0.22 * Math.cos(t * 0.17),
      z: 0.1 * Math.sin(t * 0.19 + 0.8),
    },
    {
      x: -0.08 + 0.14 * Math.cos(t * 0.14 + 1.6),
      y: 0.08 * Math.sin(t * 0.2 + 0.5),
      z: 0.12 * Math.cos(t * 0.16),
    },
    {
      x: 0.12 * Math.sin(t * 0.18 + 0.4),
      y: -0.18 + 0.14 * Math.cos(t * 0.15 + 1.1),
      z: 0.08 * Math.sin(t * 0.22 + 0.6),
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
