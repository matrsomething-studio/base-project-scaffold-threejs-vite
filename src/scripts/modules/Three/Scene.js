// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Class - ThreeScene - https://threejs.org/docs/?q=Scene#api/en/scenes/Scene
export default class ThreeScene  {
    constructor(base) {
        this.base = base;
        this.scene = new THREE.Scene();
    }
}