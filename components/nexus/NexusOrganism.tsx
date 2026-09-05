'use client';

import { useEffect, useRef } from 'react';
import type { NexusActiveBeat, NexusEventCopy } from '@/lib/i18n/copy/pages/nexus';
import NexusEventMark from '@/components/nexus/NexusEventMark';
import {
  buildNexusField,
  nexusBudget,
  nexusFocusForBeat,
  NEXUS_BEAT_LOOK,
  NEXUS_CONSTELLATION_PLATE,
  NEXUS_CONSTELLATION_PLATE_PNG,
  NEXUS_FIELD_REV,
  wakePositions,
  type NexusBeatLookId,
  type NexusField,
  type Vec3,
} from '@/lib/nexus/field';
import { lookAt, multiply4, perspective } from '@/lib/nexus/math';

type NexusOrganismProps = {
  events: readonly NexusEventCopy[];
  label: string;
  activeBeat?: NexusActiveBeat;
  released?: boolean;
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
uniform vec4 uFocusGain;
uniform vec3 uTint;
uniform float uTintAmt;
uniform float uDim;
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
  pos.x += 0.014 * sin(uTime * 0.38 + aCenter.y * 3.6 + aCluster);
  pos.y += 0.012 * cos(uTime * 0.33 + aCenter.x * 2.8 + aCluster * 0.7);
  pos.z += 0.01 * sin(uTime * 0.28 + aCenter.z * 2.4);
  float wake = max(act(pos, uWake0, 0.22), max(act(pos, uWake1, 0.2), act(pos, uWake2, 0.2)));
  float thought0 = pow(max(0.0, sin(uTime * 1.22)), 2.6);
  float thought1 = pow(max(0.0, sin(uTime * 1.22 + 1.5708)), 2.6);
  float thought2 = pow(max(0.0, sin(uTime * 1.22 + 3.1416)), 2.6);
  float thought3 = pow(max(0.0, sin(uTime * 1.22 + 4.7124)), 2.6);
  float f0 = act(pos, uFocus0, 0.18) * (0.4 + 0.6 * thought0) * uFocusGain.x;
  float f1 = act(pos, uFocus1, 0.17) * (0.4 + 0.6 * thought1) * uFocusGain.y;
  float f2 = act(pos, uFocus2, 0.16) * (0.4 + 0.6 * thought2) * uFocusGain.z;
  float f3 = act(pos, uFocus3, 0.14) * (0.4 + 0.6 * thought3) * uFocusGain.w;
  float focus = max(f0, max(f1, max(f2, f3)));
  float sync = min(min(max(f0, f1), max(f2, f3)), max(max(f0, f2), max(f1, f3)));
  float nexus = act(pos, uNexus, 0.1) * uBoost;
  float tissue = smoothstep(0.08, 0.52, aDensity);
  float moderate = smoothstep(0.12, 0.32, aBright);
  float active = smoothstep(0.42, 0.68, aBright);
  float conv = smoothstep(0.85, 1.0, aBright);
  float clusterWave = sin(uTime * 1.08 + aCluster * 1.85);
  float beatA = pow(max(0.0, sin(uTime * 1.78 + aCluster * 2.15 + aCenter.y * 2.4)), 1.7);
  float beatB = pow(max(0.0, sin(uTime * 1.12 + aCluster * 0.85 + aCenter.x * 3.1)), 1.9);
  float beat = max(beatA, beatB * 0.82);
  float pulse = 0.42 + 0.58 * clusterWave;
  float quiet = 0.26 + tissue * 0.1 + wake * 0.07 + beat * 0.16;
  float mid = 0.48 + focus * 0.14 + wake * 0.07 + pulse * 0.22 + beat * 0.3;
  float lit = 0.82 + focus * 0.18 + wake * 0.07 + beat * 0.32;
  float hot = 0.94 + nexus * 0.06 + sync * 0.04 + beat * 0.16;
  float activity = mix(quiet, mid, moderate);
  activity = mix(activity, lit, active);
  activity = mix(activity, hot, conv);
  vec4 clip = uViewProj * vec4(pos, 1.0);
  float nearBlur = smoothstep(1.28, 0.5, clip.w);
  float farDim = smoothstep(3.15, 4.7, clip.w);
  float sizePx = aSize * mix(1.28, mix(2.15, 3.7, conv), mix(moderate, 1.0, active));
  sizePx *= mix(1.0, 1.85, aMist);
  sizePx *= 1.0 + nearBlur * 0.05 + wake * 0.08 + focus * 0.2 + beat * mix(0.52, 0.06, aMist);
  clip.xy += aCorner * vec2(sizePx / uResolution.x, sizePx / uResolution.y) * clip.w;
  gl_Position = clip;
  vCorner = aCorner;
  vMist = aMist;
  vGlow = max(conv, beat);
  float cyanId = smoothstep(0.02, 0.16, aColor.g - aColor.r) * smoothstep(0.08, 0.32, aColor.b);
  float violetId = smoothstep(0.03, 0.18, aColor.b - aColor.g) * smoothstep(0.08, 0.28, aColor.r);
  float warmId = smoothstep(0.02, 0.14, aColor.r - aColor.b) * smoothstep(0.02, 0.12, aColor.g);
  float flowStrength = max(violetId, max(cyanId, warmId));
  vec3 violetTint = vec3(0.66, 0.3, 0.9);
  vec3 cyanTint = vec3(0.16, 0.9, 0.96);
  vec3 warmTint = vec3(0.72, 0.42, 0.46);
  vec3 materialColor = aColor;
  materialColor = mix(materialColor, violetTint, violetId * 0.34);
  materialColor = mix(materialColor, cyanTint, cyanId * 0.08);
  materialColor = mix(materialColor, warmTint, warmId * 0.04);
  vec3 nexusTint = vec3(0.42, 0.72, 0.94);
  vColor = mix(materialColor, nexusTint, conv * (0.01 + nexus * 0.02 + sync * 0.01));
  vColor *= mix(1.2 + beat * 0.42, 0.3, aMist);
  vColor = mix(vColor, violetTint, violetId * (1.0 - aMist) * 0.06);
  float isolate = clamp(focus * 1.35 + wake * 0.4 + nexus * 0.25, 0.0, 1.0);
  vColor = mix(vColor, uTint, uTintAmt * (1.0 - aMist) * mix(0.2, 0.82, isolate));
  vAlpha = mix(0.36 + 0.48 * activity, 0.034 + 0.016 * activity, aMist);
  vAlpha *= 1.0 + flowStrength * (1.0 - aMist) * 0.08 + wake * mix(0.26, 0.04, aMist) + focus * mix(0.5, 0.06, aMist) + beat * mix(1.15, 0.06, aMist);
  vAlpha *= mix(uDim, 1.0, isolate);
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
  float core = exp(-d * d * mix(16.8, 0.86, vMist));
  float halo = exp(-d * d * mix(7.2, 0.96, vMist)) * mix(0.08 + vGlow * 0.16, 0.1, vMist);
  float a = (core + halo) * vAlpha;
  if (a < 0.007) discard;
  vec3 c = vColor * a;
  float peak = max(c.r, max(c.g, c.b));
  float cap = mix(0.78, 0.1, vMist);
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
attribute float aAlong;
attribute float aPhase;
attribute float aCurrent;
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
uniform vec4 uFocusGain;
uniform vec3 uTint;
uniform float uTintAmt;
uniform float uDim;
uniform float uTime;
varying float vAlpha;
varying vec3 vColor;
varying float vSide;
varying float vFlow;
float act(vec3 p, vec3 w, float r) {
  vec3 d = p - w;
  return exp(-dot(d, d) / (r * r));
}
void main() {
  vec3 world = mix(aA, aB, aEnd);
  float wake = max(act(world, uWake0, 0.2), max(act(world, uWake1, 0.18), act(world, uWake2, 0.18)));
  float thought0 = pow(max(0.0, sin(uTime * 1.22)), 2.6);
  float thought1 = pow(max(0.0, sin(uTime * 1.22 + 1.5708)), 2.6);
  float thought2 = pow(max(0.0, sin(uTime * 1.22 + 3.1416)), 2.6);
  float thought3 = pow(max(0.0, sin(uTime * 1.22 + 4.7124)), 2.6);
  float f0 = act(world, uFocus0, 0.16) * (0.4 + 0.6 * thought0) * uFocusGain.x;
  float f1 = act(world, uFocus1, 0.15) * (0.4 + 0.6 * thought1) * uFocusGain.y;
  float f2 = act(world, uFocus2, 0.14) * (0.4 + 0.6 * thought2) * uFocusGain.z;
  float f3 = act(world, uFocus3, 0.12) * (0.4 + 0.6 * thought3) * uFocusGain.w;
  float focus = max(f0, max(f1, max(f2, f3)));
  float nexus = act(world, uNexus, 0.1) * uBoost;
  float packetA = fract(uTime * 0.48 + aPhase);
  float packetB = fract(uTime * 0.48 + aPhase + 0.38);
  float packetC = fract(uTime * 0.48 + aPhase + 0.72);
  float spanA = abs(aAlong - packetA);
  spanA = min(spanA, 1.0 - spanA);
  float spanB = abs(aAlong - packetB);
  spanB = min(spanB, 1.0 - spanB);
  float spanC = abs(aAlong - packetC);
  spanC = min(spanC, 1.0 - spanC);
  float current = max(exp(-spanA * spanA * 16.0), max(exp(-spanB * spanB * 23.0) * 0.82, exp(-spanC * spanC * 30.0) * 0.64));
  float strand = 0.56 + 0.44 * pow(max(0.0, sin(uTime * 1.38 + aPhase * 6.2831)), 1.6);
  float flowPulse = current * max(aCurrent, 0.74) * 1.36 * strand;
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
  float px = 0.58 + flowPulse * 0.62;
  pos.xy += perp * aSide * (px / uResolution) * 2.0 * pos.w;
  gl_Position = pos;
  vSide = aSide;
  float cyanId = smoothstep(0.02, 0.16, aColor.g - aColor.r) * smoothstep(0.08, 0.32, aColor.b);
  float violetId = smoothstep(0.03, 0.18, aColor.b - aColor.g) * smoothstep(0.08, 0.28, aColor.r);
  float warmId = smoothstep(0.02, 0.14, aColor.r - aColor.b) * smoothstep(0.02, 0.12, aColor.g);
  float flowStrength = max(violetId, max(cyanId, warmId));
  float isolate = clamp(focus * 1.4 + wake * 0.35 + nexus * 0.2, 0.0, 1.0);
  vAlpha = aAlpha * (0.8 + flowStrength * 0.14 + focus * 0.14 + wake * 0.07 + nexus * 0.03 + flowPulse * 1.12 + strand * 0.2);
  vAlpha *= mix(uDim, 1.0, isolate);
  vec3 violetTint = vec3(0.68, 0.3, 0.9);
  vec3 cyanTint = vec3(0.18, 0.86, 0.92);
  vec3 warmTint = vec3(0.72, 0.42, 0.46);
  vec3 materialColor = aColor;
  materialColor = mix(materialColor, violetTint, violetId * 0.08);
  materialColor = mix(materialColor, cyanTint, cyanId * 0.12);
  materialColor = mix(materialColor, warmTint, warmId * 0.04);
  vColor = mix(materialColor, vec3(0.94, 0.88, 0.76), nexus * 0.02);
  vColor = mix(vColor, uTint, uTintAmt * mix(0.12, 0.58, isolate));
  vColor *= 0.84 + flowPulse * 0.92;
  vFlow = flowPulse;
}
`;

const LINE_FRAG = `
precision mediump float;
varying float vAlpha;
varying vec3 vColor;
varying float vSide;
varying float vFlow;
void main() {
  float fall = exp(-vSide * vSide * 6.2);
  float a = vAlpha * fall;
  vec3 c = vColor * a;
  float peak = max(c.r, max(c.g, c.b));
  float cap = mix(0.3, 0.88, clamp(vFlow, 0.0, 1.0));
  if (peak > cap) {
    c *= cap / peak;
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
  vec3 violetTint = vec3(0.64, 0.28, 0.9);
  vec3 cyanTint = vec3(0.16, 0.88, 0.96);
  vec3 warmTint = vec3(0.7, 0.4, 0.48);
  vec3 materialColor = aColor;
  materialColor = mix(materialColor, violetTint, violetId * 0.28);
  materialColor = mix(materialColor, cyanTint, cyanId * 0.32);
  vColor = mix(materialColor, warmTint, warmId * 0.08);
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
attribute vec3 aColor;
uniform mat4 uViewProj;
varying vec3 vColor;
void main() {
  vec4 clip = uViewProj * vec4(aPosition, 1.0);
  gl_Position = clip;
  gl_PointSize = max(1.8, 4.2 * (1.6 / max(0.55, clip.w)));
  vColor = aColor;
}
`;

const SPARK_FRAG = `
precision mediump float;
varying vec3 vColor;
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float a = exp(-dot(p, p) * 5.6) * 0.7;
  vec3 c = vColor * a;
  float peak = max(c.r, max(c.g, c.b));
  if (peak > 0.7) {
    c *= 0.7 / peak;
  }
  gl_FragColor = vec4(c, a);
}
`;

const QUAD_CORNERS = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];

const VOL_VERT = `
attribute vec3 aCorner;
uniform mat4 uViewProj;
uniform vec3 uOrigin;
uniform vec3 uSize;
varying vec3 vWorld;
void main() {
  vWorld = uOrigin + aCorner * uSize;
  gl_Position = uViewProj * vec4(vWorld, 1.0);
}
`;

const VOL_FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D uVol;
uniform vec3 uOrigin;
uniform vec3 uSize;
uniform vec3 uCam;
uniform vec3 uWake0;
uniform vec3 uWake1;
uniform vec3 uWake2;
uniform float uTime;
uniform vec2 uAtlas;
uniform vec2 uGrid;
uniform vec2 uTiles;
uniform float uNz;
varying vec3 vWorld;

float act(vec3 p, vec3 w) {
  vec3 d = p - w;
  return exp(-dot(d, d) / 0.048);
}

vec4 sampleSlice(vec3 p, float slice) {
  float col = mod(slice, uTiles.x);
  float row = floor(slice / uTiles.x);
  vec2 tile = uGrid + 2.0;
  vec2 origin = vec2(col, row) * tile + 1.0;
  vec2 px = origin + clamp(p.xy, 0.0, 1.0) * max(uGrid - 1.0, vec2(1.0));
  return texture2D(uVol, px / uAtlas);
}

vec4 sampleVol(vec3 world) {
  vec3 p = (world - uOrigin) / uSize;
  if (min(min(p.x, p.y), p.z) < 0.0 || max(max(p.x, p.y), p.z) > 1.0) {
    return vec4(0.0);
  }
  float z = p.z * (uNz - 1.0);
  float z0 = floor(z);
  float z1 = min(z0 + 1.0, uNz - 1.0);
  return mix(sampleSlice(p, z0), sampleSlice(p, z1), z - z0);
}

void main() {
  vec3 ro = uCam;
  vec3 rd = normalize(vWorld - uCam);
  vec3 inv = 1.0 / rd;
  vec3 t0 = (uOrigin - ro) * inv;
  vec3 t1 = (uOrigin + uSize - ro) * inv;
  vec3 tmin = min(t0, t1);
  vec3 tmax = max(t0, t1);
  float tN = max(max(tmin.x, tmin.y), tmin.z);
  float tF = min(min(tmax.x, tmax.y), tmax.z);
  if (tF < 0.0 || tN > tF) {
    discard;
  }
  tN = max(tN, 0.0);
  vec3 acc = vec3(0.0);
  float alpha = 0.0;
  float dt = (tF - tN) / 36.0;
  for (int i = 0; i < 36; i += 1) {
    vec3 pos = ro + rd * (tN + (float(i) + 0.5) * dt);
    pos.x += 0.012 * sin(uTime * 0.32 + pos.y * 2.4 + pos.z * 1.3);
    pos.y += 0.008 * cos(uTime * 0.28 + pos.x * 1.9);
    vec4 s = sampleVol(pos);
    if (s.a >= 0.1) {
      float wake = max(act(pos, uWake0), max(act(pos, uWake1), act(pos, uWake2)));
      float dens = max(0.0, s.a - 0.14) * (1.0 + wake * 0.05);
      float absorb = 1.0 - exp(-dens * dens * 1.45 * dt * 8.0);
      float keep = 1.0 - alpha;
      acc += s.rgb * absorb * keep;
      alpha += absorb * keep;
    }
    if (alpha > 0.76) {
      break;
    }
  }
  if (alpha < 0.012) {
    discard;
  }
  float luma = dot(acc, vec3(0.22, 0.55, 0.23));
  if (luma > 0.2) {
    acc *= 0.2 / luma;
  }
  float peak = max(acc.r, max(acc.g, acc.b));
  if (peak > 0.36) {
    acc *= 0.36 / peak;
  }
  gl_FragColor = vec4(acc, alpha);
}
`;

function cubeCorners(): Float32Array {
  return new Float32Array([
    0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0,
    0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1,
    0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0,
    0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1,
  ]);
}

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

function filamentPhase(p: Vec3): number {
  const s = Math.sin(p.x * 12.9898 + p.y * 78.233 + p.z * 37.719) * 43758.5453;
  return s - Math.floor(s);
}

function disableAttribs(gl: WebGLRenderingContext) {
  for (let i = 0; i < 12; i += 1) {
    gl.disableVertexAttribArray(i);
  }
}

function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export default function NexusOrganism({
  events,
  label,
  activeBeat = 'hero',
  released = false,
}: NexusOrganismProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fieldBoxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eventRefs = useRef<Array<HTMLDivElement | null>>([]);
  const fieldRef = useRef<NexusField | null>(null);
  const beatRef = useRef<NexusActiveBeat>(activeBeat);
  const releasedRef = useRef(released);
  beatRef.current = activeBeat;
  releasedRef.current = released;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const fieldBox = fieldBoxRef.current;
    if (!canvas || !wrap || !fieldBox) {
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
    const volProg = program(gl, VOL_VERT, VOL_FRAG);
    if (!nodeProg || !lineProg || !sparkProg) {
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
    const volBuffer = gl.createBuffer();
    const volTex = gl.createTexture();
    gl.bindBuffer(gl.ARRAY_BUFFER, volBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cubeCorners(), gl.STATIC_DRAW);
    let volReady = false;
    let nodeCount = 0;
    let mistCount = 0;
    let lineCount = 0;
    let membCount = 0;
    const sparkCount = 46;
    const sparkData = new Float32Array(sparkCount * 6);
    const sparkMeta: { filament: number; speed: number; offset: number; r: number; g: number; b: number }[] = [];

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
      const lineStride = 15;
      const lines = new Float32Array(lineVerts * lineStride);
      let li = 0;
      const pushLineVert = (
        a: Vec3,
        b: Vec3,
        end: number,
        side: number,
        filament: { r: number; g: number; b: number; alpha: number },
        alongT: number,
        phase: number,
        current: number
      ) => {
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
        lines[li++] = alongT;
        lines[li++] = phase;
        lines[li++] = current;
      };
      for (const filament of field.filaments) {
        const segs = filament.points.length - 1;
        if (segs < 1) {
          continue;
        }
        const phase = filamentPhase(filament.points[0]);
        const current = filament.current ? 1 : 0;
        for (let i = 0; i < segs; i += 1) {
          const a = filament.points[i];
          const b = filament.points[i + 1];
          const alongA = i / segs;
          const alongB = (i + 1) / segs;
          pushLineVert(a, b, 0, -1, filament, alongA, phase, current);
          pushLineVert(a, b, 0, 1, filament, alongA, phase, current);
          pushLineVert(a, b, 1, 1, filament, alongB, phase, current);
          pushLineVert(a, b, 0, -1, filament, alongA, phase, current);
          pushLineVert(a, b, 1, 1, filament, alongB, phase, current);
          pushLineVert(a, b, 1, -1, filament, alongB, phase, current);
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

      if (volProg && volTex && field.volume) {
        const vol = field.volume;
        gl.bindTexture(gl.TEXTURE_2D, volTex);
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, vol.atlasW, vol.atlasH, 0, gl.RGBA, gl.UNSIGNED_BYTE, vol.data);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        volReady = true;
      }

      const currents = field.filaments
        .map((filament, index) => (filament.current ? index : -1))
        .filter((index) => index >= 0);
      const pool = currents.length ? currents : field.filaments.map((_, index) => index);
      sparkMeta.length = 0;
      for (let i = 0; i < sparkCount; i += 1) {
        const filament = field.filaments[pool[i % Math.max(1, pool.length)]];
        sparkMeta.push({
          filament: pool[i % Math.max(1, pool.length)],
          speed: 0.46 + (i % 7) * 0.1,
          offset: i * 0.137,
          r: filament ? Math.min(1, filament.r * 1.18 + 0.08) : 0.22,
          g: filament ? Math.min(1, filament.g * 1.12 + 0.12) : 0.82,
          b: filament ? Math.min(1, filament.b * 1.16 + 0.1) : 0.92,
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
      const stride = 60;
      const locA = gl.getAttribLocation(lineProg, 'aA');
      const locB = gl.getAttribLocation(lineProg, 'aB');
      const locC = gl.getAttribLocation(lineProg, 'aColor');
      const locAl = gl.getAttribLocation(lineProg, 'aAlpha');
      const locE = gl.getAttribLocation(lineProg, 'aEnd');
      const locS = gl.getAttribLocation(lineProg, 'aSide');
      const locAlong = gl.getAttribLocation(lineProg, 'aAlong');
      const locPhase = gl.getAttribLocation(lineProg, 'aPhase');
      const locCur = gl.getAttribLocation(lineProg, 'aCurrent');
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
      if (locAlong >= 0) {
        gl.enableVertexAttribArray(locAlong);
        gl.vertexAttribPointer(locAlong, 1, gl.FLOAT, false, stride, 48);
      }
      if (locPhase >= 0) {
        gl.enableVertexAttribArray(locPhase);
        gl.vertexAttribPointer(locPhase, 1, gl.FLOAT, false, stride, 52);
      }
      if (locCur >= 0) {
        gl.enableVertexAttribArray(locCur);
        gl.vertexAttribPointer(locCur, 1, gl.FLOAT, false, stride, 56);
      }
    };

    const bindMemb = () => {
      if (!membProg) {
        return;
      }
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
    let aspect = 1;
    let baseDist = 1.02;
    let viewProj: Float32Array = new Float32Array(16);
    const heroLook = NEXUS_BEAT_LOOK.hero;
    let camX = heroLook.camX;
    let camY = heroLook.camY;
    let camZ = heroLook.camZMul;
    let lookX = heroLook.lookX;
    let lookY = heroLook.lookY;
    let lookZ = heroLook.lookZ;
    let fovDeg = heroLook.fov;
    let gain0 = heroLook.gain[0];
    let gain1 = heroLook.gain[1];
    let gain2 = heroLook.gain[2];
    let gain3 = heroLook.gain[3];
    let tintR = heroLook.tint[0];
    let tintG = heroLook.tint[1];
    let tintB = heroLook.tint[2];
    let tintAmt = heroLook.tintAmt;
    let dim = heroLook.dim;
    let wakePin = heroLook.wakePin;
    let lastBudget = 0;
    let foci: [Vec3, Vec3, Vec3, Vec3] = [
      { x: 0.14, y: 0.44, z: 0.04 },
      { x: -0.1, y: 0.22, z: -0.06 },
      { x: 0.18, y: 0.18, z: 0.07 },
      { x: 0.04, y: 0.32, z: -0.1 },
    ];

    const applyCamera = () => {
      const proj = perspective((fovDeg * Math.PI) / 180, aspect, 0.12, 10);
      const view = lookAt(camX, camY, camZ, lookX, lookY, lookZ);
      viewProj = multiply4(proj, view);
    };

    const resize = () => {
      width = Math.max(1, fieldBox.clientWidth);
      height = Math.max(1, fieldBox.clientHeight);
      aspect = width / height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      baseDist = aspect < 0.9 ? 1.18 : 1.02;
      applyCamera();
      const budget = nexusBudget(window.innerWidth);
      const mark = budget.nodes + budget.filaments + NEXUS_FIELD_REV;
      if (mark !== lastBudget) {
        lastBudget = mark;
        uploadField(buildNexusField(budget));
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(fieldBox);

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
      gain: gl.getUniformLocation(nodeProg, 'uFocusGain'),
      tint: gl.getUniformLocation(nodeProg, 'uTint'),
      tintAmt: gl.getUniformLocation(nodeProg, 'uTintAmt'),
      dim: gl.getUniformLocation(nodeProg, 'uDim'),
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
      gain: gl.getUniformLocation(lineProg, 'uFocusGain'),
      tint: gl.getUniformLocation(lineProg, 'uTint'),
      tintAmt: gl.getUniformLocation(lineProg, 'uTintAmt'),
      dim: gl.getUniformLocation(lineProg, 'uDim'),
      time: gl.getUniformLocation(lineProg, 'uTime'),
    };
    const uMemb = membProg
      ? {
          view: gl.getUniformLocation(membProg, 'uViewProj'),
          time: gl.getUniformLocation(membProg, 'uTime'),
        }
      : null;
    const uSpark = {
      view: gl.getUniformLocation(sparkProg, 'uViewProj'),
    };
    const uVol = volProg
      ? {
          view: gl.getUniformLocation(volProg, 'uViewProj'),
          origin: gl.getUniformLocation(volProg, 'uOrigin'),
          size: gl.getUniformLocation(volProg, 'uSize'),
          cam: gl.getUniformLocation(volProg, 'uCam'),
          w0: gl.getUniformLocation(volProg, 'uWake0'),
          w1: gl.getUniformLocation(volProg, 'uWake1'),
          w2: gl.getUniformLocation(volProg, 'uWake2'),
          time: gl.getUniformLocation(volProg, 'uTime'),
          atlas: gl.getUniformLocation(volProg, 'uAtlas'),
          grid: gl.getUniformLocation(volProg, 'uGrid'),
          tiles: gl.getUniformLocation(volProg, 'uTiles'),
          nz: gl.getUniformLocation(volProg, 'uNz'),
          vol: gl.getUniformLocation(volProg, 'uVol'),
        }
      : null;

    let frame = 0;
    let lastCycle = 0;
    let eventCursor = 0;

    const placeEvents = (time: number) => {
      const beat = beatRef.current;
      if (beat !== 'hero') {
        for (let i = 0; i < events.length; i += 1) {
          const el = eventRefs.current[i];
          if (!el) {
            continue;
          }
          el.classList.remove('is-on', 'is-thinking');
        }
        return;
      }
      const mobile = window.innerWidth < 768;
      const count = mobile ? 1 : events.length;
      if (!reduced && time - lastCycle > (mobile ? 5200 : 3600)) {
        lastCycle = time;
        eventCursor = (eventCursor + 1) % Math.max(1, events.length);
      }
      const shown = new Set<number>();
      for (let k = 0; k < count; k += 1) {
        shown.add(mobile ? (eventCursor + k) % events.length : k);
      }
      for (let i = 0; i < events.length; i += 1) {
        const el = eventRefs.current[i];
        if (!el) {
          continue;
        }
        el.classList.toggle('is-on', shown.has(i));
        el.classList.toggle('is-thinking', !reduced && shown.has(i) && i === eventCursor);
      }
    };

    const draw = (now: number) => {
      frame = window.requestAnimationFrame(draw);
      if (!inView || !pageVisible || releasedRef.current) {
        return;
      }
      const time = reduced ? 4.35 : now * 0.0025;
      const beat = beatRef.current as NexusBeatLookId;
      const shot = reduced ? NEXUS_BEAT_LOOK.hero : NEXUS_BEAT_LOOK[beat] ?? NEXUS_BEAT_LOOK.hero;
      const ease = reduced ? 1 : 0.062;
      camX = mix(camX, shot.camX, ease);
      camY = mix(camY, shot.camY, ease);
      camZ = mix(camZ, Math.max(0.42, baseDist * shot.camZMul), ease);
      lookX = mix(lookX, shot.lookX, ease);
      lookY = mix(lookY, shot.lookY, ease);
      lookZ = mix(lookZ, shot.lookZ, ease);
      fovDeg = mix(fovDeg, shot.fov, ease);
      gain0 = mix(gain0, shot.gain[0], ease);
      gain1 = mix(gain1, shot.gain[1], ease);
      gain2 = mix(gain2, shot.gain[2], ease);
      gain3 = mix(gain3, shot.gain[3], ease);
      tintR = mix(tintR, shot.tint[0], ease);
      tintG = mix(tintG, shot.tint[1], ease);
      tintB = mix(tintB, shot.tint[2], ease);
      tintAmt = mix(tintAmt, shot.tintAmt, ease);
      dim = mix(dim, shot.dim, ease);
      wakePin = mix(wakePin, shot.wakePin, ease);
      applyCamera();

      const scene = wakePositions(time);
      const focus = reduced ? nexusFocusForBeat('hero') : nexusFocusForBeat(beat);
      const wakes: [Vec3, Vec3, Vec3] = [
        {
          x: mix(scene.wakes[0].x, focus.x, wakePin),
          y: mix(scene.wakes[0].y, focus.y, wakePin),
          z: mix(scene.wakes[0].z, focus.z, wakePin),
        },
        {
          x: mix(scene.wakes[1].x, focus.x, wakePin * 0.72),
          y: mix(scene.wakes[1].y, focus.y, wakePin * 0.72),
          z: mix(scene.wakes[1].z, focus.z, wakePin * 0.72),
        },
        {
          x: mix(scene.wakes[2].x, focus.x, wakePin * 0.46),
          y: mix(scene.wakes[2].y, focus.y, wakePin * 0.46),
          z: mix(scene.wakes[2].z, focus.z, wakePin * 0.46),
        },
      ];
      const nexus = {
        x: mix(scene.nexus.x, focus.x, wakePin * 0.55),
        y: mix(scene.nexus.y, focus.y, wakePin * 0.55),
        z: mix(scene.nexus.z, focus.z, wakePin * 0.55),
      };
      const boost = Math.min(1.35, scene.boost * mix(1, shot.boostMul, 0.85));

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      const setNodeScene = () => {
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
        gl.uniform4f(uNode.gain, gain0, gain1, gain2, gain3);
        gl.uniform3f(uNode.tint, tintR, tintG, tintB);
        gl.uniform1f(uNode.tintAmt, tintAmt);
        gl.uniform1f(uNode.dim, dim);
      };

      disableAttribs(gl);
      bindNodes();
      setNodeScene();
      if (mistCount) {
        gl.drawArrays(gl.TRIANGLES, 0, mistCount);
      }

      disableAttribs(gl);
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
      gl.uniform4f(uLine.gain, gain0, gain1, gain2, gain3);
      gl.uniform3f(uLine.tint, tintR, tintG, tintB);
      gl.uniform1f(uLine.tintAmt, tintAmt);
      gl.uniform1f(uLine.dim, dim);
      gl.uniform1f(uLine.time, time);
      if (lineCount) {
        gl.drawArrays(gl.TRIANGLES, 0, lineCount);
      }

      disableAttribs(gl);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      bindNodes();
      setNodeScene();
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
          sparkData[i * 6] = p.x;
          sparkData[i * 6 + 1] = p.y;
          sparkData[i * 6 + 2] = p.z;
          sparkData[i * 6 + 3] = meta.r;
          sparkData[i * 6 + 4] = meta.g;
          sparkData[i * 6 + 5] = meta.b;
        }
        disableAttribs(gl);
        gl.useProgram(sparkProg);
        gl.bindBuffer(gl.ARRAY_BUFFER, sparkBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, sparkData, gl.DYNAMIC_DRAW);
        const loc = gl.getAttribLocation(sparkProg, 'aPosition');
        const locCol = gl.getAttribLocation(sparkProg, 'aColor');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 24, 0);
        if (locCol >= 0) {
          gl.enableVertexAttribArray(locCol);
          gl.vertexAttribPointer(locCol, 3, gl.FLOAT, false, 24, 12);
        }
        gl.uniformMatrix4fv(uSpark.view, false, viewProj);
        gl.drawArrays(gl.POINTS, 0, sparkCount);
      }

      placeEvents(now);
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
      gl.deleteBuffer(volBuffer);
      gl.deleteTexture(volTex);
      gl.deleteProgram(nodeProg);
      gl.deleteProgram(lineProg);
      if (membProg) {
        gl.deleteProgram(membProg);
      }
      gl.deleteProgram(sparkProg);
      if (volProg) {
        gl.deleteProgram(volProg);
      }
    };
  }, [events]);

  return (
    <div className="nexus-organism" ref={wrapRef}>
      <div className="nexus-organism__field" ref={fieldBoxRef} aria-hidden="true">
        <picture>
          <source srcSet={NEXUS_CONSTELLATION_PLATE} type="image/webp" />
          <img
            className="nexus-organism__plate"
            src={NEXUS_CONSTELLATION_PLATE_PNG}
            alt=""
            draggable={false}
            fetchPriority="high"
          />
        </picture>
        <canvas ref={canvasRef} className="nexus-organism__canvas" aria-hidden="true" />
      </div>
      <span className="visually-hidden">{label}</span>
      {events.map((event, index) => (
        <div
          key={event.id}
          ref={(el) => {
            eventRefs.current[index] = el;
          }}
          className="nexus-event"
          data-event={event.id}
        >
          <NexusEventMark id={event.id} />
          <span>
            <span className="nexus-event__title">{event.title}</span>
            <span className="nexus-event__sub">{event.subtitle}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
