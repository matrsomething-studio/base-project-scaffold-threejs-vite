// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Module(s)
import ThreeScene from './Scene';

// Class - ThreeCamera - https://threejs.org/docs/?q=PerspectiveCamera#api/en/cameras/PerspectiveCamera
export default class ThreeCamera extends ThreeScene  {
    constructor(options) {
        super(options);
        
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.width / this.width,
            0.1,
            1000
        );
        
        this.camera.updateProjectionMatrix();
        this.camera.position.set(0, 0, 3);
        this.camera.lookAt(0, 0, 0);
    }

    resizeCamera() {
        this.camera.aspect = this.width / this.height;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();   
    }
}