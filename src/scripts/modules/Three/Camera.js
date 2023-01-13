// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Class - ThreeCamera - https://threejs.org/docs/?q=PerspectiveCamera#api/en/cameras/PerspectiveCamera
export default class ThreeCamera  {
    constructor(base) {
        this.base = base;
        
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.base.width / this.base.width,
            0.1,
            1000
        );
        
        this.camera.updateProjectionMatrix();
        this.camera.position.set(0, 0, 3);
        this.camera.lookAt(0, 0, 0);
    }

    resize() {
        this.camera.aspect = this.base.width / this.base.height;
        this.camera.aspect = this.base.width / this.base.height;
        this.camera.updateProjectionMatrix();   
    }
}