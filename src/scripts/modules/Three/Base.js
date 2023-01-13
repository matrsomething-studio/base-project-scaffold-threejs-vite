// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

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
    }

    resizeWindow() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    updateTime() {
        this.time.elapsed = this.clock.getElapsedTime();
        this.time.delta = this.time.elapsed - this.time.last;
        this.time.elapsed = this.time.elapsed;
    }
}
