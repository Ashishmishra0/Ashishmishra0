const SCENE_URL = "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

const CONFIG = {
  dumbbell: { fov: 30, cam: [0.35, 0.5, 6.7], look: [0, 0, 0], floor: -1.22, spin: 0.0045, tilt: 0.16 },
  mark: { fov: 34, cam: [0.2, 0.35, 5.1], look: [0, 0, 0], floor: -1.5, spin: 0.006, tilt: 0.28 },
  kettlebell: { fov: 32, cam: [0.85, 0.48, 4.7], look: [0, 0.02, 0], floor: -1.48, spin: 0.0035, tilt: 0.1 },
};

let shadowMap;

function metal(THREE, color, roughness, metalness, emissive = 0x000000, emissiveIntensity = 0) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
    emissive,
    emissiveIntensity,
  });
}

function shadowTexture(THREE) {
  if (shadowMap) return shadowMap;
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(64, 64, 8, 64, 64, 64);
  gradient.addColorStop(0, "rgba(0,0,0,0.55)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  shadowMap = new THREE.CanvasTexture(canvas);
  return shadowMap;
}

function studioEnvironment(THREE, renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new THREE.Scene();
  room.background = new THREE.Color(0x14161a);
  const glow = new THREE.SphereGeometry(0.6, 16, 16);
  const lights = [
    [0xfff7ea, 6, 4, 4],
    [0xd6ff3f, -6, 2, -3],
    [0xff4d1c, 3, -3, 5],
    [0x9eb6ff, -3, 5, -6],
  ];
  lights.forEach(([color, x, y, z]) => {
    const bulb = new THREE.Mesh(glow, new THREE.MeshBasicMaterial({ color }));
    bulb.position.set(x, y, z);
    room.add(bulb);
  });
  const texture = pmrem.fromScene(room, 0.04).texture;
  pmrem.dispose();
  return texture;
}

function buildDumbbell(THREE, root) {
  const iron = metal(THREE, 0x16171b, 0.32, 0.94);
  const steel = metal(THREE, 0xd7dde6, 0.16, 1);
  const gripMat = metal(THREE, 0x2c2e33, 0.75, 0.28);
  const lime = metal(THREE, 0xd6ff3f, 0.28, 0.45, 0x6d8018, 0.45);
  const plates = [];

  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.072, 3.35, 40), steel);
  bar.rotation.z = Math.PI / 2;
  root.add(bar);

  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.088, 0.088, 0.84, 28), gripMat);
  grip.rotation.z = Math.PI / 2;
  root.add(grip);

  for (let i = -3; i <= 3; i += 1) {
    const knurl = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.006, 8, 28), steel);
    knurl.rotation.y = Math.PI / 2;
    knurl.position.x = i * 0.1;
    root.add(knurl);
  }

  const specs = [
    { radius: 0.8, thickness: 0.14, x: 1.02 },
    { radius: 0.62, thickness: 0.11, x: 1.22 },
    { radius: 0.46, thickness: 0.09, x: 1.38 },
  ];

  [-1, 1].forEach((side) => {
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.09, 28), steel);
    collar.rotation.z = Math.PI / 2;
    collar.position.x = side * 0.74;
    root.add(collar);

    specs.forEach((spec) => {
      const plate = new THREE.Mesh(
        new THREE.CylinderGeometry(spec.radius, spec.radius, spec.thickness, 64),
        iron,
      );
      plate.rotation.z = Math.PI / 2;
      plate.position.x = side * spec.x;
      plate.userData.kind = "plate";
      root.add(plate);
      plates.push(plate);

      const edge = new THREE.Mesh(new THREE.TorusGeometry(spec.radius, 0.012, 10, 64), lime);
      edge.rotation.y = Math.PI / 2;
      edge.position.x = side * (spec.x + spec.thickness * 0.52);
      edge.userData.kind = "ring";
      root.add(edge);
      plates.push(edge);

      const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, spec.thickness + 0.03, 24),
        steel,
      );
      hub.rotation.z = Math.PI / 2;
      hub.position.x = side * spec.x;
      hub.userData.kind = "plate";
      root.add(hub);
      plates.push(hub);
    });
  });

  root.userData.plates = plates;
}

function buildMark(THREE, root) {
  const materials = [
    metal(THREE, 0xd6ff3f, 0.22, 0.62, 0x738418, 0.5),
    metal(THREE, 0xe6ebf2, 0.15, 1),
    metal(THREE, 0xff4d1c, 0.3, 0.72, 0x7a240e, 0.4),
  ];
  materials.forEach((material, index) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.105, 28, 96), material);
    ring.rotation.x = Math.PI / 2.5;
    ring.rotation.y = (index * Math.PI) / 3;
    root.add(ring);
  });
}

function buildKettlebell(THREE, root) {
  const iron = metal(THREE, 0x17181c, 0.3, 0.92);
  const steel = metal(THREE, 0xd5dbe3, 0.18, 1);
  const lime = metal(THREE, 0xd6ff3f, 0.25, 0.5, 0x6a7c16, 0.4);

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.96, 64, 48), iron);
  body.scale.set(1.06, 0.9, 1.06);
  body.position.y = 0.02;
  root.add(body);

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.74, 0.34, 48), iron);
  base.position.y = -0.74;
  root.add(base);

  const band = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.022, 12, 64), lime);
  band.rotation.x = Math.PI / 2;
  band.position.y = -0.18;
  root.add(band);

  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.072, 20, 64, Math.PI), steel);
  handle.position.y = 0.92;
  root.add(handle);

  [-0.4, 0.4].forEach((x) => {
    const shoulder = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.42, 18), steel);
    shoulder.position.set(x, 0.7, 0);
    root.add(shoulder);
  });
}

function applyLoad(root, scale) {
  root.userData.plates?.forEach((mesh) => {
    if (mesh.userData.kind === "plate") mesh.scale.set(scale, 1, scale);
    else mesh.scale.set(scale, scale, 1);
  });
}

function addFloor(THREE, scene, y) {
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(2.35, 64),
    new THREE.MeshStandardMaterial({ color: 0x101114, metalness: 0.72, roughness: 0.38 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = y;
  scene.add(floor);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(1.45, 40),
    new THREE.MeshBasicMaterial({ map: shadowTexture(THREE), transparent: true, depthWrite: false }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = y + 0.015;
  scene.add(shadow);
}

function mount(THREE, canvas) {
  const kind = canvas.dataset.scene;
  const config = CONFIG[kind];
  const builder = { dumbbell: buildDumbbell, mark: buildMark, kettlebell: buildKettlebell }[kind];
  if (!config || !builder) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;

  const scene = new THREE.Scene();
  scene.environment = studioEnvironment(THREE, renderer);

  const camera = new THREE.PerspectiveCamera(config.fov, 1, 0.1, 50);
  camera.position.set(...config.cam);
  camera.lookAt(...config.look);

  scene.add(new THREE.HemisphereLight(0xf4f7fb, 0x1a120c, 0.55));
  const key = new THREE.DirectionalLight(0xfff4e5, 2.6);
  key.position.set(4.5, 6, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xd6ff3f, 2.4);
  rim.position.set(-6, 2.2, -3);
  scene.add(rim);
  const heat = new THREE.PointLight(0xff4d1c, 12, 14);
  heat.position.set(1.6, -1.2, 3.2);
  scene.add(heat);

  addFloor(THREE, scene, config.floor);

  const root = new THREE.Group();
  root.rotation.order = "YXZ";
  scene.add(root);
  builder(THREE, root);

  let rotX = config.tilt;
  let rotY = kind === "kettlebell" ? -0.55 : 0.75;
  let velX = 0;
  let velY = 0;
  let dragging = false;
  let hoverX = 0;
  let hoverY = 0;
  let lastX = 0;
  let lastY = 0;
  let load = 1;
  let loadTarget = 1;
  let swing = 0;
  let running = true;

  const stage = canvas.closest(".stage");
  const block = canvas.closest(".stage-block");
  const status = document.querySelector("#load-status");
  const labels = { light: "Light plates on the bar.", standard: "Standard plates on the bar.", heavy: "Heavy plates on the bar." };

  block?.querySelectorAll("[data-load]").forEach((button) => {
    button.addEventListener("click", () => {
      loadTarget = { light: 0.72, standard: 1, heavy: 1.22 }[button.dataset.load] ?? 1;
      block.querySelectorAll("[data-load]").forEach((item) => {
        const on = item === button;
        item.classList.toggle("is-active", on);
        item.setAttribute("aria-pressed", String(on));
      });
      if (status) status.textContent = labels[button.dataset.load] || "Plates updated.";
    });
  });

  block?.querySelector("[data-swing]")?.addEventListener("click", () => {
    swing = 1;
  });

  function resize() {
    const parent = canvas.parentElement;
    const width = parent.clientWidth || 1;
    const height = parent.clientHeight || 1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas.parentElement);

  canvas.addEventListener("pointerdown", (event) => {
    dragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    if (!dragging) {
      hoverX = (event.clientX - rect.left) / rect.width - 0.5;
      hoverY = (event.clientY - rect.top) / rect.height - 0.5;
      return;
    }
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    lastX = event.clientX;
    lastY = event.clientY;
    velY = dx * 0.01;
    velX = dy * 0.01;
    rotY += velY;
    rotX += velX;
  });
  const release = () => {
    dragging = false;
  };
  canvas.addEventListener("pointerup", release);
  canvas.addEventListener("pointercancel", release);
  canvas.addEventListener("pointerleave", () => {
    if (!dragging) {
      hoverX = 0;
      hoverY = 0;
    }
  });
  canvas.addEventListener("keydown", (event) => {
    const step = event.shiftKey ? 0.28 : 0.14;
    if (event.key === "ArrowLeft") rotY -= step;
    else if (event.key === "ArrowRight") rotY += step;
    else if (event.key === "ArrowUp") rotX -= step;
    else if (event.key === "ArrowDown") rotX += step;
    else return;
    event.preventDefault();
  });

  const visibility = new IntersectionObserver(([entry]) => {
    running = entry.isIntersecting;
  });
  visibility.observe(canvas);

  const clock = new THREE.Clock();
  function frame() {
    requestAnimationFrame(frame);
    if (!running || document.hidden) return;
    const elapsed = clock.getElapsedTime();
    if (!dragging) {
      velX *= 0.92;
      velY *= 0.92;
      rotY += (reduce ? 0 : config.spin) + velY;
      rotX += velX;
      rotX += (config.tilt - rotX) * 0.02;
    }
    const tiltLimit = Math.max(-0.75, Math.min(0.75, rotX + (dragging ? 0 : hoverY * 0.28)));
    root.rotation.y = rotY + (dragging ? 0 : hoverX * 0.4);
    root.rotation.x = tiltLimit;
    if (swing > 0.01) {
      root.rotation.z = Math.sin(elapsed * 9) * swing * 0.85;
      swing *= 0.965;
    } else {
      root.rotation.z = 0;
      swing = 0;
    }
    if (!reduce) root.position.y = Math.sin(elapsed * 0.85) * 0.045;
    if (root.userData.plates) {
      load += (loadTarget - load) * 0.08;
      applyLoad(root, load);
    }
    renderer.render(scene, camera);
  }

  stage?.classList.add("is-live");
  frame();
}

async function boot() {
  let THREE;
  try {
    THREE = await import(SCENE_URL);
  } catch (error) {
    document.querySelectorAll("canvas[data-scene]").forEach((canvas) => {
      canvas.setAttribute("aria-hidden", "true");
      canvas.removeAttribute("tabindex");
    });
    return;
  }

  document.querySelectorAll("canvas[data-scene]").forEach((canvas) => {
    try {
      mount(THREE, canvas);
    } catch (error) {
      canvas.setAttribute("aria-hidden", "true");
      canvas.removeAttribute("tabindex");
    }
  });
}

boot();
