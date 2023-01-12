// GSAP - https://greensock.com/docs/v3/GSAP/Timeline
import { gsap, Quad } from 'gsap';

// Module(s)
import ThreeBase from './Base';
import ThreeGUI from './GUI';

// Class - ThreeExperience
export default class ThreeExperience extends ThreeBase {
    constructor(options) {
        super(options);
        this.cursor = { x: 0, y: 0 };
        this.wheel = null;
        this.mouse = null;
        this.bind();
        new ThreeGUI(this);
    }

    setWheel(wheel){
        this.wheel = wheel;
    }

    setMouse(mouse){
        this.mouse = mouse;
        this.cursor.x = this.mouse.clientX / this.width - 0.5;
        this.cursor.y = this.mouse.clientY / this.height - 0.5;
    }

    bind() {
        console.log('Binding ThreeExperience Events');
    }
}