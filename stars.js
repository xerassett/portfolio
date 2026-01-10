const container = document.getElementById('container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000010);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1500);
camera.position.set(0, 0, 850);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.35));
const pl = new THREE.PointLight(0xffffff, 0.8);
pl.position.set(300, 300, 300);
scene.add(pl);

let whiteStars;
(function createWhiteStars() {
  const geo = new THREE.BufferGeometry();
  const count = 5000;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 1600;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 1200;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 1200;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const tex = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
  const mat = new THREE.PointsMaterial({ size: 3.5, map: tex, transparent: true, blending: THREE.AdditiveBlending, color: 0xffffff, depthWrite: false });
  whiteStars = new THREE.Points(geo, mat);
  scene.add(whiteStars);
})();

function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.00012;
  renderer.render(scene, camera);
}
animate();