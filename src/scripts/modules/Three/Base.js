// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Module(s)
import ThreeGUI from './GUI';
import ThreeCamera from './Camera';
import ThreeControls from './Controls';
import ThreeRenderer from './Renderer';
import ThreeScene from './Scene';

// Shaders
import fragmentRGB from '../../shaders/rgb/fragment.glsl';

// Class - ThreeBase
export default class ThreeBase {
    constructor(options) {
        this.options = options;
        this.container = document.querySelector(this.options.domSelector);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.time = { start: Date.now(), last: 0, elapsed: 0, delta: 0 };
        this.clock = new THREE.Clock();
        this.meshGroup = new THREE.Group();
        this.meshes = [];
        this.lights = [];
        this.materials = {};
        this.mouse = null;
        this.cursor = { x: 0, y: 0 };
        this.wheel = 0;
        this.imageAspect = 1080 / 1920;
        this.scene = new ThreeScene(this);
        this.renderer = new ThreeRenderer(this);
        this.camera = new ThreeCamera(this);
        this.controls = new ThreeControls(this);
        this.createMaterials();
        this.createObjects();
        this.gui = new ThreeGUI(this);
        this.resize();
    }

    getTime() {
        return this.time;
    }

    createObjects() {
        // Plane
        const planeGeo = new THREE.PlaneGeometry(1, 1, 1, 1);
        const plane = new THREE.Mesh(planeGeo, this.materials.rgb);

        this.scene.scene.add(plane);
        this.meshes.push(plane);

        // Plane Instance
        const planeInstance = new THREE.InstancedMesh(planeGeo, this.materials.rgb, 1);
        planeInstance.position.y += -1.05;

        this.scene.scene.add(planeInstance);
        this.meshes.push(planeInstance);

        // BoxGeometry
        const boxGeo = new THREE.BoxGeometry( 1, 1, 1 );
        const box = new THREE.Mesh(boxGeo, this.materials.rgb);
        box.position.x -= 1.5;

        this.scene.scene.add(box);
        this.meshes.push(box);  

        // Sphere
        const sphereGeo = new THREE.SphereGeometry( .5, 32, 16 );
        const sphere = new THREE.Mesh(sphereGeo, new THREE.MeshStandardMaterial( { color: 0x2e2e2e }));
        sphere.position.y += 1;

        this.scene.scene.add(sphere);
        this.meshes.push(sphere);  

         // Light
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        this.scene.scene.add( directionalLight );
        this.lights.push(directionalLight);  
    }

    createMaterials() {
        let material = new THREE.ShaderMaterial({
            extensions: {
                derivatives: '#extension GL_OES_standard_derivatives : enable'
            },
            side: THREE.DoubleSide,
            uniforms: {
                iTime: { value: 0 },
                iResolution:  { value: new THREE.Vector3() },
                iMouse: { value: this.mouse }
            },
            // wireframe: true,
            // vertexShader: vertex,
            transparent: true,
            fragmentShader: fragmentRGB
        });

        this.materials.rgb = material;
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer.resize();
        this.camera.resize();
        console.dir(this)
    }

    update() {
        this.time.elapsed = this.clock.getElapsedTime();
        this.time.delta = this.time.elapsed - this.time.last;
        this.time.elapsed = this.time.elapsed;

        for (const [key, value] of Object.entries(this.materials)) {
            value.uniforms.iResolution.value.set(this.width, this.height, 1);
            value.uniforms.iTime.value = this.time.elapsed;
        }

        if (this.controls) {
            this.controls.update();
        }

        if (this.renderer) {
            this.renderer.update();
        } 
    }
}