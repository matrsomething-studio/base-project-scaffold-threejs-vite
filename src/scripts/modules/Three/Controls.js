// Controls -  https://threejs.org/docs/?q=OrbitControls#examples/en/controls/OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Class - ThreeControls - https://threejs.org/docs/?q=OrbitControls#examples/en/controls/OrbitControls
export default class ThreeControls  {
    constructor(base) {
        this.base = base;
        
        if (this.base.options.orbitControls) {
            this.orbit = new OrbitControls(this.base.camera, this.base.renderer.renderer.domElement);
            this.orbit.enableDamping = true
        }
    }

    update() {
        this.orbit.update();
    }
}