// GSAP - https://greensock.com/docs/v3/GSAP/Timeline
import { gsap, Quad } from 'gsap';

// Module(s)
import ThreeGUI from './GUI';

// Class - ThreeScene
export default class ThreeScene {
    constructor(options) {
        this.options = options;
        this.experience = new ThreeGUI(this.options);
        this.wheel = null;
        this.mouse = null;
        
        this.bind();
    }

    setWheel(wheel){
        this.wheel = wheel;
    }

    setMouse(mouse){
        this.mouse = mouse;

        this.experience.mouse.x = this.mouse.clientX;
        this.experience.mouse.y = this.mouse.clientY ;

        this.experience.mouse.cursor.x = this.mouse.clientX / this.experience.width - 0.5;
        this.experience.mouse.cursor.y = this.mouse.clientY / this.experience.height - 0.5;
    }

    update() {        
        this.experience.update();
    }

    resize() {
        this.experience.resize();
    }

    bind() {
        console.log('Binding ThreeScene Events');
    }
}