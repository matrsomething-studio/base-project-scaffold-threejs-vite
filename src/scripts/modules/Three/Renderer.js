// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Class - ThreeRenderer - https://threejs.org/docs/#api/en/renderers/WebGLRenderer
export default class ThreeRenderer  {
    constructor(base) {
        this.base = base;
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.base.width, this.base.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.sortObjects = false;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        this.base.container.appendChild(this.renderer.domElement);
    }

    resize() {
        this.renderer.setSize(this.base.width, this.base.height);
    }
}