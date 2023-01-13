// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';
import ThreeBase from './Base';

// Class - ThreeScene - https://threejs.org/docs/?q=Scene#api/en/scenes/Scene
export default class ThreeScene  {
    constructor() {
        this.scene = new THREE.Scene();
    }

    getScene() {
        return this.scene;
    }
}