// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// https://threejs.org/docs/#examples/en/loaders/GLTFLoader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Components(s)
import ThreeRenderer from './Renderer';
import ThreeDataGUI from './DataGUI';

// Shader(s)
import vertexRGB from '../../shaders/rgb/vertex.glsl';
import fragmentRGB from '../../shaders/rgb/fragment.glsl';

// Class - ThreeObjects - https://threejs.org/docs/?q=Scene#api/en/scenes/Scene
export default class ThreeObjects extends ThreeRenderer {
    constructor(options) {
        super(options);
        this.options = options;
        this.meshes = [];
        this.lights = [];
        this.materials = {};
        this.textureLoader = new THREE.TextureLoader();
        this.GLTFLoader = new GLTFLoader();

        this.setMaterials();
        this.setMeshes();
        this.setImports();
        this.setLights();
        this.setDataGUI();
    }

    setDataGUI() {
        if (this.options.showGUI) {
            this.gui = new ThreeDataGUI(this);
        }
    }

    setMaterials() {
        this.materials.rgb = new THREE.ShaderMaterial({
            extensions: {
                derivatives: '#extension GL_OES_standard_derivatives : enable',
            },
            side: THREE.DoubleSide,
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new THREE.Vector3() },
                iMouse: { value: this.mouse },
            },
            // wireframe: true,
            vertexShader: vertexRGB,
            transparent: true,
            fragmentShader: fragmentRGB,
        });
    }

    setMeshes() {
        // Plane
        const planeGeo = new THREE.PlaneGeometry(1, 1, 1, 1);
        const plane = new THREE.Mesh(planeGeo, this.materials.rgb);

        this.scene.add(plane);
        this.meshes.push(plane);

        // Plane Instance
        const planeInstance = new THREE.InstancedMesh(
            planeGeo,
            this.materials.rgb,
            1
        );
        planeInstance.position.y += -1.05;

        this.scene.add(planeInstance);
        this.meshes.push(planeInstance);

        // BoxGeometry
        const boxGeo = new THREE.BoxGeometry(1, 1, 1);
        const box = new THREE.Mesh(boxGeo, this.materials.rgb);
        box.position.x -= 1.5;

        this.scene.add(box);
        this.meshes.push(box);

        // Sphere
        const sphereGeo = new THREE.SphereGeometry(0.5, 32, 16);
        const texture = this.textureLoader.load(
            'images/001.jpg',
            () => {
                console.log('loading finished');
            },
            () => {
                console.log('loading progressing');
            },
            () => {
                console.log('loading error');
            }
        );
        const sphere = new THREE.Mesh(
            sphereGeo,
            new THREE.MeshStandardMaterial({ map: texture })
        );
        sphere.position.y += 1;

        this.scene.add(sphere);
        this.meshes.push(sphere);
    }

    setImports() {
        this.GLTFLoader.load('data/scene.gltf', (gltf) => {
            const scene = gltf.scene;
            scene.scale.set(0.05, 0.05, 0.05);
            scene.position.set(2, 0.0, 0.0);
            this.scene.add(scene);
        });

        this.GLTFLoader.load('data/rocks/rock_moss_set_01_4k.gltf', (gltf) => {
            const scene = gltf.scene;
            scene.position.set(0.0, 0.0, 0.0);
            this.scene.add(scene);
        });
    }

    setLights() {
        // Direct Light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.scene.add(directionalLight);
        this.lights.push(directionalLight);
        directionalLight.position.x = -1;
        directionalLight.position.y = -1;
        directionalLight.position.z = 0.5;
        directionalLight.intensity = 0.1;

        // Point Light
        const pointlLight = new THREE.PointLight(0xffffff, 0.5);
        this.scene.add(pointlLight);
        this.lights.push(pointlLight);
        pointlLight.position.x = 1;
        pointlLight.position.y = 1;
        pointlLight.position.z = 1;

        // Ambient Light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);
        ambientLight.intensity = 0.1;
    }

    updateMaterials() {
        if (this.materials) {
            for (const [key, value] of Object.entries(this.materials)) {
                value.uniforms.iResolution.value.set(
                    this.width,
                    this.height,
                    1
                );
                value.uniforms.iTime.value = this.time.elapsed;
            }
        }
    }

    updateMeshes() {
        if (this.meshes.length > 0) {
            this.meshes[2].position.z = Math.sin(this.time.elapsed);
            this.meshes[2].position.y = Math.cos(this.time.elapsed);
        }
    }

    updateLights() {
        if (this.lights.length > 0) {
            console.log('Update Lights!!!');
        }
    }
}
