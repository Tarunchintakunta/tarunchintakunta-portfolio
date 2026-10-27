// @ts-nocheck
// Mechanical port of the original index.html scene. Phase windows are unchanged.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import Lenis from 'lenis';

export function mountHomeScene(root: HTMLElement): () => void {
  let disposed = false;
  let rafId = 0;
  let titleObserver = null;
  let modelGiveUp = false;
  let modelTimer = 0;
  const ac = new AbortController();
  const pending = new Set();
  const setTimeout = (fn, ms) => {
    const id = window.setTimeout(() => {
      pending.delete(id);
      if (!disposed) fn();
    }, ms);
    pending.add(id);
    return id;
  };
  const byId = (id) => {
    const el = root.querySelector('#' + id);
    if (!el) throw new Error('Missing #' + id);
    return el;
  };
  const dprCap = matchMedia('(max-width: 900px)').matches ? 1.5 : 2;
  const skipPreloader = (() => {
    try { return sessionStorage.getItem('tc-preloader-seen') === '1'; } catch (e) { return false; }
  })();

  function applyPreloaderSkip() {
    if (!skipPreloader) return;
    preloaderDone = true;
    heroRevealed = true;
    preloaderPoints.visible = false;
    const pre = byId('preloader');
    pre.style.display = 'none';
    root.querySelectorAll('.preload-hidden').forEach((el) => el.classList.remove('preload-hidden'));
    root.querySelectorAll('#animated-hero-title .hero-char').forEach((c) => c.classList.add('revealed'));
  }

  function disposeMaterial(material) {
    if (!material) return;
    const list = Array.isArray(material) ? material : [material];
    for (const m of list) {
      for (const value of Object.values(m)) {
        if (value && value.isTexture) value.dispose();
      }
      m.dispose?.();
    }
  }

  function disposeScene(target) {
    target.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) disposeMaterial(child.material);
    });
  }

const ASSET_BASE_URL = 'https://api.getlayers.ai/storage/v1/object/public/public/assets/clarix-281ac6c399';

/* ============ smooth scroll ============ */
const lenis = new Lenis({
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

/* ============ marquee (text stack, two sets for seamless loop) ============ */
const STACK = ['TypeScript', 'Three.js', 'GLSL', 'React', 'Next.js', 'Node', 'Python', 'Postgres', 'GSAP', 'Figma', 'Docker'];
byId('marquee-content').innerHTML =
  [...STACK, ...STACK].map(s => `<span class="marquee-item">${s}</span>`).join('');

/* ============ flying words ============ */
const splitWord = (el, word) => {
  el.innerHTML = [...word].map(c => `<span class="char">${c}</span>`).join('');
};
splitWord(byId('word1'), 'design');
splitWord(byId('word2'), 'build');
splitWord(byId('word3'), 'ship');

/* ============ scenes ============ */
const bgScene = new THREE.Scene();
bgScene.background = new THREE.Color(0xf6fafe);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5);

const rendererBg = new THREE.WebGLRenderer({ antialias: true });
rendererBg.setSize(window.innerWidth, window.innerHeight);
rendererBg.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));
rendererBg.domElement.style.position = 'fixed';
rendererBg.domElement.style.top = '0';
rendererBg.domElement.style.left = '0';
rendererBg.domElement.style.zIndex = '1';
root.appendChild(rendererBg.domElement);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '3';
root.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;
controls.enableDamping = true;
controls.dampingFactor = 0.05;

scene.add(new THREE.AmbientLight(0xffffff, 1.0));
const dir1 = new THREE.DirectionalLight(0xffffff, 2.0);
dir1.position.set(5, 10, 5);
scene.add(dir1);
const dir2 = new THREE.DirectionalLight(0xffffff, 1.0);
dir2.position.set(-5, -5, -5);
scene.add(dir2);

/* ============ shared uniforms ============ */
const clock = new THREE.Clock();
const targetMouse = new THREE.Vector2(0.5, 0.5);
const _revealVec = new THREE.Vector3();
const shaderUniforms = {
  time: { value: 0 },
  mouse: { value: new THREE.Vector2(0.5, 0.5) },
  resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  bgColor: { value: new THREE.Color(0xf6fafe) },
  colorCyan: { value: new THREE.Color(0x00aaff) },
  colorPurple: { value: new THREE.Color(0x8000ff) },
  colorBlue: { value: new THREE.Color(0x0091ff) },
  colorPeach: { value: new THREE.Color(0xff0000) },
  colorHotPink: { value: new THREE.Color(0xff0099) },
  edgeBlurAmount: { value: 0.5 },
  uRevealProgress: { value: 0.0 },
  uRevealOrigin: { value: new THREE.Vector2(0.5, 0.5) }
};

const guiParams = { phase4X: -1.35, phase4Y: -5.4, phase4Z: 5.67, phase4Scale: 0.85, phase4RotX: 0, phase4RotY: 0.6723, phase4RotZ: 0 };

/* ============ A. background ASCII grid ============ */
const bgMat = new THREE.ShaderMaterial({
  uniforms: {
    time: shaderUniforms.time, mouse: shaderUniforms.mouse, bgColor: shaderUniforms.bgColor,
    resolution: shaderUniforms.resolution, colorCyan: shaderUniforms.colorCyan,
    colorBlue: shaderUniforms.colorBlue, colorHotPink: shaderUniforms.colorHotPink, colorPeach: shaderUniforms.colorPeach
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 1.0, 1.0);
    }
  `,
  fragmentShader: /* glsl */`
    uniform float time;
    uniform vec2 mouse;
    uniform vec3 bgColor;
    uniform vec2 resolution;
    uniform vec3 colorCyan;
    uniform vec3 colorBlue;
    uniform vec3 colorHotPink;
    uniform vec3 colorPeach;
    varying vec2 vUv;

    mat2 rotate2d(float _angle){
        return mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle));
    }

    void main() {
       float pixelSize = 15.0;
       vec2 screenUv = vUv;
       float aspect = resolution.x / resolution.y;
       vec2 aspectUv = vec2(screenUv.x * aspect, screenUv.y);

       vec2 gridUv = aspectUv * (resolution.y / pixelSize);
       vec2 localUv = fract(gridUv) - 0.5;

       float wave1 = sin(aspectUv.x * 4.0 - time * 0.8);
       float wave2 = cos(aspectUv.y * 3.0 + time * 0.6);
       float combinedWave = smoothstep(-0.8, 0.8, (wave1 + wave2) * 0.5);
       float wavePeach = sin(aspectUv.y * 3.0 - aspectUv.x * 2.0 + time * 0.9) * 0.5 + 0.5;

       vec3 mixColor = mix(colorBlue, colorCyan, combinedWave);
       vec3 pinkTransition = mix(mixColor, colorHotPink, smoothstep(0.1, 0.7, wavePeach));
       mixColor = mix(pinkTransition, colorPeach, smoothstep(0.5, 1.0, wavePeach));
       vec3 lightGridColor = mix(mixColor, vec3(1.0), 0.6);

       float boxSize = 0.3 + sin(time * 2.0 + gridUv.x * 0.2 + gridUv.y * 0.2) * 0.1;
       float radius = 0.12;
       float d = length(max(abs(localUv) - (boxSize - radius), 0.0)) - radius;
       float alpha = smoothstep(0.05, 0.0, d);

       vec2 radialCenter = mix(vec2(0.5, 0.5), mouse, 0.3);
       float radialMask = smoothstep(0.7, 0.1, distance(screenUv, radialCenter));

       vec2 p = aspectUv * 3.0;
       vec2 mouseAspect = vec2(mouse.x * aspect, mouse.y);
       float mouseDist = distance(aspectUv, mouseAspect);

       float noise = 0.0;
       noise += sin(p.x + time * 0.4) * sin(p.y + time * 0.3);
       p *= rotate2d(1.1);
       noise += sin(p.x * 1.5 - time * 0.5) * sin(p.y * 1.5 + time * 0.2);
       p *= rotate2d(2.3);
       noise += sin(p.x * 2.0 + time * 0.3) * sin(p.y * 2.0 - time * 0.4);

       noise += cos(mouseDist * 12.0 - time * 3.0) * smoothstep(0.6, 0.0, mouseDist) * 1.2;

       float blobMask = smoothstep(0.0, 1.5, noise);
       float cursorHighlight = smoothstep(0.2, 0.0, mouseDist);

       float finalMask = clamp((radialMask * blobMask) + (cursorHighlight * 0.5), 0.0, 1.0);
       float finalAlpha = alpha * finalMask * 0.85;

       vec3 finalColor = mix(bgColor, lightGridColor, finalAlpha);
       gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
  depthWrite: false, depthTest: false
});
const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat);
bgMesh.renderOrder = -1;
bgMesh.frustumCulled = false;
bgScene.add(bgMesh);

/* ============ B. holographic ASCII shader patch ============ */
function applyHolographicShader(mat) {
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, {
      time: shaderUniforms.time,
      colorCyan: shaderUniforms.colorCyan,
      colorPurple: shaderUniforms.colorPurple,
      colorBlue: shaderUniforms.colorBlue,
      colorPeach: shaderUniforms.colorPeach,
      colorHotPink: shaderUniforms.colorHotPink,
      edgeBlurAmount: shaderUniforms.edgeBlurAmount,
      uRevealProgress: shaderUniforms.uRevealProgress,
      uRevealOrigin: shaderUniforms.uRevealOrigin,
      resolution: shaderUniforms.resolution
    });

    shader.vertexShader = `varying vec3 vLocalPosition;\n` + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      `#include <begin_vertex>`,
      `#include <begin_vertex>
       #ifdef USE_INSTANCING
         vLocalPosition = (instanceMatrix * vec4(position, 1.0)).xyz;
       #else
         vLocalPosition = position;
       #endif`
    );

    shader.fragmentShader =
      `uniform float time;\nuniform float edgeBlurAmount;\nuniform float uRevealProgress;\nuniform vec2 uRevealOrigin;\nuniform vec2 resolution;\nuniform vec3 colorCyan;\nuniform vec3 colorPurple;\nuniform vec3 colorBlue;\nuniform vec3 colorPeach;\nuniform vec3 colorHotPink;\nvarying vec3 vLocalPosition;\n`
      + shader.fragmentShader;

    shader.fragmentShader = shader.fragmentShader.replace(
      `#include <dithering_fragment>`,
      `#include <dithering_fragment>
      vec3 vDir = normalize( vViewPosition );
      float fresnel = 1.0 - max(dot(vDir, normal), 0.0);
      float fresnelPow = pow(fresnel, 2.0);

      float hWave1 = sin(vLocalPosition.x * 2.0 - time * 1.0);
      float hWave2 = cos(vLocalPosition.y * 1.5 + time * 0.8);
      float hWave3 = sin(vLocalPosition.z * 2.5 + time * 0.5);
      float combinedWave = (hWave1 + hWave2 + hWave3) / 3.0;
      combinedWave = smoothstep(-0.5, 0.5, combinedWave);

      float wavePeach = sin(vLocalPosition.y * 2.0 - vLocalPosition.x * 1.0 + time * 1.2) * 0.5 + 0.5;

      vec3 mixColor = mix(colorBlue, colorCyan, combinedWave);
      vec3 pinkTransition = mix(mixColor, colorHotPink, smoothstep(0.2, 0.8, wavePeach));
      mixColor = mix(pinkTransition, colorPeach, smoothstep(0.5, 0.95, wavePeach));
      mixColor = mix(mixColor, colorPurple, fresnel);

      vec3 glow = colorCyan * fresnelPow * 1.5;

      float distortion = sin(vLocalPosition.x * 2.5 + time * 0.5) * 0.4 + cos(vLocalPosition.z * 2.0) * 0.4;
      float curvedY = vLocalPosition.y + distortion;
      float lines = fract((curvedY - time * 0.2) * 1.2);
      float lineIntensity = smoothstep(0.2, 0.6, lines) * smoothstep(1.0, 0.6, lines);
      vec3 lineGlow = vec3(0.2, 0.8, 1.0) * lineIntensity * (0.3 + fresnel * 1.0);

      vec3 finalEmission = mixColor * 0.6 + glow + lineGlow;

      float pixelSize = 8.0;
      vec2 asciiUv = fract(gl_FragCoord.xy / pixelSize) - 0.5;
      float luma = dot(finalEmission, vec3(0.2126, 0.7152, 0.0722));
      float currentSize = clamp(luma * 1.2, 0.05, 0.45);
      float currentRadius = mix(0.0, currentSize, wavePeach);
      float dBox = length(max(abs(asciiUv) - (currentSize - currentRadius), 0.0)) - currentRadius;
      float shapeAlpha = smoothstep(1.5 / pixelSize, 0.0, dBox);
      if (shapeAlpha < 0.1) discard;

      float edgeStart = mix(1.0, 0.7, edgeBlurAmount);
      float edgeEnd = mix(0.99, 0.1, edgeBlurAmount);
      float edgeBlur = smoothstep(edgeStart, edgeEnd, fresnel);

      finalEmission *= 1.2;

      vec2 screenUv = gl_FragCoord.xy / resolution.xy;
      screenUv.x *= resolution.x / resolution.y;

      if (uRevealProgress < 0.999) {
        vec2 revealOrigin = uRevealOrigin;
        float distFromCenter2D = distance(screenUv, revealOrigin);
        float currentRadius2D = uRevealProgress * 3.0;
        float gridRandom = fract(sin(dot(floor(gl_FragCoord.xy / 8.0), vec2(12.9898, 78.233))) * 43758.5453);
        float noisyRadius2D = currentRadius2D - gridRandom * 0.15 * (1.0 - uRevealProgress);
        if (distFromCenter2D > noisyRadius2D) discard;
        float revealEdge = smoothstep(noisyRadius2D - 0.05, noisyRadius2D, distFromCenter2D);
        vec3 revealGlow = colorHotPink * revealEdge * 3.0 + colorCyan * pow(revealEdge, 4.0) * 8.0;
        finalEmission += revealGlow;
      }

      gl_FragColor = vec4(gl_FragColor.rgb + finalEmission, gl_FragColor.a * shapeAlpha * edgeBlur);`
    );
  };
}

/* ============ the model (DRACO-compressed GLB) ============ */
let mainModel = null;
let mainModelMaterial = null;
let baseModelScale = 1.0;
let currentModelScale = 1.0;
let heroRevealed = false;
let mixer = null;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

modelTimer = window.setTimeout(() => { modelGiveUp = true; }, 8000);
loader.load(`${ASSET_BASE_URL}/model.glb`, (gltf) => {
  window.clearTimeout(modelTimer);
  if (disposed || modelGiveUp) {
    gltf.scene.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) disposeMaterial(child.material);
    });
    return;
  }
  const model = gltf.scene;

  // auto center + scale so max dimension becomes 5 units
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const scale = 5 / Math.max(size.x, size.y, size.z);
  baseModelScale = scale;
  currentModelScale = scale;
  model.scale.setScalar(scale);

  const scaledBox = new THREE.Box3().setFromObject(model);
  const center = scaledBox.getCenter(new THREE.Vector3());
  model.position.sub(center);

  model.position.set(0.1, -3.93, 4.17);
  model.rotation.set(-0.05026, -0.92781, -0.12566);

  model.traverse((child) => {
    if (!child.isMesh) return;
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0x010103, metalness: 0.9, roughness: 0.2, clearcoat: 1.0, clearcoatRoughness: 0.1,
      transparent: true, opacity: 0.95, side: THREE.DoubleSide
    });
    applyHolographicShader(baseMat);
    child.material = baseMat;
    child.frustumCulled = false;
    if (!mainModelMaterial) mainModelMaterial = baseMat;
  });

  model.visible = heroRevealed;
  scene.add(model);
  mainModel = model;

  if (gltf.animations.length > 0) {
    mixer = new THREE.AnimationMixer(model);
    gltf.animations.forEach(clip => mixer.clipAction(clip).play());
  }
}, undefined, (err) => {
  window.clearTimeout(modelTimer);
  modelGiveUp = true;
  console.error('model.glb failed to load', err);
});

camera.position.set(-1.8, -1.0, 6.5);
camera.lookAt(-1.8, 0.5, 0);
controls.target.set(-1.8, 0.5, 0);
controls.update();

/* ============ C. name particle system (canvas-sampled text) ============ */
const NAME_TEXT = 'TARUN';
const particleMat = new THREE.ShaderMaterial({
  uniforms: {
    time: shaderUniforms.time, uProgress: { value: 0.0 }, uScale: { value: 1.0 }, uShatterFade: { value: 0.0 },
    colorCyan: shaderUniforms.colorCyan, colorBlue: shaderUniforms.colorBlue,
    colorPeach: shaderUniforms.colorPeach, colorHotPink: shaderUniforms.colorHotPink
  },
  vertexShader: /* glsl */`
    uniform float time;
    uniform float uProgress;
    uniform float uScale;
    attribute vec3 aRandomPosition;
    attribute float aDelay;
    attribute float aIsAmbient;
    varying vec3 vLocalPosition;
    varying float vIsAmbient;

    void main() {
      vLocalPosition = position;
      vIsAmbient = aIsAmbient;

      float safeProgress = clamp(uProgress, 0.0, 1.0);
      float startThreshold = aDelay * 0.4;
      float particleProgress = clamp((safeProgress - startThreshold) / (1.0 - startThreshold), 0.0, 1.0);
      float rushEase = 1.0 - pow(1.0 - particleProgress, 4.0);

      float spin = (1.0 - particleProgress) * 10.0;
      float s = sin(spin);
      float c = cos(spin);

      vec3 spiraledPos = aRandomPosition;
      spiraledPos.x = aRandomPosition.x * c - aRandomPosition.z * s;
      spiraledPos.z = aRandomPosition.x * s + aRandomPosition.z * c;
      spiraledPos.z *= 0.15;
      spiraledPos.y = mix(spiraledPos.y, position.y, rushEase);

      vec3 currentPos = mix(spiraledPos, position, rushEase);

      float driftFactor = (aIsAmbient > 0.5) ? 1.0 : (1.0 - rushEase);
      if (driftFactor > 0.01) {
         currentPos.x += sin(time * 0.4 + aRandomPosition.y) * 1.5 * driftFactor;
         currentPos.y += cos(time * 0.3 + aRandomPosition.x) * 1.5 * driftFactor;
         currentPos.z += sin(time * 0.5 + aRandomPosition.z) * 1.5 * driftFactor;
      }

      vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
      float shatterBoost = mix(4.5, 1.0, rushEase);
      float baseSize = (aIsAmbient > 0.5 ? 40.0 : (16.0 * shatterBoost)) * uScale;
      gl_PointSize = clamp(baseSize / max(0.5, -mvPosition.z), 4.0, 120.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: /* glsl */`
    uniform float time;
    uniform float uProgress;
    uniform float uShatterFade;
    uniform vec3 colorCyan;
    uniform vec3 colorBlue;
    uniform vec3 colorPeach;
    uniform vec3 colorHotPink;
    varying vec3 vLocalPosition;
    varying float vIsAmbient;

    void main() {
      vec2 cxy = 2.0 * gl_PointCoord - 1.0;
      float r = dot(cxy, cxy);
      if (r > 1.0) discard;

      float dist = sqrt(r);
      float glow = smoothstep(1.0, 0.2, dist);

      float waveX = sin(time * 1.5) * 1.5;
      float waveY = cos(time * 1.2) * 0.8;

      float effX = vIsAmbient > 0.5 ? mod(vLocalPosition.x + time, 6.0) - 3.0 : vLocalPosition.x;
      float effY = vIsAmbient > 0.5 ? mod(vLocalPosition.y + time, 2.0) - 1.0 : vLocalPosition.y;

      float tX = smoothstep(-3.0, 3.0, effX + waveX);
      float tY = smoothstep(-1.0, 1.0, effY + waveY);

      vec3 leftColor = mix(colorBlue, colorCyan, tY);
      vec3 rightColor = mix(colorHotPink, colorPeach, tY);
      vec3 finalColor = mix(leftColor, rightColor, tX) * 1.4;

      float alphaMultiplier = vIsAmbient > 0.5 ? 1.0 : (1.0 - uShatterFade);
      float globalFadeIn = smoothstep(0.0, 0.15, uProgress);

      gl_FragColor = vec4(finalColor, glow * alphaMultiplier * globalFadeIn);
    }
  `,
  transparent: true, depthWrite: false, blending: THREE.NormalBlending
});

let logoParticles = null;

function buildNameParticles() {
  const fontFamily = getComputedStyle(document.body).fontFamily || 'sans-serif';
  const W = 450;
  const cv = document.createElement('canvas');
  const ctx = cv.getContext('2d');
  cv.width = W;
  ctx.font = `700 150px ${fontFamily}`;
  const metrics = ctx.measureText(NAME_TEXT);
  const scaleToFit = (W - 20) / metrics.width;
  const fontPx = Math.floor(150 * scaleToFit);
  cv.height = Math.round(fontPx * 1.35);
  ctx.font = `700 ${fontPx}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.fillText(NAME_TEXT, cv.width / 2, cv.height / 2);

  const data = ctx.getImageData(0, 0, cv.width, cv.height).data;
  const w = cv.width, h = cv.height;
  const alphaAt = (x, y) => (x < 0 || y < 0 || x >= w || y >= h) ? 0 : data[(y * w + x) * 4 + 3];

  const thickness = 0.25;
  const sidePoints = 3;
  const pts = [];
  const step = 2; // ponytail: sample every 2px, drop to 1 if the name reads too sparse
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (alphaAt(x, y) <= 128) continue;
      pts.push({ x, y, z: thickness / 2, isAmbient: 0 });
      pts.push({ x, y, z: -thickness / 2, isAmbient: 0 });
      const edge = alphaAt(x - step, y) < 128 || alphaAt(x + step, y) < 128
                || alphaAt(x, y - step) < 128 || alphaAt(x, y + step) < 128;
      if (edge) {
        for (let i = 0; i < sidePoints; i++) {
          pts.push({ x, y, z: -thickness / 2 + (thickness * (i + 1)) / (sidePoints + 1), isAmbient: 0 });
        }
      }
    }
  }

  const ambientCount = matchMedia('(max-width: 900px)').matches ? 1200 : 3500;
  for (let i = 0; i < ambientCount; i++) {
    pts.push({
      x: w / 2 + (Math.random() - 0.5) * w * 3.0,
      y: h / 2 + (Math.random() - 0.5) * h * 10.0,
      z: (Math.random() - 0.5) * 20.0,
      isAmbient: 1
    });
  }

  const logoScale = 5.7 / w;
  const count = pts.length;
  const position = new Float32Array(count * 3);
  const aRandomPosition = new Float32Array(count * 3);
  const aDelay = new Float32Array(count);
  const aIsAmbient = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const pt = pts[i];
    const jx = (Math.random() - 0.5) * 1.2;
    const jy = (Math.random() - 0.5) * 1.2;
    const jz = (Math.random() - 0.5) * 0.1;

    const tx = (pt.x + jx - w / 2) * logoScale;
    const ty = -(pt.y + jy - h / 2) * logoScale;
    const tz = pt.z + jz;
    position[i * 3] = tx; position[i * 3 + 1] = ty; position[i * 3 + 2] = tz;

    const angle = Math.random() * Math.PI * 2;
    const radius = 25 + Math.random() * 25;
    aRandomPosition[i * 3] = Math.cos(angle) * radius;
    aRandomPosition[i * 3 + 1] = (Math.random() - 0.5) * 45;
    aRandomPosition[i * 3 + 2] = Math.sin(angle) * radius;

    const distFromCenter = Math.min(1, Math.hypot(tx, ty) / 3.0);
    aDelay[i] = Math.random() * 0.5 + distFromCenter * 0.5;
    aIsAmbient[i] = pt.isAmbient;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(position, 3));
  geo.setAttribute('aRandomPosition', new THREE.BufferAttribute(aRandomPosition, 3));
  geo.setAttribute('aDelay', new THREE.BufferAttribute(aDelay, 1));
  geo.setAttribute('aIsAmbient', new THREE.BufferAttribute(aIsAmbient, 1));

  logoParticles = new THREE.Points(geo, particleMat);
  logoParticles.position.set(-0.6, -2.0, -3.0);
  logoParticles.frustumCulled = false;
  logoParticles.visible = false;
  scene.add(logoParticles);
}
// wait for the webfont so the sampled letterforms match the page
(document.fonts ? document.fonts.ready : Promise.resolve()).then(buildNameParticles);

/* ============ preloader blob ============ */
const preloaderPointsMat = new THREE.ShaderMaterial({
  uniforms: {
    time: shaderUniforms.time, colorCyan: shaderUniforms.colorCyan, colorPurple: shaderUniforms.colorPurple,
    colorBlue: shaderUniforms.colorBlue, colorPeach: shaderUniforms.colorPeach, colorHotPink: shaderUniforms.colorHotPink,
    uShatter: { value: 0.0 }
  },
  vertexShader: /* glsl */`
    uniform float uShatter;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      pos *= (1.0 + uShatter * 2.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: /* glsl */`
    uniform float time;
    uniform float uShatter;
    uniform vec3 colorCyan;
    uniform vec3 colorPurple;
    uniform vec3 colorBlue;
    uniform vec3 colorPeach;
    uniform vec3 colorHotPink;
    varying vec2 vUv;

    void main() {
      vec2 center = vec2(0.5, 0.5);
      vec2 st = vUv - center;
      float angle = atan(st.y, st.x);
      float radius = length(st);

      float wobble = sin(angle * 3.0 + time * 1.5) * 0.03 + cos(angle * 2.0 - time) * 0.04;
      float maxRadius = 0.35 + wobble;
      float currentRadius = maxRadius * (1.0 + uShatter * 1.5);

      float alpha = smoothstep(currentRadius + 0.08, currentRadius - 0.02, radius);
      float shatterNoise = fract(sin(dot(vUv * 10.0, vec2(12.9898, 78.233))) * 43758.5453);
      alpha -= (shatterNoise * uShatter * 2.0);
      alpha *= (1.0 - uShatter);
      if (alpha <= 0.01) discard;

      vec2 p = vUv * 2.0 - 1.0;
      float wave1 = sin(p.x * 2.0 - time * 1.0);
      float wave2 = cos(p.y * 1.5 + time * 0.8);
      float combinedWave = smoothstep(-0.5, 0.5, (wave1 + wave2)/2.0);
      float wavePeach = sin(p.y * 2.0 - p.x * 1.0 + time * 1.2) * 0.5 + 0.5;

      vec3 mixColor = mix(colorBlue, colorCyan, combinedWave);
      vec3 pinkTransition = mix(mixColor, colorHotPink, smoothstep(0.2, 0.8, wavePeach));
      mixColor = mix(pinkTransition, colorPeach, smoothstep(0.5, 0.95, wavePeach));
      mixColor = mix(mixColor, colorPurple, smoothstep(0.2, 0.45, radius));
      mixColor = mix(mixColor, vec3(1.0), 0.35);

      gl_FragColor = vec4(mixColor, alpha);
    }
  `,
  transparent: true, depthWrite: false
});
const preloaderPoints = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), preloaderPointsMat);
preloaderPoints.position.set(-1.8, -0.25, 4.5);
preloaderPoints.lookAt(-1.8, -1.0, 6.5);
scene.add(preloaderPoints);

/* ============ odometer ============ */
const odoNumbers = byId('odometer-numbers');
odoNumbers.innerHTML = Array.from({ length: 101 }, (_, i) =>
  `<div style="height:4rem;line-height:4rem;text-align:center;">${String(i).padStart(3, '0')}</div>`
).join('');

let preloaderDone = false;
let preloaderCurrentPercent = 0;
let preloaderTargetPercent = 0;
let preloaderShatter = 0.0;

const loaderSteps = [25, 50, 75, 100];
let loaderStepIndex = 0;
function advanceLoader() {
  if (loaderStepIndex >= loaderSteps.length) return;
  preloaderTargetPercent = loaderSteps[loaderStepIndex];
  loaderStepIndex++;
  setTimeout(advanceLoader, 300);
}

/* ============ title splitting ============ */
function splitNode(node) {
  const frag = document.createDocumentFragment();
  node.childNodes.forEach(child => {
    if (child.nodeType === Node.TEXT_NODE) {
      [...child.textContent].forEach(ch => {
        if (ch === ' ' || ch === ' ') {
          frag.appendChild(document.createTextNode(ch));
        } else {
          const mask = document.createElement('span');
          mask.className = 'char-mask';
          const inner = document.createElement('span');
          inner.className = 'hero-char';
          inner.textContent = ch;
          mask.appendChild(inner);
          frag.appendChild(mask);
        }
      });
    } else if (child.nodeName === 'BR') {
      frag.appendChild(child.cloneNode());
    } else {
      const clone = child.cloneNode(false);
      clone.appendChild(splitNode(child));
      frag.appendChild(clone);
    }
  });
  return frag;
}

function initTitles() {
  const targets = [byId('animated-hero-title'), ...root.querySelectorAll('.animated-title')];
  new Set(targets).forEach(el => {
    if (!el) return;
    const split = splitNode(el);
    el.innerHTML = '';
    el.appendChild(split);
  });

  titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.hero-char').forEach((c, i) => setTimeout(() => c.classList.add('revealed'), i * 10));
      titleObserver.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  root.querySelectorAll('.animated-title.flow-title').forEach(el => titleObserver.observe(el));
}
initTitles();
applyPreloaderSkip();

const _revealedOnce = new Set();
function triggerTextReveal(selector) {
  if (_revealedOnce.has(selector)) return;
  const el = root.querySelector(selector);
  if (!el) return;
  _revealedOnce.add(selector);
  el.querySelectorAll('.hero-char').forEach((c, i) => setTimeout(() => c.classList.add('revealed'), i * 10));
}

/* ============ scroll progress ============ */
let scrollProgress = 0;
let _ratio = window.innerWidth / 1200;
let responsiveScale = _ratio <= 1.0 ? _ratio : 1.0 + (_ratio - 1.0) * 0.4;

window.addEventListener('scroll', () => {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const pauseScroll = window.innerHeight * 1;
  const animationMaxScroll = Math.max(1, maxScroll - pauseScroll);
  scrollProgress = Math.max(0, Math.min(window.scrollY / animationMaxScroll, 1.0));
}, { passive: true, signal: ac.signal });

window.addEventListener('mousemove', (event) => {
  targetMouse.x = event.clientX / window.innerWidth;
  targetMouse.y = 1.0 - (event.clientY / window.innerHeight);
}, { signal: ac.signal });

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  rendererBg.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
  shaderUniforms.resolution.value.set(window.innerWidth, window.innerHeight);
  const _newRatio = window.innerWidth / 1200;
  responsiveScale = _newRatio <= 1.0 ? _newRatio : 1.0 + (_newRatio - 1.0) * 0.4;
}, { signal: ac.signal });

/* ============ flying words driver ============ */
function updateWordAnimation(el, p, start, end, stopAtCenter = false) {
  if (!el) return;
  if (p <= start) { el.style.opacity = '0'; return; }
  let localP = (p - start) / (end - start);
  if (!stopAtCenter && localP >= 1.0) { el.style.opacity = '0'; return; }
  let xOff, yOff, rotY, zOff;
  if (stopAtCenter && localP > 1.0) {
    const extraP = Math.min(1.0, (localP - 1.0) / 1.25);
    const easeIn = extraP * extraP;
    xOff = 0; yOff = 0 - (easeIn * 100); rotY = 0; zOff = -800;
    el.style.opacity = '1';
    if (el.children.length > 0) {
      const speedMultipliers = [0.8, 1.4, 0.5, 1.7, 0.9, 1.2];
      for (let i = 0; i < el.children.length; i++) {
        const child = el.children[i];
        const speed = speedMultipliers[i % speedMultipliers.length];
        const extraY = -(easeIn * 60 * speed);
        const blurAmount = easeIn * 24 * speed;
        child.style.transform = `translate3d(0, ${extraY}vh, 0)`;
        child.style.opacity = '1';
        child.style.filter = blurAmount > 0.1 ? `blur(${blurAmount}px)` : 'none';
      }
    }
  } else {
    const sineInOut = (t) => 0.5 - Math.cos(t * Math.PI) / 2;
    if (stopAtCenter) {
      xOff = 1400 - sineInOut(localP) * 1400;
      const yEaseOut = 1 - Math.pow(1 - localP, 3);
      yOff = 80 - (yEaseOut * 80);
    } else {
      xOff = 1400 - sineInOut(localP) * 3100;
      const yProgress = Math.min(1.0, localP / 0.55);
      const yEaseOut = 1 - Math.pow(1 - yProgress, 3);
      yOff = 80 - (yEaseOut * 80);
    }
    rotY = -(xOff / 800) * 60;
    zOff = -800;
    if (el.children.length > 0) {
      const totalChars = el.children.length;
      for (let i = 0; i < totalChars; i++) {
        const child = el.children[i];
        const delay = (i / totalChars) * 0.25;
        const flyInDuration = 0.35;
        let childP = Math.max(0, Math.min(1.0, (localP - delay) / flyInDuration));
        let childOpacity = Math.min(1.0, childP / 0.5);
        const yEase = 1 - Math.pow(1 - childP, 3);
        let childY = 60 - (yEase * 60);
        let childBlur = 24 - (yEase * 24);
        if (!stopAtCenter) {
          const outDelay = (i / totalChars) * 0.15;
          let outP = Math.max(0, Math.min(1.0, (localP - (0.50 + outDelay)) / 0.25));
          if (outP > 0) {
            const outEase = outP * outP;
            childY -= outEase * 60;
            childBlur += outEase * 24;
            childOpacity = Math.min(childOpacity, 1.0 - outP);
          }
        }
        child.style.transform = `translate3d(0, ${childY}vh, 0)`;
        child.style.opacity = childOpacity.toString();
        child.style.filter = childBlur > 0.1 ? `blur(${childBlur}px)` : 'none';
      }
      el.style.opacity = '1';
    }
  }
  el.style.transform = `translate3d(calc(-50% + ${xOff}px), calc(-50% + ${yOff}vh), ${zOff}px) rotateY(${rotY}deg)`;
}

/* ============ DOM refs ============ */
const word1 = byId('word1');
const word2 = byId('word2');
const word3 = byId('word3');
const glassContainer = byId('glass-container');
const glassGradient = byId('glass-gradient');
const phase4Container = byId('phase4-container');
const phase5Container = byId('phase5-container');
const phase6Container = byId('phase6-container');
const phase6Footer = byId('phase6-footer');

const snapLerp = (current, target, speed) => {
  if (Math.abs(target - current) < 0.0001) return target;
  return THREE.MathUtils.lerp(current, target, speed);
};

/* ============ animation loop ============ */
let revealStartTime = 0;

function animate(time) {
  if (disposed) return;
  rafId = requestAnimationFrame(animate);
  if (time) lenis.raf(time);
  const delta = clock.getDelta();
  shaderUniforms.time.value += delta;
  shaderUniforms.mouse.value.lerp(targetMouse, delta * 3.0);

  /* ---- preloader ---- */
  if (!preloaderDone) {
    if (preloaderCurrentPercent < preloaderTargetPercent) {
      preloaderCurrentPercent = Math.min(preloaderTargetPercent, preloaderCurrentPercent + delta * 180);
      odoNumbers.style.transform = `translateY(-${preloaderCurrentPercent * 4}rem)`;
    }
    if (preloaderCurrentPercent >= 100) {
      preloaderShatter += delta * 2.0;
      preloaderPointsMat.uniforms.uShatter.value = Math.pow(preloaderShatter, 3.0);
      if (preloaderShatter > 1.0) {
        preloaderDone = true;
        heroRevealed = true;
        try { sessionStorage.setItem('tc-preloader-seen', '1'); } catch (e) {}
        preloaderPoints.visible = false;
        if (mainModel) mainModel.visible = true;
        byId('preloader').style.opacity = '0';
        root.querySelectorAll('.preload-hidden').forEach(el => el.classList.remove('preload-hidden'));
        const chars = root.querySelectorAll('#animated-hero-title .hero-char');
        setTimeout(() => {
          chars.forEach((char, index) => setTimeout(() => char.classList.add('revealed'), index * 25));
        }, 150);
      }
    }
    window.scrollTo(0, 0);
    scrollProgress = 0;
  }

  // hold the carve-in until the GLB is actually in the scene
  if (preloaderDone && mainModel && shaderUniforms.uRevealProgress.value < 0.999) {
    if (!revealStartTime) revealStartTime = shaderUniforms.time.value + 0.5;
    const elapsed = shaderUniforms.time.value - revealStartTime;
    if (elapsed > 0) {
      const progress = Math.min(1.0, elapsed / 2.3);
      shaderUniforms.uRevealProgress.value = 1 - Math.pow(1 - progress, 3);
    }
  }

  /* ---- phase windows ---- */
  const transitionProgress  = Math.min(1.0, scrollProgress / 0.12);
  const phase3Progress      = Math.max(0, Math.min(1.0, (scrollProgress - 0.40) / 0.14));
  const phase4Progress      = Math.max(0, Math.min(1.0, (scrollProgress - 0.54) / 0.14));
  const phase5Progress      = Math.max(0, Math.min(1.0, (scrollProgress - 0.68) / 0.12));
  const modelFlyInProgress  = Math.max(0, Math.min(1.0, (scrollProgress - 0.86) / 0.14));
  const logoShatterProgress = modelFlyInProgress;

  /* ---- camera ---- */
  const targetCamX   = THREE.MathUtils.lerp(-1.8, -0.6, transitionProgress);
  const targetFocusX = THREE.MathUtils.lerp(-1.8, -0.6, transitionProgress);
  const targetCamY   = THREE.MathUtils.lerp(-1.0, -2.0, transitionProgress);
  const targetFocusY = THREE.MathUtils.lerp(0.5, -2.0, transitionProgress);
  const phase3CamZ   = THREE.MathUtils.lerp(7.5, 7.15, phase3Progress);
  const targetCamZ   = THREE.MathUtils.lerp(6.5, phase3CamZ, transitionProgress);
  const finalCamZ    = THREE.MathUtils.lerp(targetCamZ, 0.5, phase5Progress);
  const lerpSpeed = Math.min(1, delta * 6.0);

  camera.position.x = snapLerp(camera.position.x, targetCamX, lerpSpeed);
  camera.position.y = snapLerp(camera.position.y, targetCamY, lerpSpeed);
  camera.position.z = snapLerp(camera.position.z, finalCamZ, lerpSpeed);
  controls.target.x = snapLerp(controls.target.x, targetFocusX, lerpSpeed);
  controls.target.y = snapLerp(controls.target.y, targetFocusY, lerpSpeed);

  const pointerX = targetMouse.x * 2 - 1, pointerY = targetMouse.y * 2 - 1;

  /* ---- model ---- */
  if (mainModel) {
    const baseModelX = THREE.MathUtils.lerp(-0.6, -0.5, transitionProgress);
    const baseModelY = THREE.MathUtils.lerp(-3.93, -6.15, transitionProgress);
    const baseModelZ = THREE.MathUtils.lerp(4.17, 7.0, transitionProgress);
    const targetModelX = THREE.MathUtils.lerp(baseModelX, guiParams.phase4X, phase4Progress);
    const targetModelY = THREE.MathUtils.lerp(baseModelY, guiParams.phase4Y, phase4Progress);
    const targetModelZ = THREE.MathUtils.lerp(baseModelZ, guiParams.phase4Z, phase4Progress);
    const p6Ease = 1.0 - Math.pow(1.0 - modelFlyInProgress, 3);
    const p6ModelX = THREE.MathUtils.lerp(targetModelX, -0.4, p6Ease);
    const p6ModelY = THREE.MathUtils.lerp(targetModelY, -5.2, p6Ease);
    const p6ModelZ = THREE.MathUtils.lerp(targetModelZ, -1.0, p6Ease);

    const mouseRotX = pointerY * 0.05, mouseRotY = pointerX * 0.10;
    const rotProgress = Math.max(0, Math.min(1.0, (scrollProgress - 0.12) / 0.28));

    const targetModelRotX = THREE.MathUtils.lerp(-0.05026, -0.2, transitionProgress);
    const finalRotX = THREE.MathUtils.lerp(targetModelRotX, guiParams.phase4RotX, phase4Progress);
    const p6RotX = THREE.MathUtils.lerp(finalRotX, 0.0 + mouseRotX, p6Ease);

    const initialRotY = -0.92781;
    const transitionRotY = THREE.MathUtils.lerp(initialRotY, initialRotY + Math.PI, transitionProgress);
    const baseRotY = THREE.MathUtils.lerp(transitionRotY, Math.PI * 2, rotProgress);
    const finalRotY = THREE.MathUtils.lerp(baseRotY, guiParams.phase4RotY, phase4Progress);
    const p6RotY = THREE.MathUtils.lerp(finalRotY, 0.0 + mouseRotY, p6Ease);

    const targetModelRotZ = THREE.MathUtils.lerp(-0.12566, 0.0, transitionProgress);
    const finalRotZ = THREE.MathUtils.lerp(targetModelRotZ, guiParams.phase4RotZ, phase4Progress);
    const p6RotZ = THREE.MathUtils.lerp(finalRotZ, 0.0, p6Ease);

    mainModel.position.x = snapLerp(mainModel.position.x, p6ModelX, lerpSpeed);
    mainModel.position.y = snapLerp(mainModel.position.y, p6ModelY, lerpSpeed);
    mainModel.position.z = snapLerp(mainModel.position.z, p6ModelZ, lerpSpeed);
    mainModel.rotation.x = snapLerp(mainModel.rotation.x, p6RotX, lerpSpeed);
    mainModel.rotation.y = snapLerp(mainModel.rotation.y, p6RotY, lerpSpeed);
    mainModel.rotation.z = snapLerp(mainModel.rotation.z, p6RotZ, lerpSpeed);

    const finalScale = baseModelScale * guiParams.phase4Scale;
    const targetScale = THREE.MathUtils.lerp(baseModelScale, finalScale, phase4Progress);
    currentModelScale = snapLerp(currentModelScale, targetScale, lerpSpeed);
    mainModel.scale.setScalar(currentModelScale);

    let targetOpacity = 0.95;
    if (modelFlyInProgress > 0) targetOpacity = THREE.MathUtils.lerp(0.0, 0.95, Math.min(1.0, modelFlyInProgress * 2.0));
    else if (phase5Progress > 0) targetOpacity = THREE.MathUtils.lerp(0.95, 0.0, Math.min(1.0, phase5Progress * 2.0));
    if (mainModelMaterial) mainModelMaterial.opacity = targetOpacity;

    if (shaderUniforms.uRevealProgress.value < 0.999) {
      mainModel.getWorldPosition(_revealVec);
      _revealVec.project(camera);
      shaderUniforms.uRevealOrigin.value.set(
        (_revealVec.x * 0.5 + 0.5) * (window.innerWidth / window.innerHeight),
        _revealVec.y * 0.5 + 0.5
      );
    }
  }

  /* ---- name particles ---- */
  if (logoParticles) {
    if (phase5Progress > 0) {
      logoParticles.visible = true;
      let targetProgress = phase5Progress;
      const targetFade = 0;
      if (logoShatterProgress > 0) {
        const explodeEase = THREE.MathUtils.smoothstep(logoShatterProgress, 0, 1);
        targetProgress = 1 - Math.pow(explodeEase, 0.3);
      }
      const u = particleMat.uniforms;
      u.uProgress.value = snapLerp(u.uProgress.value, targetProgress, lerpSpeed * 1.5);
      u.uShatterFade.value = snapLerp(u.uShatterFade.value, targetFade, lerpSpeed * 1.5);

      logoParticles.rotation.x = pointerY * 0.15 * phase5Progress;
      logoParticles.rotation.y = pointerX * 0.25 * phase5Progress;

      const p6Ease = THREE.MathUtils.smoothstep(modelFlyInProgress, 0, 1);
      const targetScale = THREE.MathUtils.lerp(1.0, 1.4, p6Ease) * responsiveScale;
      const s = snapLerp(logoParticles.scale.x, targetScale, lerpSpeed);
      logoParticles.scale.setScalar(s);
      u.uScale.value = s;
    } else {
      logoParticles.visible = false;
      particleMat.uniforms.uProgress.value = 0;
      logoParticles.rotation.set(0, 0, 0);
      logoParticles.scale.setScalar(1);
      particleMat.uniforms.uScale.value = 1;
    }
  }

  /* ---- flying words ---- */
  updateWordAnimation(word1, scrollProgress, 0.14, 0.26);
  updateWordAnimation(word2, scrollProgress, 0.22, 0.34);
  updateWordAnimation(word3, scrollProgress, 0.30, 0.40, true);

  /* ---- glass stats panel ---- */
  if (scrollProgress <= 0.54) {
    const easeIn = phase3Progress * phase3Progress;
    const glassY = 100 - (easeIn * 100);
    glassContainer.style.transform = `translateY(${glassY}vh)`;
    if (glassY < 60) triggerTextReveal('#phase3-title');
    const currentScale = 0.65 + (0.35 * phase3Progress);
    glassGradient.style.transform = `translate(-50%, -50%) scale(${currentScale})`;
    glassGradient.style.borderRadius = `${phase3Progress * 24}px`;
  } else {
    const easeOut = 1 - Math.pow(1 - phase4Progress, 3);
    glassContainer.style.transform = `translateY(${-(easeOut * 100)}vh)`;
    glassGradient.style.transform = `translate(-50%, -50%) scale(1)`;
    glassGradient.style.borderRadius = `24px`;
  }

  /* ---- phase 4 ---- */
  if (phase4Progress > 0 && phase4Progress < 1) {
    let op = 1;
    let ty = 0;
    if (phase4Progress < 0.2) { op = phase4Progress / 0.2; ty = 50 * (1 - op); }
    else if (phase4Progress > 0.8) { const p = (phase4Progress - 0.8) / 0.2; op = 1 - p; ty = -50 * p; }
    phase4Container.style.opacity = op.toString();
    phase4Container.style.transform = `translateY(${ty}px)`;
    phase4Container.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
    if (op > 0.7) triggerTextReveal('#phase4-title');
  } else {
    phase4Container.style.opacity = '0';
    phase4Container.style.pointerEvents = 'none';
  }

  /* ---- phase 5 ---- */
  {
    let op = 0;
    const sp = scrollProgress;
    if (sp > 0.74 && sp <= 0.78) op = (sp - 0.74) / 0.04;
    else if (sp > 0.78 && sp <= 0.82) op = 1;
    else if (sp > 0.82 && sp < 0.86) op = 1 - (sp - 0.82) / 0.04;
    phase5Container.style.opacity = op.toString();
    if (op > 0.7) { triggerTextReveal('#phase5-title-1'); triggerTextReveal('#phase5-title-2'); }
  }

  /* ---- phase 6 + footer ---- */
  {
    const op = Math.max(0, Math.min(1, (scrollProgress - 0.86) / 0.14));
    phase6Container.style.opacity = op.toString();
    phase6Container.style.transform = `scale(${0.95 + 0.05 * op})`;
    const footerY = 100 * (1 - (1 - Math.pow(1 - op, 3)));
    phase6Footer.style.transform = `translateY(${footerY}vh)`;
    if (op > 0.7) triggerTextReveal('#phase6-title');
  }

  if (mixer) mixer.update(delta);
  controls.update();
  rendererBg.render(bgScene, camera);
  renderer.render(scene, camera);
}
  rafId = requestAnimationFrame(animate);

  if (!skipPreloader) setTimeout(advanceLoader, 200);

  return () => {
    disposed = true;
    modelGiveUp = true;
    window.clearTimeout(modelTimer);
    ac.abort();
    cancelAnimationFrame(rafId);
    pending.forEach((id) => window.clearTimeout(id));
    titleObserver?.disconnect();
    try { lenis.destroy(); } catch (e) {}
    try { controls.dispose(); } catch (e) {}
    try { mixer?.stopAllAction(); } catch (e) {}
    try { dracoLoader.dispose(); } catch (e) {}
    try { disposeScene(scene); } catch (e) {}
    try { disposeScene(bgScene); } catch (e) {}
    try { renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); } catch (e) {}
    try { rendererBg.dispose(); rendererBg.forceContextLoss(); rendererBg.domElement.remove(); } catch (e) {}
  };
}
