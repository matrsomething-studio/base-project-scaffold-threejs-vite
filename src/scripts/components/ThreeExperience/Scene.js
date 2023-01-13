// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Components(s)
import ThreeBase from './Base';

// Class - ThreeScene - https://threejs.org/docs/?q=Scene#api/en/scenes/Scene
export default class ThreeScene extends ThreeBase {
    constructor(options) {
        super(options);
        this.scene = new THREE.Scene();
    }
}