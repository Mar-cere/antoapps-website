'use client';

import { useEffect, useRef } from 'react';
import type { NexusEventCopy } from '@/lib/i18n/copy/pages/nexus';
import { buildNexusField, nexusBudget, wakePositions, type NexusField, type Vec3 } from '@/lib/nexus/field';
import { lookAt, multiply4, perspective, projectPoint } from '@/lib/nexus/math';

type NexusOrganismProps = {
  events: readonly NexusEventCopy[];
  label: string;
};

const NODE_VERT = `
attribute vec3 aCenter;
attribute vec3 aColor;
attribute float aSize;
attribute float aCluster;
attribute float aBright;
attribute float aMist;
attribute float aDensity;
attribute vec2 aCorner;
uniform mat4 uViewProj;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uWake0;
uniform vec3 uWake1;
uniform vec3 uWake2;
uniform vec3 uNexus;
uniform float uBoost;
uniform vec3 uFocus0;
uniform vec3 uFocus1;
uniform vec3 uFocus2;
uniform vec3 uFocus3;
varying vec3 vColor;
varying float vAlpha;
varying vec2 vCorner;
varying float vMist;
varying float vGlow;
float act(vec3 p, vec3 w, float r) {
  vec3 d = p - w;
  return exp(-dot(d, d) / (r * r));
}
void main() {
  vec3 pos = aCenter;
  pos.x += 0.016 * sin(uTime * 0.38 + aCenter.y * 3.6 + aCluster);
  pos.y += 0.014 * cos(uTime * 0.33 + aCenter.x * 2.8 + aCluster * 0.7);
  pos.z += 0.011 * sin(uTime * 0.28 + aCenter.z * 2.4);
  float wake = max(act(pos, uWake0, 0.2), max(act(pos, uWake1, 0.18), act(pos, uWake2, 0.19)));
  float f0 = act(pos, uFocus0, 0.18) * (0.58 + 0.42 * (0.5 + 0.5 * sin(uTime * 0.38)));
  float f1 = act(pos, uFocus1, 0.17) * (0.58 + 0.42 * (0.5 + 0.5 * sin(uTime * 0.31 + 1.9)));
  float f2 = act(pos, uFocus2, 0.16) * (0.58 + 0.42 * (0.5 + 0.5 * sin(uTime * 0.34 + 3.4)));
  float f3 = act(pos, uFocus3, 0.12) * (0.58 + 0.42 * (0.5 + 0.5 * sin(uTime * 0.28 + 0.7)));
  float focus = max(f0, max(f1, max(f2, f3)));
  float sync = min(min(max(f0, f1), max(f2, f3)), max(max(f0, f2), max(f1, f3)));
  float nexus = act(pos, uNexus, 0.1) * uBoost;
  float tissue = smoothstep(0.08, 0.52, aDensity);
  float moderate = smoothstep(0.12, 0.32, aBright);
  float active = smoothstep(0.42, 0.68, aBright);
  float conv = smoothstep(0.85, 1.0, aBright);
  float pulse = 0.84 + 0.16 * sin(uTime * 1.15 + aCluster * 1.4 + aCenter.x * 2.0);
  float quiet = 0.34 + tissue * 0.1 + wake * 0.015;
  float mid = 0.44 + focus * 0.04 + wake * 0.02 + pulse * 0.015;
  float lit = 0.54 + focus * 0.04 + wake * 0.02;
  float hot = 0.82 + nexus * 0.04 + sync * 0.02;
  float activity = mix(quiet, mid, moderate);
  activity = mix(activity, lit, active);
  activity = mix(activity, hot, conv);
  vec4 clip = uViewProj * vec4(pos, 1.0);
  float nearBlur = smoothstep(1.28, 0.5, clip.w);
  float farDim = smoothstep(3.15, 4.7, clip.w);
  float sizePx = aSize * mix(1.1, mix(1.08, 0.92, conv), mix(moderate, 1.0, active));
  sizePx *= mix(1.0, 1.85, aMist);
  sizePx *= 1.0 + nearBlur * 0.22 + wake * 0.05;
  clip.xy += aCorner * vec2(sizePx / uResolution.x, sizePx / uResolution.y) * clip.w;
  gl_Position = clip;
  vCorner = aCorner;
  vMist = aMist;
  vGlow = conv;
  float cyanId = smoothstep(0.02, 0.16, aColor.g - aColor.r) * smoothstep(0.08, 0.32, aColor.b);
  float violetId = smoothstep(0.03, 0.18, aColor.b - aColor.g) * smoothstep(0.08, 0.28, aColor.r);
  float warmId = smoothstep(0.02, 0.14, aColor.r - aColor.b) * smoothstep(0.02, 0.12, aColor.g);
  float flowStrength = max(violetId, max(cyanId, warmId));
  vec3 violetTint = vec3(0.86, 0.24, 1.0);
  vec3 cyanTint = vec3(0.1, 0.94, 0.98);
  vec3 warmTint = vec3(1.0, 0.72, 0.18);
  vec3 materialColor = aColor;
  materialColor = mix(materialColor, violetTint, violetId * 0.26);
  materialColor = mix(materialColor, cyanTint, cyanId * 0.3);
  materialColor = mix(materialColor, warmTint, warmId * 0.32);
  vec3 nexusTint = vec3(0.94, 0.9, 0.8);
  vColor = mix(materialColor, nexusTint, conv * (0.02 + nexus * 0.03 + sync * 0.015));
  vColor *= mix(0.62, 0.94, aMist);
  vAlpha = mix(0.28 + 0.28 * activity, 0.42 + 0.16 * activity, aMist);
  vAlpha *= 1.0 + flowStrength * (1.0 - aMist) * 0.06;
  vAlpha *= (1.0 - farDim * 0.4) * (1.0 - nearBlur * 0.08);
}
`;

const NODE_FRAG = `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
varying vec2 vCorner;
varying float vMist;
varying float vGlow;
void main() {
  float d = length(vCorner);
  if (d > 1.0) discard;
  float core = exp(-d * d * mix(9.2, 2.8, vMist));
  float halo = exp(-d * d * mix(4.8, 1.25, vMist)) * mix(0.05, 0.4, vMist);
  halo += exp(-d * d * 3.4) * vGlow * 0.014;
  float a = (core + halo) * vAlpha;
  if (a < 0.007) discard;
  vec3 c = vColor * a;
  float peak = max(c.r, max(c.g, c.b));
  float cap = mix(0.78, 0.32, vMist);
  if (peak > cap) {
    c *= cap / peak;
  }
  gl_FragColor = vec4(c, a);
}
`;

const LINE_VERT = `
attribute vec3 aA;
attribute vec3 aB;
attribute vec3 aColor;
attribute float aAlpha;
attribute float aEnd;
attribute float aSide;
uniform mat4 uViewProj;
uniform vec2 uResolution;
uniform vec3 uWake0;
uniform vec3 uWake1;
uniform vec3 uWake2;
uniform vec3 uNexus;
uniform float uBoost;
uniform vec3 uFocus0;
uniform vec3 uFocus1;
uniform vec3 uFocus2;
uniform vec3 uFocus3;
uniform float uTime;
varying float vAlpha;
varying vec3 vColor;
varying float vSide;
float act(vec3 p, vec3 w, float r) {
  vec3 d = p - w;
  return exp(-dot(d, d) / (r * r));
}
void main() {
  vec3 world = mix(aA, aB, aEnd);
  float wake = max(act(world, uWake0, 0.22), max(act(world, uWake1, 0.2), act(world, uWake2, 0.2)));
  float f0 = act(world, uFocus0, 0.17) * (0.52 + 0.48 * (0.5 + 0.5 * sin(uTime * 0.38)));
  float f1 = act(world, uFocus1, 0.16) * (0.52 + 0.48 * (0.5 + 0.5 * sin(uTime * 0.31 + 1.9)));
  float f2 = act(world, uFocus2, 0.15) * (0.52 + 0.48 * (0.5 + 0.5 * sin(uTime * 0.34 + 3.4)));
  float f3 = act(world, uFocus3, 0.12) * (0.52 + 0.48 * (0.5 + 0.5 * sin(uTime * 0.28 + 0.7)));
  float focus = max(f0, max(f1, max(f2, f3)));
  float nexus = act(world, uNexus, 0.12) * uBoost;
  vec4 cA = uViewProj * vec4(aA, 1.0);
  vec4 cB = uViewProj * vec4(aB, 1.0);
  vec2 nA = cA.xy / max(0.0001, cA.w);
  vec2 nB = cB.xy / max(0.0001, cB.w);
  vec2 dir = nB - nA;
  float len = length(dir);
  if (len > 0.00001) {
    dir = dir / len;
  } else {
    dir = vec2(1.0, 0.0);
  }
  vec2 perp = vec2(-dir.y, dir.x);
  vec4 pos = mix(cA, cB, aEnd);
  float px = 0.66;
  pos.xy += perp * aSide * (px / uResolution) * 2.0 * pos.w;
  gl_Position = pos;
  vSide = aSide;
  float cyanId = smoothstep(0.02, 0.16, aColor.g - aColor.r) * smoothstep(0.08, 0.32, aColor.b);
  float violetId = smoothstep(0.03, 0.18, aColor.b - aColor.g) * smoothstep(0.08, 0.28, aColor.r);
  float warmId = smoothstep(0.02, 0.14, aColor.r - aColor.b) * smoothstep(0.02, 0.12, aColor.g);
  float flowStrength = max(violetId, max(cyanId, warmId));
  vAlpha = aAlpha * (0.19 + flowStrength * 0.14 + focus * 0.05 + wake * 0.02 + nexus * 0.02);
  vec3 violetTint = vec3(0.86, 0.24, 1.0);
  vec3 cyanTint = vec3(0.1, 0.94, 0.98);
  vec3 warmTint = vec3(1.0, 0.72, 0.18);
  vec3 materialColor = aColor;
  materialColor = mix(materialColor, violetTint, violetId * 0.2);
  materialColor = mix(materialColor, cyanTint, cyanId * 0.24);
  materialColor = mix(materialColor, warmTint, warmId * 0.26);
  vColor = mix(materialColor, vec3(0.94, 0.88, 0.76), nexus * 0.02);
  vColor *= 0.7;
}
`;

const LINE_FRAG = `
precision mediump float;
varying float vAlpha;
varying vec3 vColor;
varying float vSide;
void main() {
  float fall = exp(-vSide * vSide * 4.8);
  float a = vAlpha * fall;
  vec3 c = vColor * a;
  float peak = max(c.r, max(c.g, c.b));
  if (peak > 0.32) {
    c *= 0.32 / peak;
  }
  gl_FragColor = vec4(c, a);
}
`;

const MEMB_VERT = `
attribute vec3 aPosition;
attribute vec3 aColor;
attribute float aAlpha;
attribute vec3 aBary;
uniform mat4 uViewProj;
uniform float uTime;
varying vec3 vColor;
varying float vAlpha;
varying vec3 vBary;
void main() {
  vec3 pos = aPosition;
  pos.x += 0.01 * sin(uTime * 0.24 + aPosition.y * 2.0);
  pos.y += 0.008 * cos(uTime * 0.21 + aPosition.x * 1.7);
  gl_Position = uViewProj * vec4(pos, 1.0);
  float cyanId = smoothstep(0.02, 0.16, aColor.g - aColor.r) * smoothstep(0.08, 0.32, aColor.b);
  float violetId = smoothstep(0.03, 0.18, aColor.b - aColor.g) * smoothstep(0.08, 0.28, aColor.r);
  float warmId = smoothstep(0.02, 0.14, aColor.r - aColor.b) * smoothstep(0.02, 0.12, aColor.g);
  vec3 violetTint = vec3(0.86, 0.24, 1.0);
  vec3 cyanTint = vec3(0.1, 0.94, 0.98);
  vec3 warmTint = vec3(1.0, 0.72, 0.18);
  vec3 materialColor = aColor;
  materialColor = mix(materialColor, violetTint, violetId * 0.62);
  materialColor = mix(materialColor, cyanTint, cyanId * 0.66);
  vColor = mix(materialColor, warmTint, warmId * 0.7);
  float flowStrength = max(violetId, max(cyanId, warmId));
  vAlpha = aAlpha * (0.58 + flowStrength * 0.28) * (0.78 + 0.22 * sin(uTime * 0.48 + aPosition.z * 3.0));
  vBary = aBary;
}
`;

const MEMB_FRAG = `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
varying vec3 vBary;
void main() {
  float edge = min(min(vBary.x, vBary.y), vBary.z);
  float veil = smoothstep(0.0, 0.46, edge);
  float fold = exp(-abs(edge - 0.14) * 8.0) * 0.1;
  float a = (veil * 0.72 + fold) * vAlpha * 0.78;
  if (a < 0.003) discard;
  gl_FragColor = vec4(vColor * a, a);
}
`;

const SPARK_VERT = `
attribute vec3 aPosition;
uniform mat4 uViewProj;
void main() {
  vec4 clip = uViewProj * vec4(aPosition, 1.0);
  gl_Position = clip;
  gl_PointSize = max(1.1, 2.1 * (1.6 / max(0.55, clip.w)));
}
`;

const SPARK_FRAG = `
precision mediump float;
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float a = exp(-dot(p, p) * 6.4) * 0.1;
  gl_FragColor = vec4(vec3(0.55, 0.74, 0.88) * a, a);
}
`;

const QUAD_CORNERS = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function program(gl: WebGLRenderingContext, vert: string, frag: string): WebGLProgram | null {
  const vs = compile(gl, gl.VERTEX_SHADER, vert);
  const fs = compile(gl, gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) {
    return null;
  }
  const prog = gl.createProgram();
  if (!prog) {
    return null;
  }
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

function along(points: Vec3[], t: number): Vec3 {
  if (points.length === 1) {
    return points[0];
  }
  const scaled = t * (points.length - 1);
  const i = Math.min(points.length - 2, Math.floor(scaled));
  const f = scaled - i;
  const a = points[i];
  const b = points[i + 1];
  return {
    x: a.x + (b.x - a.x) * f,
    y: a.y + (b.y - a.y) * f,
    z: a.z + (b.z - a.z) * f,
  };
}

function disableAttribs(gl: WebGLRenderingContext) {
  for (let i = 0; i < 8; i += 1) {
    gl.disableVertexAttribArray(i);
  }
}

function EventMark({ id }: { id: NexusEventCopy['id'] }) {
  if (id === 'memory') {
    return (
      <svg className="nexus-event__icon" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="2.1" fill="currentColor" />
        <path d="M8 3.2v1.6M8 11.2v1.6M3.2 8h1.6M11.2 8h1.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'pattern') {
    return (
      <svg className="nexus-event__icon" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M3 11.5l3.2-7 3.1 4.4L13 4.8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === 'knowledge') {
    return (
      <svg className="nexus-event__icon" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="5" cy="8" r="1.5" fill="currentColor" />
        <circle cx="11" cy="6.2" r="1.5" fill="currentColor" />
        <path d="M6.4 7.6l3.2-1.1" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg className="nexus-event__icon" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 11.5L8 4.5l4 7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.2 9.4h3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export default function NexusOrganism({ events, label }: NexusOrganismProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eventRefs = useRef<Array<HTMLDivElement | null>>([]);
  const fieldRef = useRef<NexusField | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) {
      return;
    }

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      powerPreference: 'high-performance',
    });
    if (!gl) {
      return;
    }

    const nodeProg = program(gl, NODE_VERT, NODE_FRAG);
    const lineProg = program(gl, LINE_VERT, LINE_FRAG);
    const membProg = program(gl, MEMB_VERT, MEMB_FRAG);
    const sparkProg = program(gl, SPARK_VERT, SPARK_FRAG);
    if (!nodeProg || !lineProg || !membProg || !sparkProg) {
      return;
    }
    wrap.classList.add('is-live');

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = reducedQuery.matches;
    const onReduced = () => {
      reduced = reducedQuery.matches;
    };
    reducedQuery.addEventListener('change', onReduced);

    let inView = true;
    let pageVisible = true;
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    const onVisibility = () => {
      pageVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibility);

    const nodeBuffer = gl.createBuffer();
    const lineBuffer = gl.createBuffer();
    const membBuffer = gl.createBuffer();
    const sparkBuffer = gl.createBuffer();
    let nodeCount = 0;
    let mistCount = 0;
    let lineCount = 0;
    let membCount = 0;
    const sparkCount = 4;
    const sparkData = new Float32Array(sparkCount * 3);
    const sparkMeta: { filament: number; speed: number; offset: number }[] = [];

    const uploadField = (field: NexusField) => {
      fieldRef.current = field;
      if (field.foci[0] && field.foci[1] && field.foci[2] && field.foci[3]) {
        foci = [field.foci[0], field.foci[1], field.foci[2], field.foci[3]];
      }
      const ordered = [...field.nodes].sort((a, b) => b.mist - a.mist || a.bright - b.bright);
      mistCount = ordered.filter((node) => node.mist).length * 6;
      const nodeStride = 13;
      const data = new Float32Array(ordered.length * 6 * nodeStride);
      let o = 0;
      for (const node of ordered) {
        for (let c = 0; c < 6; c += 1) {
          data[o++] = node.x;
          data[o++] = node.y;
          data[o++] = node.z;
          data[o++] = node.r;
          data[o++] = node.g;
          data[o++] = node.b;
          data[o++] = node.size;
          data[o++] = node.cluster;
          data[o++] = node.bright;
          data[o++] = node.mist;
          data[o++] = node.density;
          data[o++] = QUAD_CORNERS[c * 2];
          data[o++] = QUAD_CORNERS[c * 2 + 1];
        }
      }
      nodeCount = ordered.length * 6;
      gl.bindBuffer(gl.ARRAY_BUFFER, nodeBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

      let lineVerts = 0;
      for (const filament of field.filaments) {
        lineVerts += Math.max(0, filament.points.length - 1) * 6;
      }
      const lineStride = 12;
      const lines = new Float32Array(lineVerts * lineStride);
      let li = 0;
      const pushLineVert = (a: Vec3, b: Vec3, end: number, side: number, filament: { r: number; g: number; b: number; alpha: number }) => {
        lines[li++] = a.x;
        lines[li++] = a.y;
        lines[li++] = a.z;
        lines[li++] = b.x;
        lines[li++] = b.y;
        lines[li++] = b.z;
        lines[li++] = filament.r;
        lines[li++] = filament.g;
        lines[li++] = filament.b;
        lines[li++] = filament.alpha;
        lines[li++] = end;
        lines[li++] = side;
      };
      for (const filament of field.filaments) {
        for (let i = 0; i < filament.points.length - 1; i += 1) {
          const a = filament.points[i];
          const b = filament.points[i + 1];
          pushLineVert(a, b, 0, -1, filament);
          pushLineVert(a, b, 0, 1, filament);
          pushLineVert(a, b, 1, 1, filament);
          pushLineVert(a, b, 0, -1, filament);
          pushLineVert(a, b, 1, 1, filament);
          pushLineVert(a, b, 1, -1, filament);
        }
      }
      lineCount = lineVerts;
      gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, lines, gl.STATIC_DRAW);

      const memb = new Float32Array(field.membranes.length * 3 * 10);
      let mi = 0;
      const bary = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ];
      for (const patch of field.membranes) {
        const verts = [
          [patch.ax, patch.ay, patch.az],
          [patch.bx, patch.by, patch.bz],
          [patch.cx, patch.cy, patch.cz],
        ];
        for (let v = 0; v < 3; v += 1) {
          memb[mi++] = verts[v][0];
          memb[mi++] = verts[v][1];
          memb[mi++] = verts[v][2];
          memb[mi++] = patch.r;
          memb[mi++] = patch.g;
          memb[mi++] = patch.b;
          memb[mi++] = patch.alpha;
          memb[mi++] = bary[v][0];
          memb[mi++] = bary[v][1];
          memb[mi++] = bary[v][2];
        }
      }
      membCount = field.membranes.length * 3;
      gl.bindBuffer(gl.ARRAY_BUFFER, membBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, memb, gl.STATIC_DRAW);

      const currents = field.filaments
        .map((filament, index) => (filament.current ? index : -1))
        .filter((index) => index >= 0);
      const pool = currents.length ? currents : field.filaments.map((_, index) => index);
      sparkMeta.length = 0;
      for (let i = 0; i < sparkCount; i += 1) {
        sparkMeta.push({
          filament: pool[i % Math.max(1, pool.length)],
          speed: 0.11 + (i % 5) * 0.04,
          offset: i * 0.173,
        });
      }
    };

    const bindNodes = () => {
      gl.useProgram(nodeProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, nodeBuffer);
      const stride = 52;
      const locC = gl.getAttribLocation(nodeProg, 'aCenter');
      const locCol = gl.getAttribLocation(nodeProg, 'aColor');
      const locS = gl.getAttribLocation(nodeProg, 'aSize');
      const locK = gl.getAttribLocation(nodeProg, 'aCluster');
      const locB = gl.getAttribLocation(nodeProg, 'aBright');
      const locM = gl.getAttribLocation(nodeProg, 'aMist');
      const locD = gl.getAttribLocation(nodeProg, 'aDensity');
      const locQ = gl.getAttribLocation(nodeProg, 'aCorner');
      gl.enableVertexAttribArray(locC);
      gl.vertexAttribPointer(locC, 3, gl.FLOAT, false, stride, 0);
      gl.enableVertexAttribArray(locCol);
      gl.vertexAttribPointer(locCol, 3, gl.FLOAT, false, stride, 12);
      gl.enableVertexAttribArray(locS);
      gl.vertexAttribPointer(locS, 1, gl.FLOAT, false, stride, 24);
      gl.enableVertexAttribArray(locK);
      gl.vertexAttribPointer(locK, 1, gl.FLOAT, false, stride, 28);
      gl.enableVertexAttribArray(locB);
      gl.vertexAttribPointer(locB, 1, gl.FLOAT, false, stride, 32);
      gl.enableVertexAttribArray(locM);
      gl.vertexAttribPointer(locM, 1, gl.FLOAT, false, stride, 36);
      if (locD >= 0) {
        gl.enableVertexAttribArray(locD);
        gl.vertexAttribPointer(locD, 1, gl.FLOAT, false, stride, 40);
      }
      gl.enableVertexAttribArray(locQ);
      gl.vertexAttribPointer(locQ, 2, gl.FLOAT, false, stride, 44);
    };

    const bindLines = () => {
      gl.useProgram(lineProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
      const stride = 48;
      const locA = gl.getAttribLocation(lineProg, 'aA');
      const locB = gl.getAttribLocation(lineProg, 'aB');
      const locC = gl.getAttribLocation(lineProg, 'aColor');
      const locAl = gl.getAttribLocation(lineProg, 'aAlpha');
      const locE = gl.getAttribLocation(lineProg, 'aEnd');
      const locS = gl.getAttribLocation(lineProg, 'aSide');
      gl.enableVertexAttribArray(locA);
      gl.vertexAttribPointer(locA, 3, gl.FLOAT, false, stride, 0);
      gl.enableVertexAttribArray(locB);
      gl.vertexAttribPointer(locB, 3, gl.FLOAT, false, stride, 12);
      gl.enableVertexAttribArray(locC);
      gl.vertexAttribPointer(locC, 3, gl.FLOAT, false, stride, 24);
      gl.enableVertexAttribArray(locAl);
      gl.vertexAttribPointer(locAl, 1, gl.FLOAT, false, stride, 36);
      gl.enableVertexAttribArray(locE);
      gl.vertexAttribPointer(locE, 1, gl.FLOAT, false, stride, 40);
      gl.enableVertexAttribArray(locS);
      gl.vertexAttribPointer(locS, 1, gl.FLOAT, false, stride, 44);
    };

    const bindMemb = () => {
      gl.useProgram(membProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, membBuffer);
      const locP = gl.getAttribLocation(membProg, 'aPosition');
      const locC = gl.getAttribLocation(membProg, 'aColor');
      const locA = gl.getAttribLocation(membProg, 'aAlpha');
      const locB = gl.getAttribLocation(membProg, 'aBary');
      gl.enableVertexAttribArray(locP);
      gl.vertexAttribPointer(locP, 3, gl.FLOAT, false, 40, 0);
      gl.enableVertexAttribArray(locC);
      gl.vertexAttribPointer(locC, 3, gl.FLOAT, false, 40, 12);
      gl.enableVertexAttribArray(locA);
      gl.vertexAttribPointer(locA, 1, gl.FLOAT, false, 40, 24);
      gl.enableVertexAttribArray(locB);
      gl.vertexAttribPointer(locB, 3, gl.FLOAT, false, 40, 28);
    };

    let width = 0;
    let height = 0;
    let viewProj: Float32Array = new Float32Array(16);
    let lastBudget = 0;
    let foci: [Vec3, Vec3, Vec3, Vec3] = [
      { x: 0.2, y: 0.2, z: 0.05 },
      { x: -0.18, y: 0.05, z: -0.07 },
      { x: 0.26, y: -0.1, z: 0.08 },
      { x: -0.04, y: 0.14, z: -0.12 },
    ];

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      const proj = perspective((40 * Math.PI) / 180, width / height, 0.12, 10);
      const portrait = width / height < 0.9;
      const dist = portrait ? 0.86 : 0.78;
      const view = portrait
        ? lookAt(-0.05, 0.1, dist, 0.03, 0.12, 0)
        : lookAt(-0.04, 0.1, dist, -0.1, 0.12, 0);
      viewProj = multiply4(proj, view);
      const budget = nexusBudget(window.innerWidth);
      if (budget.nodes + budget.filaments !== lastBudget) {
        lastBudget = budget.nodes + budget.filaments;
        uploadField(buildNexusField(budget));
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const uNode = {
      view: gl.getUniformLocation(nodeProg, 'uViewProj'),
      res: gl.getUniformLocation(nodeProg, 'uResolution'),
      time: gl.getUniformLocation(nodeProg, 'uTime'),
      w0: gl.getUniformLocation(nodeProg, 'uWake0'),
      w1: gl.getUniformLocation(nodeProg, 'uWake1'),
      w2: gl.getUniformLocation(nodeProg, 'uWake2'),
      nexus: gl.getUniformLocation(nodeProg, 'uNexus'),
      boost: gl.getUniformLocation(nodeProg, 'uBoost'),
      f0: gl.getUniformLocation(nodeProg, 'uFocus0'),
      f1: gl.getUniformLocation(nodeProg, 'uFocus1'),
      f2: gl.getUniformLocation(nodeProg, 'uFocus2'),
      f3: gl.getUniformLocation(nodeProg, 'uFocus3'),
    };
    const uLine = {
      view: gl.getUniformLocation(lineProg, 'uViewProj'),
      res: gl.getUniformLocation(lineProg, 'uResolution'),
      w0: gl.getUniformLocation(lineProg, 'uWake0'),
      w1: gl.getUniformLocation(lineProg, 'uWake1'),
      w2: gl.getUniformLocation(lineProg, 'uWake2'),
      nexus: gl.getUniformLocation(lineProg, 'uNexus'),
      boost: gl.getUniformLocation(lineProg, 'uBoost'),
      f0: gl.getUniformLocation(lineProg, 'uFocus0'),
      f1: gl.getUniformLocation(lineProg, 'uFocus1'),
      f2: gl.getUniformLocation(lineProg, 'uFocus2'),
      f3: gl.getUniformLocation(lineProg, 'uFocus3'),
      time: gl.getUniformLocation(lineProg, 'uTime'),
    };
    const uMemb = {
      view: gl.getUniformLocation(membProg, 'uViewProj'),
      time: gl.getUniformLocation(membProg, 'uTime'),
    };
    const uSpark = {
      view: gl.getUniformLocation(sparkProg, 'uViewProj'),
    };

    let frame = 0;
    let lastCycle = 0;
    let eventCursor = 0;

    const placeEvents = (time: number, wakesNexus: Vec3, boost: number) => {
      const field = fieldRef.current;
      if (!field) {
        return;
      }
      const count = width < 768 ? 1 : Math.min(3, events.length);
      if (time - lastCycle > 4200) {
        lastCycle = time;
        eventCursor = (eventCursor + 1) % Math.max(1, events.length);
      }
      const shown = new Set<number>();
      for (let k = 0; k < count; k += 1) {
        shown.add((eventCursor + k) % events.length);
      }
      for (let i = 0; i < events.length; i += 1) {
        const el = eventRefs.current[i];
        if (!el) {
          continue;
        }
        const hub = field.hubs[(i + (boost > 0.45 ? 1 : 0)) % field.hubs.length] ?? field.hubs[0];
        if (!hub) {
          el.classList.remove('is-on');
          continue;
        }
        const jitter: Vec3 = {
          x: hub.x + wakesNexus.x * 0.08,
          y: hub.y + wakesNexus.y * 0.08,
          z: hub.z,
        };
        const p = projectPoint(jitter.x, jitter.y, jitter.z, viewProj, width, height);
        el.style.left = `${p.x}px`;
        el.style.top = `${p.y}px`;
        el.classList.toggle('is-on', shown.has(i) && p.visible);
      }
    };

    const draw = (now: number) => {
      frame = window.requestAnimationFrame(draw);
      if (!inView || !pageVisible) {
        return;
      }
      const time = reduced ? 4.35 : now * 0.00125;
      const { wakes, nexus, boost } = wakePositions(time);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      disableAttribs(gl);
      bindNodes();
      gl.uniformMatrix4fv(uNode.view, false, viewProj);
      gl.uniform2f(uNode.res, width, height);
      gl.uniform1f(uNode.time, time);
      gl.uniform3f(uNode.w0, wakes[0].x, wakes[0].y, wakes[0].z);
      gl.uniform3f(uNode.w1, wakes[1].x, wakes[1].y, wakes[1].z);
      gl.uniform3f(uNode.w2, wakes[2].x, wakes[2].y, wakes[2].z);
      gl.uniform3f(uNode.nexus, nexus.x, nexus.y, nexus.z);
      gl.uniform1f(uNode.boost, boost);
      gl.uniform3f(uNode.f0, foci[0].x, foci[0].y, foci[0].z);
      gl.uniform3f(uNode.f1, foci[1].x, foci[1].y, foci[1].z);
      gl.uniform3f(uNode.f2, foci[2].x, foci[2].y, foci[2].z);
      gl.uniform3f(uNode.f3, foci[3].x, foci[3].y, foci[3].z);
      if (mistCount) {
        gl.drawArrays(gl.TRIANGLES, 0, mistCount);
      }

      disableAttribs(gl);
      bindMemb();
      gl.uniformMatrix4fv(uMemb.view, false, viewProj);
      gl.uniform1f(uMemb.time, time);
      if (membCount) {
        gl.drawArrays(gl.TRIANGLES, 0, membCount);
      }

      disableAttribs(gl);
      gl.blendFunc(gl.ONE, gl.ONE);
      bindLines();
      gl.uniformMatrix4fv(uLine.view, false, viewProj);
      gl.uniform2f(uLine.res, width, height);
      gl.uniform3f(uLine.w0, wakes[0].x, wakes[0].y, wakes[0].z);
      gl.uniform3f(uLine.w1, wakes[1].x, wakes[1].y, wakes[1].z);
      gl.uniform3f(uLine.w2, wakes[2].x, wakes[2].y, wakes[2].z);
      gl.uniform3f(uLine.nexus, nexus.x, nexus.y, nexus.z);
      gl.uniform1f(uLine.boost, boost);
      gl.uniform3f(uLine.f0, foci[0].x, foci[0].y, foci[0].z);
      gl.uniform3f(uLine.f1, foci[1].x, foci[1].y, foci[1].z);
      gl.uniform3f(uLine.f2, foci[2].x, foci[2].y, foci[2].z);
      gl.uniform3f(uLine.f3, foci[3].x, foci[3].y, foci[3].z);
      gl.uniform1f(uLine.time, time);
      if (lineCount) {
        gl.drawArrays(gl.TRIANGLES, 0, lineCount);
      }

      disableAttribs(gl);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      bindNodes();
      gl.uniformMatrix4fv(uNode.view, false, viewProj);
      gl.uniform2f(uNode.res, width, height);
      gl.uniform1f(uNode.time, time);
      gl.uniform3f(uNode.w0, wakes[0].x, wakes[0].y, wakes[0].z);
      gl.uniform3f(uNode.w1, wakes[1].x, wakes[1].y, wakes[1].z);
      gl.uniform3f(uNode.w2, wakes[2].x, wakes[2].y, wakes[2].z);
      gl.uniform3f(uNode.nexus, nexus.x, nexus.y, nexus.z);
      gl.uniform1f(uNode.boost, boost);
      gl.uniform3f(uNode.f0, foci[0].x, foci[0].y, foci[0].z);
      gl.uniform3f(uNode.f1, foci[1].x, foci[1].y, foci[1].z);
      gl.uniform3f(uNode.f2, foci[2].x, foci[2].y, foci[2].z);
      gl.uniform3f(uNode.f3, foci[3].x, foci[3].y, foci[3].z);
      const coreCount = Math.max(0, nodeCount - mistCount);
      if (coreCount) {
        gl.drawArrays(gl.TRIANGLES, mistCount, coreCount);
      }

      const field = fieldRef.current;
      if (field && sparkBuffer && !reduced) {
        for (let i = 0; i < sparkCount; i += 1) {
          const meta = sparkMeta[i];
          const filament = field.filaments[meta.filament];
          if (!filament) {
            continue;
          }
          const t = (meta.offset + time * meta.speed) % 1;
          const p = along(filament.points, t);
          sparkData[i * 3] = p.x;
          sparkData[i * 3 + 1] = p.y;
          sparkData[i * 3 + 2] = p.z;
        }
        disableAttribs(gl);
        gl.useProgram(sparkProg);
        gl.bindBuffer(gl.ARRAY_BUFFER, sparkBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, sparkData, gl.DYNAMIC_DRAW);
        const loc = gl.getAttribLocation(sparkProg, 'aPosition');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(uSpark.view, false, viewProj);
        gl.drawArrays(gl.POINTS, 0, sparkCount);
      }

      placeEvents(now, nexus, boost);
    };

    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      reducedQuery.removeEventListener('change', onReduced);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteBuffer(nodeBuffer);
      gl.deleteBuffer(lineBuffer);
      gl.deleteBuffer(membBuffer);
      gl.deleteBuffer(sparkBuffer);
      gl.deleteProgram(nodeProg);
      gl.deleteProgram(lineProg);
      gl.deleteProgram(membProg);
      gl.deleteProgram(sparkProg);
    };
  }, [events]);

  return (
    <div className="nexus-organism" ref={wrapRef}>
      <div className="nexus-organism__fallback" aria-hidden="true" />
      <canvas ref={canvasRef} className="nexus-organism__canvas" aria-hidden="true" />
      <span className="visually-hidden">{label}</span>
      {events.map((event, index) => (
        <div
          key={event.id}
          ref={(el) => {
            eventRefs.current[index] = el;
          }}
          className="nexus-event"
        >
          <EventMark id={event.id} />
          <span>
            <span className="nexus-event__title">{event.title}</span>
            <span className="nexus-event__sub">{event.subtitle}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
