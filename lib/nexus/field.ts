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
 * Una masa irregular suspendida: plexus continuo con huecos, no islas.
 * Violeta a la izquierda-arriba, cian al centro-derecha, ámbar abajo.
 */
const LOBES: readonly Ellipsoid[] = [
  { cx: -0.16, cy: 0.36, cz: -0.08, rx: 0.28, ry: 0.26, rz: 0.22, weight: 0.95 },
  { cx: 0.18, cy: 0.22, cz: 0.1, rx: 0.3, ry: 0.32, rz: 0.24, weight: 1.08 },
  { cx: 0.04, cy: -0.06, cz: -0.06, rx: 0.26, ry: 0.24, rz: 0.22, weight: 0.88 },
  { cx: -0.08, cy: -0.34, cz: 0.08, rx: 0.26, ry: 0.24, rz: 0.2, weight: 0.78 },
  { cx: 0.28, cy: -0.18, cz: -0.16, rx: 0.18, ry: 0.2, rz: 0.16, weight: 0.5 },
  { cx: 0.1, cy: 0.52, cz: 0.04, rx: 0.16, ry: 0.14, rz: 0.14, weight: 0.62 },
];

const VOIDS: readonly Ellipsoid[] = [
  { cx: 0.02, cy: 0.12, cz: 0.02, rx: 0.08, ry: 0.09, rz: 0.07, weight: -0.52 },
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
  if (p.y < -0.52) {
    density *= 0.5 + (p.y + 0.85) * 0.6;
  }
  return { density, cluster };
}

function hash3(x: number, y: number, z: number): number {
  const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
  return s - Math.floor(s);
}

function mixColor(p: Vec3): { r: number; g: number; b: number } {
  const n = hash3(p.x, p.y, p.z);
  const left = Math.max(0, 0.28 - p.x);
  const right = Math.max(0, p.x + 0.08);
  const up = Math.max(0, p.y + 0.04);
  const down = Math.max(0, -p.y);
  let psyche = 0.12 + left * 1.55 + up * 0.5 + (n - 0.5) * 0.08;
  let persona = 0.1 + right * 1.65 + Math.max(0, 0.2 - down) * 0.35;
  let cortex = 0.08 + Math.abs(p.z) * 0.35 + (0.5 - n) * 0.06;
  let warm = down * 2.1 + Math.max(0, down - 0.18) * 1.4;
  if (down > 0.16) {
    psyche *= 0.22;
    persona *= 0.32;
    cortex *= 0.28;
  }
  if (left > 0.18 && up > 0.08) {
    persona *= 0.4;
    warm *= 0.15;
  }
  psyche = Math.max(0.02, psyche);
  persona = Math.max(0.03, persona);
  cortex = Math.max(0.03, cortex);
  warm = Math.max(0, warm);
  const sum = psyche + persona + cortex + warm;
  psyche /= sum;
  persona /= sum;
  cortex /= sum;
  warm /= sum;
  const pA = PSYCHE[n > 0.66 ? 2 : n > 0.33 ? 1 : 0];
  const nA = PERSONA[n > 0.6 ? 2 : n > 0.28 ? 1 : 0];
  const cA = CORTEX[n > 0.7 ? 2 : n > 0.4 ? 1 : 0];
  const wA = WARM[n > 0.5 ? 1 : 0];
  return {
    r: pA[0] * psyche + nA[0] * persona + cA[0] * cortex + wA[0] * warm,
    g: pA[1] * psyche + nA[1] * persona + cA[1] * cortex + wA[1] * warm,
    b: pA[2] * psyche + nA[2] * persona + cA[2] * cortex + wA[2] * warm,
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

function offsetPoint(p: Vec3, nx: number, ny: number, nz: number, amount: number): Vec3 {
  return { x: p.x + nx * amount, y: p.y + ny * amount, z: p.z + nz * amount };
}

function cellKey(x: number, y: number, z: number, size: number): string {
  return `${Math.floor((x + 2) / size)}_${Math.floor((y + 2) / size)}_${Math.floor((z + 2) / size)}`;
}

function buildPlexus(core: NexusNode[], maxEdges: number, rng: () => number): NexusFilament[] {
  const cell = 0.085;
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
  const maxD = 0.068 * 0.068;

  for (let i = 0; i < core.length && filaments.length < maxEdges; i += 1) {
    const a = core[i];
    const ix = Math.floor((a.x + 2) / cell);
    const iy = Math.floor((a.y + 2) / cell);
    const iz = Math.floor((a.z + 2) / cell);
    const near: { j: number; d: number }[] = [];
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
            if (d < 0.00035 || d > maxD) {
              continue;
            }
            near.push({ j, d });
          }
        }
      }
    }
    near.sort((left, right) => left.d - right.d);
    const take = Math.min(3, near.length);
    for (let n = 0; n < take; n += 1) {
      if (filaments.length >= maxEdges) {
        break;
      }
      const j = near[n].j;
      const lo = Math.min(i, j);
      const hi = Math.max(i, j);
      const edge = `${lo}-${hi}`;
      if (used.has(edge)) {
        continue;
      }
      used.add(edge);
      const b = core[j];
      const curve = rng() < 0.12;
      const tint = {
        r: (a.r + b.r) * 0.5,
        g: (a.g + b.g) * 0.5,
        b: (a.b + b.b) * 0.5,
      };
      if (curve) {
        const mid: Vec3 = {
          x: (a.x + b.x) * 0.5 + (rng() - 0.5) * 0.04,
          y: (a.y + b.y) * 0.5 + (rng() - 0.5) * 0.035,
          z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.045,
        };
        filaments.push({
          points: tessellate(a, mid, b, 5),
          alpha: 0.34 + rng() * 0.14,
          r: tint.r,
          g: tint.g,
          b: tint.b,
          current: false,
        });
      } else {
        filaments.push({
          points: [a, b],
          alpha: 0.3 + rng() * 0.14,
          r: tint.r,
          g: tint.g,
          b: tint.b,
          current: false,
        });
      }
    }
  }

  return filaments;
}

export function nexusBudget(width: number): NexusBudget {
  if (width < 768) {
    return { nodes: 1400, filaments: 1100 };
  }
  if (width < 1024) {
    return { nodes: 2800, filaments: 2000 };
  }
  return { nodes: 4800, filaments: 3200 };
}

export function buildNexusField(budget: NexusBudget, seed = 0xd4a1): NexusField {
  const rng = mulberry32(seed);
  const coreTarget = Math.floor(budget.nodes * 0.82);
  const mistTarget = budget.nodes - coreTarget;
  const nodes: NexusNode[] = [];
  const maxAttempts = coreTarget * 55;

  for (let attempt = 0; attempt < maxAttempts && nodes.length < coreTarget; attempt += 1) {
    const p = {
      x: (rng() * 2 - 1) * 0.52 + 0.04,
      y: (rng() * 2 - 1) * 0.72,
      z: (rng() * 2 - 1) * 0.42,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.05) {
      continue;
    }
    if (p.y < -0.38 && rng() > density * 0.85) {
      continue;
    }
    if (rng() > 0.22 + density * 0.7) {
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
      size: 1.35 + density * 1.8 + rng() * 0.45,
      cluster,
      density,
      bright: 0,
      mist: 0,
    });
  }

  const ranked = [...nodes].sort((left, right) => right.density - left.density);
  const brightCount = Math.max(10, Math.floor(nodes.length * 0.07));
  for (let i = 0; i < brightCount && i < ranked.length; i += 1) {
    ranked[i].bright = 1;
    ranked[i].size = 2.8 + ranked[i].density * 3.2 + rng() * 1.1;
  }
  for (let extra = 0; extra < Math.floor(nodes.length * 0.015); extra += 1) {
    const node = nodes[Math.floor(rng() * nodes.length)];
    if (node.bright) {
      continue;
    }
    node.bright = 1;
    node.size = 2.4 + rng() * 1.4;
  }
  for (const node of nodes) {
    if (node.y < -0.2 && rng() < 0.14) {
      node.bright = 1;
      node.size = Math.max(node.size, 2.6 + rng() * 1.2);
    }
  }

  let mistAttempts = 0;
  let mistMade = 0;
  const mistMax = mistTarget * 12;
  while (mistMade < mistTarget && mistAttempts < mistMax) {
    mistAttempts += 1;
    const p = {
      x: (rng() * 2 - 1) * 0.7 + 0.04,
      y: rng() < 0.28 ? -0.38 - rng() * 0.48 : (rng() * 2 - 1) * 0.82,
      z: (rng() * 2 - 1) * 0.55,
    };
    const { density, cluster } = fieldAt(p);
    if (density < 0.02 && rng() > 0.28) {
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
      size: 3.6 + rng() * 2.8,
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

  const filaments = buildPlexus(coreNodes, budget.filaments, rng);

  const currentSeeds = 5;
  for (let c = 0; c < currentSeeds; c += 1) {
    const from = byCluster[c % byCluster.length];
    const to = byCluster[(c + 2) % byCluster.length];
    if (from.length < 4 || to.length < 4) {
      continue;
    }
    const a = from[Math.floor(rng() * from.length)];
    const b = to[Math.floor(rng() * to.length)];
    if (dist2(a, b) < 0.06 || dist2(a, b) > 0.55) {
      continue;
    }
    const mid: Vec3 = {
      x: (a.x + b.x) * 0.5 + (rng() - 0.5) * 0.12,
      y: (a.y + b.y) * 0.5 + (rng() - 0.5) * 0.1,
      z: (a.z + b.z) * 0.5 + (rng() - 0.5) * 0.12,
    };
    const path = tessellate(a, mid, b, 10);
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const tint = mixColor(mid);
    filaments.push({
      points: path.map((point) => offsetPoint(point, -dy / len, dx / len, 0.25, 0.012)),
      alpha: 0.16 + rng() * 0.06,
      r: tint.r * 0.7 + 0.25,
      g: tint.g * 0.7 + 0.22,
      b: tint.b * 0.7 + 0.28,
      current: true,
    });
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
        alpha: 0.028 + rng() * 0.016,
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
      alpha: 0.02 + rng() * 0.012,
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
