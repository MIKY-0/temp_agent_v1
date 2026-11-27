import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.querySelector('#scene');
const toggle = document.querySelector('#toggle-rotation');
const reset = document.querySelector('#reset-view');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
camera.position.set(0, 0.4, 7);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 11;
controls.saveState();

scene.add(new THREE.HemisphereLight(0xd3ffff, 0x163047, 2.8));
const keyLight = new THREE.DirectionalLight(0xffffff, 4);
keyLight.position.set(3, 4, 5);
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0x52b6ff, 3);
rimLight.position.set(-4, 1, -2);
scene.add(rimLight);

const shape = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.05, 0.32, 160, 24),
    new THREE.MeshStandardMaterial({ color: 0x42dfbe, metalness: 0.35, roughness: 0.24 })
);
shape.rotation.x = 0.25;
scene.add(shape);

let rotating = !reducedMotion.matches;
function updateButton() {
    toggle.textContent = rotating ? '회전 멈추기' : '회전 시작하기';
    toggle.setAttribute('aria-pressed', String(!rotating));
}
toggle.addEventListener('click', () => {
    rotating = !rotating;
    updateButton();
});
reset.addEventListener('click', () => {
    controls.reset();
    shape.rotation.set(0.25, 0, 0);
});
reducedMotion.addEventListener('change', (event) => {
    rotating = !event.matches;
    updateButton();
});

const resizeObserver = new ResizeObserver(() => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});
resizeObserver.observe(container);

let previousTime;
renderer.setAnimationLoop((time) => {
    const delta = previousTime === undefined ? 0 : Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    if (rotating) shape.rotation.y += delta * 0.32;
    controls.update();
    renderer.render(scene, camera);
});

toggle.disabled = false;
reset.disabled = false;
updateButton();
document.querySelector('#scene-status').hidden = true;
