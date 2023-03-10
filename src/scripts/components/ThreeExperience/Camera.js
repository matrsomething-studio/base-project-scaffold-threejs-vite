// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Components(s)
import ThreeScene from './Scene';

// Class - ThreeCamera - https://threejs.org/docs/?q=PerspectiveCamera#api/en/cameras/PerspectiveCamera
export default class ThreeCamera extends ThreeScene {
    constructor(options) {
        super(options);
        this.options = options;
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.width / this.height,
            0.1,
            1000
        );
        this.camera.position.set(-1, 1.5, 3);
        this.camera.lookAt(0, 0, 0);

        this.resizeCamera();
    }

    resizeCamera() {
        if (this.camera) {
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
        }
    }

    destroyCamera() {
        if (this.camera) {
            this.camera = undefined;
        }
    }
}
