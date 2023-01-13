// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Module(s)
import ThreeRenderer from './Renderer';
import ThreeGUI from './GUI';

// Shaders
import fragmentRGB from '../../shaders/rgb/fragment.glsl';

// Controls -  https://threejs.org/docs/?q=OrbitControls#examples/en/controls/OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Class - ThreeRenderer - https://threejs.org/docs/#api/en/renderers/WebGLRenderer
export default class ThreeExperience extends ThreeRenderer  {
    constructor(options) {
        super(options);

         if (this.options.orbitControls) {
            this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
            this.orbit.enableDamping = true
        }

        this.createMaterials();
        this.createObjects();
        this.resize();
        this.gui = new ThreeGUI(this);
    }

    createObjects() {
        // Plane
        const planeGeo = new THREE.PlaneGeometry(1, 1, 1, 1);
        const plane = new THREE.Mesh(planeGeo, this.materials.rgb);

        this.scene.add(plane);
        this.meshes.push(plane);

        // Plane Instance
        const planeInstance = new THREE.InstancedMesh(planeGeo, this.materials.rgb, 1);
        planeInstance.position.y += -1.05;

        this.scene.add(planeInstance);
        this.meshes.push(planeInstance);

        // BoxGeometry
        const boxGeo = new THREE.BoxGeometry( 1, 1, 1 );
        const box = new THREE.Mesh(boxGeo, this.materials.rgb);
        box.position.x -= 1.5;

        this.scene.add(box);
        this.meshes.push(box);  

        // Sphere
        const sphereGeo = new THREE.SphereGeometry( .5, 32, 16 );
        const sphere = new THREE.Mesh(sphereGeo, new THREE.MeshStandardMaterial( { color: 0x2e2e2e }));
        sphere.position.y += 1;

        this.scene.add(sphere);
        this.meshes.push(sphere);  

         // Light
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        this.scene.add( directionalLight );
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
        this.resizeWindow();
        this.resizeCamera();
        this.resizeRenderer();
    }

    update() {
        if (this.time) {
            this.updateTime();
        }
    
        for (const [key, value] of Object.entries(this.materials)) {
            value.uniforms.iResolution.value.set(this.width, this.height, 1);
            value.uniforms.iTime.value = this.time.elapsed;
        }

        if (this.orbit) {
            this.orbit.update();
        }

        if (this.renderer) {
            this.renderer.render(this.scene, this.camera);
        }   
    }
}