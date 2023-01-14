// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Components(s)
import ThreeRenderer from './Renderer';
import ThreeDataGUI from './DataGUI';

// Shader(s)
import fragmentRGB from '../../shaders/rgb/fragment.glsl';

// Class - ThreeObjects - https://threejs.org/docs/?q=Scene#api/en/scenes/Scene
export default class ThreeObjects extends ThreeRenderer {
    constructor(options) {
        super(options);
        this.options = options;
        this.textureLoader = new THREE.TextureLoader();
    
        this.setMaterials();
        this.setMeshes();
        this.setLights();
    }

    setMaterials() {
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

    setMeshes() {
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
        const texture = this.textureLoader.load('/001.jpg',
            () =>{console.log('loading finished')},
            () => {console.log('loading progressing')},
            () => {console.log('loading error')}
        );
        const sphere = new THREE.Mesh(sphereGeo, new THREE.MeshStandardMaterial( { map: texture }));
        sphere.position.y += 1;

        this.scene.add(sphere);
        this.meshes.push(sphere);
    }

    setLights() {
         // Direct Light
         const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
         this.scene.add( directionalLight );
         this.lights.push(directionalLight);  
 
         if (this.options.showGUI) {
             this.gui = new ThreeDataGUI(this);
         }
    }

    updateMaterials() {
        if (this.materials) {
            for (const [key, value] of Object.entries(this.materials)) {
                value.uniforms.iResolution.value.set(this.width, this.height, 1);
                value.uniforms.iTime.value = this.time.elapsed;
            }
        }
    }

    updateMeshes() {
        if(this.meshes) {
            this.meshes[2].position.z = Math.sin(this.time.elapsed);
            this.meshes[2].position.y = Math.cos(this.time.elapsed);
        }
    }

    updateLights() {
        if(this.lights) {
            console.log('Update Lights!!!');
        }
    }
}