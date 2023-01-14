// Components(s)
import ThreeControls from './Controls';

// GSAP - https://greensock.com/docs/v3/GSAP/Timeline
import { gsap, Quad } from 'gsap';

// Class - ThreeRenderer - https://threejs.org/docs/#api/en/renderers/WebGLRenderer
export default class ThreeExperience extends ThreeControls  {
    constructor(options, items) {
        super(options);
        this.options = options;
        this.tl = gsap.timeline();
        this.playing = false;
        this.rafID = null;

        this.bindEvents();
        this.resize();
        this.play();
    }

    resize() {
        this.resizeWindow();
        this.resizeCamera();
        this.resizeRenderer();
    }

    bindEvents() {
        console.log('ThreeExperience binding');
    }

    play() {
        if (!this.playing) {
            this.update();
            this.playing = true;
        }
    }

    stop() {
        if (this.playing) {
            window.cancelAnimationFrame(this.rafID);
            this.playing = false;
        }
    }

    update() {
        if (this.time) {
            this.updateTime();
        }

        if (this.materials) {
            this.updateMaterials();
        }

        if(this.meshes) {
            this.meshes[2].position.z = Math.sin(this.time.elapsed);
            this.meshes[2].position.y = Math.cos(this.time.elapsed);
        }
       
        if (this.controls) {
            this.controls.update();
        }

        if (this.renderer) {
            this.renderer.render(this.scene, this.camera);
        }

        this.rafID = requestAnimationFrame(this.update.bind(this));
    }

    destroy() {
        this.stop();
        this.destroyRenderer();
        this.destroyCamera();
        this.destroyScene();
    }
}